import fs from 'fs/promises';
import path from 'path';
import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Force local script to use the service account credentials in the root
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(process.cwd(), 'service-account.json');

const db = new Firestore({
    projectId: 'wizard-shop',
    databaseId: 'glass-class-denver',
});

const CONTENT_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// Reverted team data containing only Jon Wade with his original details
const originalTeamData = [
    {
        name: 'Jon Wade',
        label: 'Owner / Founder',
        role: 'Master Artist & Instructor',
        imageSrc: '/images/instructor-jon.png',
        bio: [
            'Jon Wade has over 15 years of experience in the art of glassblowing and is the founder of Denver-based glass company and studio, Wizard Glass.',
            'He has trained with several experts in the field and has even been highlighted in The Flow Magazine. His professional but laid back attitude makes for a relaxing but informative and fun experience.'
        ],
        socials: {
            instagram: 'https://www.instagram.com/glassclassdenver/',
            email: 'info@glassclassdenver.com',
            website: 'https://www.wizardglass.com'
        }
    }
];

async function run() {
    try {
        console.log('1. Reverting local content.json...');
        const fileContent = await fs.readFile(CONTENT_PATH, 'utf-8');
        const content = JSON.parse(fileContent);

        content.draft.about.team = originalTeamData;
        content.live.about.team = originalTeamData;

        await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
        console.log('Local content.json reverted successfully.');

        console.log('2. Reverting Firestore database...');
        const docRef = db.collection('app_content').doc('main');
        const doc = await docRef.get();

        if (doc.exists) {
            const data = doc.data();
            const draftData = data?.draft_data || {};
            const liveData = data?.live_data || {};

            if (draftData.about) draftData.about.team = originalTeamData;
            if (liveData.about) liveData.about.team = originalTeamData;

            await docRef.set({
                draft_data: draftData,
                live_data: liveData,
                updated_at: new Date().toISOString()
            }, { merge: true });
            console.log('Firestore reverted successfully.');
        } else {
            console.log('Firestore main document not found, skipping DB update.');
        }
    } catch (error) {
        console.error('Error reverting team data:', error);
    }
}

run();
