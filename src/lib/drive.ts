import { google } from 'googleapis';
import path from 'path';
import { unstable_cache } from 'next/cache';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const getAuth = () => {
    // 1. Production/Vercel: Use Environment Variables
    if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CLIENT_EMAIL) {
        try {
            return new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    project_id: process.env.GOOGLE_PROJECT_ID,
                },
                scopes: SCOPES,
            });
        } catch (e) {
            console.error(
                'GOOGLE AUTH INIT ERROR: Likely invalid key format. ONE-LINE Key string required?',
                e
            );
            // Do NOT throw, otherwise Build Fails and Netlify serves old version.
            return new google.auth.GoogleAuth({ scopes: SCOPES }); // Fallback to unauthed
        }
    }

    // 2. Local Development: Use File
    try {
        const KEY_FILE_PATH = path.join(process.cwd(), 'service-account.json');
        return new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: SCOPES,
        });
    } catch (e) {
        console.warn('No service-account.json found and no Env Vars set.');
        return new google.auth.GoogleAuth({ scopes: SCOPES }); // Fallback (might fail calls)
    }
};

export const driveAuth = getAuth();
export const driveClient = google.drive({ version: 'v3', auth: driveAuth });

// --- Raw Functions (Internal) ---

async function _listGalleryPhotos(folderId?: string) {
    const targetFolderId = folderId || FOLDER_ID;
    if (!targetFolderId) return [];

    try {
        const res = await driveClient.files.list({
            q: `'${targetFolderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, webContentLink, webViewLink, thumbnailLink)',
            orderBy: 'createdTime desc',
            pageSize: 50,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        // 2. Fetch all subfolders (1 level deep)
        const subfoldersRes = await driveClient.files.list({
            q: `'${targetFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        let allFiles = res.data.files || [];
        let subfolders = subfoldersRes.data.files || [];

        // Exclude the 'pipe' folder from student glass art pieces explicitly
        subfolders = subfolders.filter((f) => f.id !== '1qLTheZlKtA94zMQCCQ7UWVMOWqg0KZ9r');

        // 3. For each subfolder, retrieve images
        if (subfolders.length > 0) {
            const promises = subfolders.map((folder) =>
                driveClient.files.list({
                    q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
                    fields: 'files(id, name, webContentLink, webViewLink, thumbnailLink)',
                    orderBy: 'createdTime desc',
                    pageSize: 20,
                    supportsAllDrives: true,
                    includeItemsFromAllDrives: true,
                })
            );

            const subResults = await Promise.all(promises);
            for (const subRes of subResults) {
                if (subRes.data.files) {
                    allFiles = allFiles.concat(subRes.data.files);
                }
            }
        }

        return allFiles;
    } catch (error) {
        console.error('Error fetching photos from Drive:', error);
        return [];
    }
}

async function _listFolders(parentId?: string) {
    const targetParentId = parentId || FOLDER_ID;
    if (!targetParentId) return [];

    try {
        const res = await driveClient.files.list({
            q: `'${targetParentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name)',
            orderBy: 'name',
            pageSize: 50,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        return res.data.files || [];
    } catch (error) {
        console.error('Error fetching folders:', error);
        return [];
    }
}

// --- Cached Exports ---

// --- Cached Exports ---

export async function listGalleryPhotos(folderId?: string) {
    const key = folderId || 'default';
    return await unstable_cache(
        async () => _listGalleryPhotos(folderId),
        [`gallery-photos-v4-${key}`],
        { tags: ['gallery', `gallery-v4-${key}`], revalidate: 3600 }
    )();
}

export async function listFolders(parentId?: string) {
    const key = parentId || 'default';
    return await unstable_cache(async () => _listFolders(parentId), [`drive-folders-v4-${key}`], {
        tags: ['drive-folders', `drive-folders-v4-${key}`],
        revalidate: 3600,
    })();
}

// --- Uncached Utils ---

export async function deletePhoto(fileId: string) {
    try {
        await driveClient.files.update({
            fileId,
            requestBody: { trashed: true },
            supportsAllDrives: true,
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting file:', error);
        return { success: false, error };
    }
}

export async function openFileStream(fileId: string) {
    try {
        const res = await driveClient.files.get(
            { fileId, alt: 'media', supportsAllDrives: true },
            { responseType: 'stream' }
        );
        return res.data;
    } catch (error) {
        console.error('Error opening file stream:', error);
        return null;
    }
}

export async function openThumbnailStream(fileId: string, size = 1600) {
    try {
        const file = await driveClient.files.get({
            fileId,
            fields: 'thumbnailLink',
            supportsAllDrives: true,
        });

        const link = file.data.thumbnailLink;
        if (!link) return null;

        const highResLink = link.replace(/=s\d+$/, `=s${size}`);

        // Try fetching without auth first (often works for thumbnails)
        let res = await fetch(highResLink, { cache: 'no-store' });

        // If 403/401, try with token
        if (!res.ok && (res.status === 403 || res.status === 401)) {
            const token = await driveAuth.getAccessToken();
            if (token) {
                res = await fetch(highResLink, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: 'no-store',
                });
            }
        }

        if (!res.ok) return null;
        return res.body;
    } catch (error) {
        console.error('Error opening thumbnail stream:', error);
        return null;
    }
}
