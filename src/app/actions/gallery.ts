'use server';

import { listGalleryPhotos, deletePhoto, listFolders } from '@/lib/drive';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';

export const getPhotos = cache(async function (folderId?: string) {
    const files = await listGalleryPhotos(folderId);

    // Keywords for files that likely contain people or are non-art assets
    const excludeKeywords = [
        'youth',
        'instructor',
        'jon',
        'team',
        'group',
        'couple',
        'birthday',
        'party',
        'class',
        'learn',
        'experience',
        'holiday',
        'frontier',
        'denver',
        'logo',
        'hero',
        'private',
        'adult-swim',
        'GCD',
        'PXL',
        'DSC',
        'IMG',
    ];

    // Specific list of live artwork images that are confirmed to be just art
    const allowedArtFiles = ['artwork.jpg', 'marble.jpg', 'marble-date.jpg', 'made-in-class.jpg'];

    // Transform Drive links to be usable locally
    const processedFiles = files
        .filter((f) => f.id && f.name)
        .filter((f) => {
            // If a specific folder was requested (e.g. for a class page), we assume all photos in it should be shown
            if (folderId) return true;

            const name = (f.name || '').toLowerCase();
            const isLegacyArt = name.includes('legacy');
            const isKnownArt = allowedArtFiles.some((af) => name.includes(af));

            // Only allow legacy images or those in our explicit whitelist for the root gallery
            return isLegacyArt || isKnownArt;
        })
        .map((f) => ({
            id: f.id!,
            name: f.name!,
            // Use our new proxy so proper auth is used to fetch the image bits
            src: `/api/image-proxy?id=${f.id}`,
            thumbnail: f.thumbnailLink || undefined,
        }));

    console.log(
        `[getPhotos] folderId: ${folderId || 'ROOT'}, fetched raw files: ${files.length}, generated photos: ${processedFiles.length}`
    );

    return processedFiles;
});

export async function removePhoto(fileId: string) {
    console.log(`[Action] Removing photo: ${fileId}`);
    try {
        const result = await deletePhoto(fileId);
        if (!result.success) {
            console.error(`[Action] Failed to remove photo:`, result.error);
            // Optionally throw to show error in UI if we had an error boundary
            throw new Error('Failed to delete photo');
        }
        console.log(`[Action] Successfully removed photo: ${fileId}`);
        console.log(`[Action] Successfully removed photo: ${fileId}`);
        revalidatePath('/admin/gallery');
        revalidatePath('/');
    } catch (error) {
        console.error(`[Action] Unexpected error removing photo:`, error);
        throw error;
    }
}

export async function getFolders(parentId?: string) {
    // Dynamically import to avoid circular dep if needed, but here simple import is fine
    const { listFolders } = await import('@/lib/drive');
    return await listFolders(parentId);
}
