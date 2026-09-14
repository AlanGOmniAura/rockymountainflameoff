// Guard: Ignore global assistant/temp credentials to ensure local dev uses the correct ADC file
// This must run before importing @google-cloud/firestore since Google SDKs initialize auth immediately
if (
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.includes('gpt3-assistant') ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.includes('assistant')
) {
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
}

import { Firestore } from '@google-cloud/firestore';
import path from 'path';
import fs from 'fs';

const getFirestoreClient = (): Firestore => {
    const databaseId = 'glass-class-denver';

    // 1. If we have environment credentials
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        try {
            return new Firestore({
                projectId: process.env.GOOGLE_PROJECT_ID || 'wizard-shop',
                databaseId,
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
            });
        } catch (e) {
            console.error('Failed to initialize Firestore with env credentials:', e);
        }
    }

    // 2. Local development fallback: try service-account.json only if it is valid JSON
    try {
        const keyFilePath = path.join(process.cwd(), 'service-account.json');
        if (fs.existsSync(keyFilePath)) {
            const content = fs.readFileSync(keyFilePath, 'utf8').trim();
            if (content.startsWith('{')) {
                return new Firestore({
                    databaseId,
                    keyFilename: keyFilePath,
                    projectId: 'wizard-shop',
                });
            }
        }
    } catch (e) {
        // Fallback silently if file invalid
    }

    // 3. Fallback to ADC (Google Application Default Credentials)
    // This resolves to local machine ADC or Cloud Run IAM in production
    return new Firestore({
        databaseId,
        projectId: process.env.GOOGLE_PROJECT_ID || 'wizard-shop',
    });
};

export const db = getFirestoreClient();
