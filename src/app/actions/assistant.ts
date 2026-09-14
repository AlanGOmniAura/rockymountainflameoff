'use server';

import { auth } from '@/auth';
import { getContent, saveDraftContent } from '@/app/actions/content';
import { db } from '@/lib/firestore';

// Required top-level keys that must survive every AI edit
const REQUIRED_SECTIONS = ['home', 'about', 'classesPage', 'classDetails', 'rentals', 'settings'] as const;

// Helper to check if item is a plain object (not array or null)
function isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// Recursively merge source edits into the target draft content
function deepMerge(target: any, source: any): any {
    if (!source) return target;
    if (!target) return source;

    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    output[key] = source[key];
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                output[key] = source[key];
            }
        });
    }
    return output;
}

// Snapshot the current draft to a backup collection before any AI write
async function backupCurrentDraft() {
    try {
        const docRef = db.collection('app_content').doc('main');
        const doc = await docRef.get();
        if (!doc.exists) return;

        const data = doc.data();
        const draft = data?.draft_data;
        if (!draft) return;

        const backupRef = db.collection('draft_backups').doc(`backup_${Date.now()}`);
        await backupRef.set({
            draft_data: draft,
            created_at: new Date().toISOString(),
            source: 'gemini_assistant',
        });

        // Prune old backups beyond 20
        const allBackups = await db.collection('draft_backups')
            .orderBy('created_at', 'desc')
            .get();
        const toDelete = allBackups.docs.slice(20);
        for (const old of toDelete) {
            await old.ref.delete();
        }
    } catch (e) {
        console.warn('Draft backup failed (non-fatal):', e);
    }
}

// Validate that the final merged content still contains all required sections
function validateUpdatedContent(
    updated: Record<string, any>,
    original: Record<string, any>
): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const key of REQUIRED_SECTIONS) {
        if (!(key in updated)) {
            errors.push(`Missing required section: "${key}"`);
        }
    }

    for (const key of REQUIRED_SECTIONS) {
        const orig = original[key];
        const upd = updated[key];
        if (orig && typeof orig === 'object' && Object.keys(orig).length > 0) {
            if (!upd || (typeof upd === 'object' && Object.keys(upd).length === 0)) {
                errors.push(`Section "${key}" was wiped empty`);
            }
        }
    }

    if (original.classDetails && updated.classDetails) {
        const originalSlugs = Object.keys(original.classDetails);
        const updatedSlugs = Object.keys(updated.classDetails);
        const droppedSlugs = originalSlugs.filter(s => !updatedSlugs.includes(s));
        if (droppedSlugs.length > 0) {
            errors.push(`Class detail pages dropped: ${droppedSlugs.join(', ')}`);
        }
    }

    return { valid: errors.length === 0, errors };
}

