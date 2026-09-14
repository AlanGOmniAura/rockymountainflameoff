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

async function main() {
    console.log("Searching for folders named 'Student Art (Legacy Uploads)'...");
    try {
        const res = await drive.files.list({
            q: "name = 'Student Art (Legacy Uploads)' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
            fields: "files(id, name)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        if (res.data.files && res.data.files.length > 0) {
            console.log("Found folders:");
            res.data.files.forEach(f => {
                console.log(`- ${f.name} (ID: ${f.id})`);
            });
        } else {
            console.log("No folders found.");
        }
    } catch (error) {
        console.error("Error searching for folders:", error);
    }
}

main();
