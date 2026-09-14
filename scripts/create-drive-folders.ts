
import { google } from "googleapis";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function createFolder(name: string, parents: string[]) {
    const fileMetadata = {
        name: name,
        mimeType: "application/vnd.google-apps.folder",
        parents: parents,
    };
    try {
        const file = await drive.files.create({
            requestBody: fileMetadata,
            fields: "id",
        });
        console.log(`Created Folder: ${name} (ID: ${file.data.id})`);
        return file.data.id;
    } catch (err) {
        console.error("Error creating folder:", err);
        return null;
    }
}

async function main() {
    //   const parentId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    //   const parents = parentId ? [parentId] : [];
    const parents: string[] = []; // FORCE ROOT

    console.log(`Creating folders. Parent: ROOT`);

    const liveFolderId = await createFolder("Student Glass Art Pieces (Website)", parents);
    const unusedFolderId = await createFolder("Unused (Website)", parents);

    console.log("\n--- COMPLETE ---");
    console.log(`NEW GOOGLE_DRIVE_FOLDER_ID for .env.local: ${liveFolderId}`);
}

main();
