'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { getSiteConfig } from '@/data/settings';
import { db } from '@/lib/firestore';

export async function updateSiteSettings(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const currentSettings = await getSiteConfig();
    let newSettings = { ...currentSettings };

    // Handle Banner Update
    if (formData.has('update_banner')) {
        newSettings.banner = {
            enabled: formData.get('enabled') === 'on',
            text: formData.get('text') as string,
            link: formData.get('link') as string,
            speed: parseInt(formData.get('speed') as string) || 30,
            mobileSpeed: parseInt(formData.get('mobileSpeed') as string) || 60,
        };
    }

    // Handle Contact Update
    if (formData.has('update_contact')) {
        newSettings.contact = {
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            instagram: formData.get('instagram') as string,
            facebook: formData.get('facebook') as string,
        };
    }

    // Handle Studio Update
    if (formData.has('update_studio')) {
        newSettings.studio = {
            galleryFolderId: formData.get('studioFolderId') as string,
        };
    }

    // Update Firestore app_content table
    try {
        // 1. Get the current entry to update its settings block
        const docRef = db.collection('app_content').doc('main');
        const doc = await docRef.get();

        const existingData = doc.exists ? doc.data() : {};
        const liveData = existingData?.live_data || {};
        const draftData = existingData?.draft_data || {};

        // 2. Update the settings in both live and draft for global settings
        liveData.settings = newSettings;
        draftData.settings = newSettings;

        await docRef.set({
            live_data: liveData,
            draft_data: draftData,
            updated_at: new Date().toISOString(),
        }, { merge: true });
    } catch (e) {
        console.error('Failed to save config to Firestore', e);
        throw new Error('Failed to save configuration permanently to database.');
    }

    // @ts-ignore
    revalidateTag('site-config');

    revalidatePath('/');
    revalidatePath('/admin/settings');
    revalidatePath('/admin/banner');
}