export async function editContentWithGemini(
    userPrompt: string,
    history: Array<{ role: 'user' | 'assistant'; text: string }>
) {
    // Auth gate
    const session = await auth();
    if (!session || !session.user) {
        throw new Error('Unauthorized access to Gemini Assistant.');
    }

    // API key gate
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return {
            error: 'Gemini Assistant is currently disabled. Please configure the GEMINI_API_KEY environment variable.',
        };
    }

    const trimmed = userPrompt.trim();
    if (!trimmed || trimmed.length < 2) {
        return { error: 'Please type your question or request.' };
    }
    if (trimmed.length > 2000) {
        return { error: 'Request is too long. Please keep it under 2000 characters.' };
    }

    try {
        // 1. Fetch current draft content
        const currentContent = await getContent(true);

        // 2. System instruction — conversational AND editing capabilities
        const systemInstruction = `
You are "Ditto", the friendly AI assistant for Glass Class Denver's admin console. You help the studio owner manage their website without any technical knowledge.

You have TWO modes:
1. CHAT mode — Answer questions, explain features, give guidance. Use this when the user is asking a question, saying hello, or asking what you can do.
2. EDIT mode — Make actual changes to the website draft content. Use this when the user asks you to change, update, add, or remove website content.

IMPORTANT: Choose the right mode based on what the user is asking. If they're just chatting or asking questions, use CHAT mode. If they want to change something on the website, use EDIT mode.

=== WHAT YOU CAN DO (tell users about these when asked) ===
• Edit the Homepage: hero slider images/text, feature tiles, page sections, FAQs, intro text, video embed, course image gallery
• Edit the About Page: instructor bio, studio description
• Edit the Classes Landing Page: hero carousel slides
• Edit Individual Class Pages: title, description, and thumbnail for each class (Glass Blowing Experience, 101, Couples, Youth, Celebration of Life, Party, Ornament, Team Building)
• Edit the Torch Rentals Page: hero section, torch list, included items, requirements
• Edit the Top Announcement Banner: enabled state, text content, link URL, scroll speed (settings.banner)
• Edit Contact & Social Details: phone number, email, address, Instagram URL, Facebook URL (settings.contact)
• Answer questions about how the admin console works
• Explain what each section of the website controls
• Help plan content changes before making them

=== WHAT YOU CANNOT DO ===
• You cannot change images directly (the owner must use the Gallery or Image Picker tools in the admin UI)
• You cannot change booking/FareHarbor settings
• You cannot modify the website code or design layout
• You cannot publish changes — the owner must click the Publish button after reviewing

=== ADMIN CONSOLE GUIDE ===
The admin console has these pages:
• Dashboard — Overview of the website
• Pages — Edit all website page content (Homepage, About, Classes, Rentals)
• Banner — Manage the announcement banner at the top of the site
• Gallery — Manage the photo gallery from Google Drive
• Settings — Site-wide settings like contact info and social links

=== CURRENT WEBSITE DRAFT JSON ===
${JSON.stringify(currentContent, null, 2)}

=== SECTION MAPPING ===
• "home.hero" → Homepage hero carousel slides (title, subtitle, image, link, linkText)
• "home.tiles" → Homepage feature tiles/class cards (title, image, link)
• "home.sections" → Homepage content sections with images (title, description, imageSrc, reversed, linkHref, linkText)
• "home.faqs" → Homepage FAQ accordion (question, answer)
• "home.intro" → Homepage intro text block (title, text, ctaLink, ctaText)
• "home.video" → Homepage video embed (src, title, description)
• "home.courseImages" → Homepage course image gallery
• "about.instructor" → About page instructor section
• "about.studio" → About page studio section
• "classesPage.heroSlides" → Classes landing page hero carousel
• "classDetails.[slug]" → Individual class page (title, description, image, galleryFolderId)
  Slugs: experience, 101, couples, youth, celebration-of-life, party, ornament, team-building
• "rentals.hero" → Rentals page hero section
• "rentals.torches" → List of available torches
• "rentals.included" → What's included with rental
• "rentals.requirements" → Rental requirements text
• "settings.banner" → Announcement banner settings (enabled, text, link, speed, mobileSpeed)
• "settings.contact" → Contact info & social links (phone, email, address, instagram, facebook)

=== RESPONSE FORMAT ===
Respond with JSON containing:
- "action": either "chat" (just talking, no changes) or "edit" (making content changes)
- "reply": Your friendly, helpful response to the user
- "updatedContent": (ONLY when action is "edit") The updated keys/sections of the JSON. You can return just the edited sections/keys or the whole document.

CRITICAL EDIT RULES:
- NEVER remove or rename existing class slugs unless explicitly asked
- NEVER empty out arrays or objects unless explicitly asked
- Preserve all image paths, links, and routes unless asked to change them
`;

        // 3. Build history turns for multi-turn conversation
        const contents = [];
        for (const msg of history) {
            if (msg.role === 'assistant' && (msg.text.includes('👋') || msg.text.includes('❌') || msg.text.includes('⚠️'))) {
                continue;
            }
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            });
        }
        
        contents.push({
            role: 'user',
            parts: [{ text: trimmed }],
        });

        // 4. Call Gemini API
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents,
                systemInstruction: { parts: [{ text: systemInstruction }] },
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: 'OBJECT',
                        properties: {
                            action: { type: 'STRING', enum: ['chat', 'edit'] },
                            reply: { type: 'STRING' },
                            updatedContent: { type: 'OBJECT' },
                        },
                        required: ['action', 'reply'],
                    },
                },
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('Gemini API error:', errText);
            throw new Error(`Gemini API returned ${response.status}. Please try again.`);
        }

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!candidateText) {
            throw new Error('Empty response from Gemini.');
        }

        // 5. Parse structured output
        const parsedResult = JSON.parse(candidateText);
        const { action, reply, updatedContent } = parsedResult;

        // CHAT mode — just return the reply, no edits
        if (action === 'chat' || !updatedContent) {
            return {
                success: true,
                reply: reply || "I'm here to help! Ask me anything about managing your website.",
                edited: false,
            };
        }

        // EDIT mode — merge and validate
        if (typeof updatedContent !== 'object') {
            throw new Error('Invalid content structure returned.');
        }

        // Merge the AI's partial edits into the full current content
        const mergedContent = deepMerge(currentContent, updatedContent);

        // Run validation on the merged result (should contain all required keys)
        const validation = validateUpdatedContent(mergedContent, currentContent);
        if (!validation.valid) {
            console.error('Gemini output failed validation:', validation.errors);
            return {
                error: `I tried to make those changes but something went wrong with the update. Your draft was NOT modified. Could you try rephrasing what you'd like to change?`,
            };
        }

        // Backup then save the merged result
        await backupCurrentDraft();
        await saveDraftContent(mergedContent);

        return {
            success: true,
            reply: reply || 'Done! Your draft has been updated.',
            edited: true,
        };
    } catch (e: any) {
        console.error('Gemini Assistant Server Error:', e);
        return {
            error: e.message || 'Something went wrong. Please try again.',
        };
    }
}
