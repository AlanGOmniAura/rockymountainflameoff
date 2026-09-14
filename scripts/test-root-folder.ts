import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];

async function main() {
    const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: SCOPES,
    });

    const drive = google.drive({ version: "v3", auth });

    const targetFolderId = "1FLAGzmaWcyoKyLP1uFH72kom3N1qm4SJ"; // GOOGLE_DRIVE_FOLDER_ID
    console.log(`Checking folder: ${targetFolderId}`);

    try {
        const res = await drive.files.list({
            q: `'${targetFolderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: "files(id, name)",
            pageSize: 50,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        console.log(`Found ${res.data.files?.length || 0} images directly in this folder.`);
        if (res.data.files) {
            res.data.files.slice(0, 10).forEach(f => console.log(`- ${f.name}`));
        }
    } catch (e: any) {
        console.error("Drive API Error:", e.message);
    }
}

main();
