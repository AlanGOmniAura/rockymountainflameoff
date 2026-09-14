import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function listPhotos(folderId: string) {
    console.log(`Listing photos for Folder ID: ${folderId}`);
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: "files(id, name)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            pageSize: 100,
        });

        const files = res.data.files || [];
        console.log(`Found ${files.length} photos.`);
        files.forEach(f => console.log(`- ${f.name}`));
    } catch (error: any) {
        console.error("Failed:", error.message);
    }
}

async function main() {
    await listPhotos("1FLAGzmaWcyoKyLP1uFH72kom3N1qm4SJ");
}

main();
