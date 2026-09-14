
import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function checkFolder() {
    try {
        console.log(`Checking Folder ID: ${FOLDER_ID}`);
        const res = await drive.files.get({
            fileId: FOLDER_ID!,
            fields: "id, name, mimeType, driveId, capabilities, owners, shared, parents",
            supportsAllDrives: true,
        });

        console.log("Folder Metadata:");
        console.log(JSON.stringify(res.data, null, 2));

        if (res.data.driveId) {
            console.log(`\nSUCCESS: Folder is in Shared Drive (Drive ID: ${res.data.driveId})`);
        } else {
            console.log("\nWARNING: Folder does NOT appear to be in a Shared Drive (no driveId returned).");
            console.log("Files uploaded here will consume the uploader's quota (Service Account = 0GB).");
        }

    } catch (error: any) {
        console.error("Error checking folder:", error.message);
    }
}

checkFolder();
