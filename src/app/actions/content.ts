'use server';

import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firestore';

const CONTENT_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// Helper to read file as fallback
async function readContentFile() {
    try {
        const data = await fs.readFile(CONTENT_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { live: {}, draft: {} };
    }
}

// Get Content (Live by default, Draft if preview=true)
export const getContent = cache(async function (preview: boolean = false) {
    try {
        const doc = await db.collection('app_content').doc('main').get();
        if (doc.exists) {
            const data = doc.data();
            return preview ? data?.draft_data || {} : data?.live_data || {};
        }
    } catch (e) {
        console.error('Firestore fetch error, falling back to local file:', e);
    }

    // Fallback Local File
    const data = await readContentFile();
    return preview ? data.draft : data.live;
});

// Update Draft Content
export async function updateDraft(section: string, rawData: any) {
    let newData = rawData;

    // If it's FormData (from our new unified editors)
    if (rawData instanceof FormData) {
        const formData = rawData;

        // Helper to parse dynamic lists
        const parseList = (prefix: string, fields: string[]) => {
            const count = parseInt(formData.get(`${prefix}_count`) as string) || 0;
            const list = [];
            for (let i = 0; i < count; i++) {
                const item: any = {};
                fields.forEach((field) => {
                    const val = formData.get(`${prefix}_${field}_${i}`);
                    // Handle checkboxes
                    if (field === 'reversed') {
                        item[field] = formData.has(`${prefix}_${field}_${i}`);
                    } else {
                        item[field] = val;
                    }
                });
                list.push(item);
            }
            return list;
        };

        if (section === 'home') {
            newData = {
                hero: parseList('hero', ['title', 'subtitle', 'image', 'link', 'linkText']),
                tiles: parseList('tiles', ['title', 'image', 'link']),
                sections: parseList('sections', [
                    'title',
                    'description',
                    'imageSrc',
                    'reversed',
                    'linkHref',
                    'linkText',
                ]),
                faqs: parseList('faqs', ['question', 'answer']),
                courseImages: parseList('courseImages', ['image']),
                video: {
                    src: formData.get('video_src'),
                    title: formData.get('video_title'),
                    description: formData.get('video_description'),
                },
                intro: {
                    title: formData.get('intro_title'),
                    text: formData.get('intro_text'),
                    ctaLink: formData.get('intro_ctaLink'),
                    ctaText: formData.get('intro_ctaText'),
                },
            };
        } else if (section === 'about') {
            newData = {
                instructor: {
                    title: formData.get('instr_title'),
                    description: formData.get('instr_description'),
                    imageSrc: formData.get('instr_imageSrc'),
                    imageAlt: formData.get('instr_imageAlt'),
                    linkHref: formData.get('instr_linkHref'),
                    linkText: formData.get('instr_linkText'),
                    parallaxBg: formData.get('instr_parallaxBg'),
                },
                studio: {
                    title: formData.get('studio_title'),
                    text: formData.get('studio_text'),
                },
            };
        } else if (section === 'classesPage') {
            newData = {
                heroSlides: parseList('slides', ['title', 'subtitle', 'image', 'link', 'linkText']),
            };
        } else if (section === 'classDetails') {
            // Rebuild the object since it's Slug -> Detail
            const slugs = formData.getAll('_slugs') as string[];
            const details: any = {};
            slugs.forEach((slug) => {
                details[slug] = {
                    title: formData.get(`${slug}_title`),
                    description: formData.get(`${slug}_description`),
                    image: formData.get(`${slug}_image`),
                    galleryFolderId: formData.get(`${slug}_galleryFolderId`),
                };
            });
            newData = details;
        } else if (section === 'rentals') {
            newData = {
                hero: {
                    title: formData.get('hero_title'),
                    description: formData.get('hero_description'),
                    imageSrc: formData.get('hero_imageSrc'),
                    imageAlt: formData.get('hero_imageAlt'),
                    linkHref: formData.get('hero_linkHref'),
                    linkText: formData.get('hero_linkText'),
                    parallaxBg: formData.get('hero_parallaxBg'),
                },
                torches: ((formData.get('torches') as string) || '')
                    .split('\n')
                    .filter((f) => f.trim()),
                included: ((formData.get('included') as string) || '')
                    .split('\n')
                    .filter((f) => f.trim()),
                requirements: formData.get('requirements'),
                galleryFolderId: formData.get('galleryFolderId'),
            };
        } else {
            newData = Object.fromEntries(formData.entries());
        }
    }

    try {
        const docRef = db.collection('app_content').doc('main');
        const doc = await docRef.get();
        const draftData = doc.exists ? doc.data()?.draft_data || {} : {};
        draftData[section] = newData;

        await docRef.set({
            draft_data: draftData,
            updated_at: new Date().toISOString(),
        }, { merge: true });

        revalidatePath('/');
        revalidatePath('/admin/content');
        return { success: true };
    } catch (e) {
        console.warn('Firestore update error, falling back to local file:', e);
    }

    const data = await readContentFile();
    data.draft[section] = newData;
    await fs.writeFile(CONTENT_PATH, JSON.stringify(data, null, 2), 'utf-8');
    revalidatePath('/');
    revalidatePath('/admin/content');
    return { success: true };
}

// Publish Draft to Live
export async function publishContent(formData: FormData) {
    console.log('NETLIFY: Publish Content Triggered...');

    try {
        const docRef = db.collection('app_content').doc('main');
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error('Could not find draft to publish.');
        }

        const data = doc.data();
        const draft = data?.draft_data;
        if (!draft || !draft.home || Object.keys(draft).length < 2) {
            console.error('NETLIFY CRITICAL: Draft is incomplete. Aborting publish to prevent bricking site.', draft);
            throw new Error('Draft data is incomplete! The website is currently protected from an accidental wipe. Please Save your changes in the editor first.');
        }

        console.log('NETLIFY: Pushing Draft to Live...');
        await docRef.set({
            live_data: draft,
            updated_at: new Date().toISOString()
        }, { merge: true });

        console.log('NETLIFY: Revalidating Cache...');
        revalidatePath('/', 'layout');
        console.log('NETLIFY: Publish Successful!');
    } catch (e: any) {
        console.error('NETLIFY 500 CAUSE:', e.message || e);
        if (e.message?.includes('protected') || e.message?.includes('incomplete') || e.message?.includes('wipe')) {
            throw new Error(e.message);
        }
        console.warn('Firestore publish failed, falling back to local files.');
        const data = await readContentFile();
        data.live = JSON.parse(JSON.stringify(data.draft));
        await fs.writeFile(CONTENT_PATH, JSON.stringify(data, null, 2), 'utf-8');
        revalidatePath('/');
    }
}

export async function saveDraftContent(newDraftData: any) {
    // Auth guard — prevent unauthenticated writes
    const { auth } = await import('@/auth');
    const session = await auth();
    if (!session || !session.user) {
        throw new Error('Unauthorized: saveDraftContent requires an authenticated admin session.');
    }

    try {
        const docRef = db.collection('app_content').doc('main');
        await docRef.set({
            draft_data: newDraftData,
            updated_at: new Date().toISOString(),
        }, { merge: true });
        revalidatePath('/', 'layout');
    } catch (e) {
        console.error('Failed to save draft in Firestore:', e);
        throw new Error('Failed to save draft.');
    }
}

