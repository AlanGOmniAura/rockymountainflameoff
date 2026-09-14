import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const SHARED_DRIVE_ROOT_ID = "1FLAGzmaWcyoKyLP1uFH72kom3N1qm4SJ";

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function main() {
    console.log(`Creating folder in Shared Drive root: ${SHARED_DRIVE_ROOT_ID}`);
    try {
        const fileMetadata = {
            name: "Student Art (Legacy Uploads)",
            mimeType: "application/vnd.google-apps.folder",
            parents: [SHARED_DRIVE_ROOT_ID],
        };

        const res = await drive.files.create({
            requestBody: fileMetadata,
            fields: "id, name",
            supportsAllDrives: true,
        });

        console.log(`Created folder: ${res.data.name} (ID: ${res.data.id})`);
    } catch (error: any) {
        console.error("Folder creation failed:", error.response ? error.response.data : error.message);
    }
}

main();
