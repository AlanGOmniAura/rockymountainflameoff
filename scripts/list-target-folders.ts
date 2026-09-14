import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function listFolders(folderId: string) {
    console.log(`Listing folders for Folder ID: ${folderId}`);
    try {
        let pageToken: string | undefined = undefined;
        let allFolders: any[] = [];
        do {
            const res = await drive.files.list({
                q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
                fields: "nextPageToken, files(id, name)",
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
                pageToken: pageToken,
            });
            if (res.data.files) {
                allFolders = allFolders.concat(res.data.files);
            }
            pageToken = res.data.nextPageToken || undefined;
        } while (pageToken);

        console.log(`Found ${allFolders.length} folders.`);
        allFolders.forEach(f => console.log(`- ${f.name} ID: ${f.id}`));
    } catch (error: any) {
        console.error("Failed:", error.message);
    }
}

async function main() {
    await listFolders("1wTOVZOLBJlWqbeHFrBd4YRiiSP9AMwFZ");
}

main();
