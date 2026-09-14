import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = "1g_NjxuFK61nJMTKaY48nOUy5sv-z-sh7";

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function main() {
    console.log(`Getting info for Folder ID: ${FOLDER_ID}`);
    try {
        const res = await drive.files.get({
            fileId: FOLDER_ID!,
            fields: "id, name, parents",
            supportsAllDrives: true,
        });

        console.log("Parents:", res.data.parents);
    } catch (error: any) {
        console.error("Error getting folder info:", error.message);
    }
}

main();
