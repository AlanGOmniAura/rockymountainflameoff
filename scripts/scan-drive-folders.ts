
import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!ROOT_FOLDER_ID) {
    console.error("GOOGLE_DRIVE_FOLDER_ID is missing in .env.local");
    process.exit(1);
}

const getAuth = () => {
    try {
        const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
        return new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: SCOPES,
        });
    } catch (e) {
        console.error("Auth failed:", e);
        return null;
    }
};

async function scanFolders() {
    const auth = getAuth();
    if (!auth) return;

    const drive = google.drive({ version: "v3", auth });

    console.log(`Scanning Root Folder: ${ROOT_FOLDER_ID}...`);

    try {
        const res = await drive.files.list({
            q: `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: "files(id, name)",
            orderBy: "name",
            pageSize: 50,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const folders = res.data.files || [];

        if (folders.length === 0) {
            console.log("No subfolders found.");
            return;
        }

        console.log("\nFound Folders:");
        console.log("------------------------------------------------");
        console.log(JSON.stringify(folders, null, 2));
        console.log("------------------------------------------------");

    } catch (error) {
        console.error("Error scanning drive:", error);
    }
}

scanFolders();
