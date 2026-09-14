import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const ROOT_FOLDER_ID = "1FLAGzmaWcyoKyLP1uFH72kom3N1qm4SJ";

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function main() {
    console.log(`Testing upload to Root Folder: ${ROOT_FOLDER_ID}`);
    try {
        const fileMetadata = {
            name: "test_upload_delete_me.txt",
            parents: [ROOT_FOLDER_ID],
        };
        const media = {
            mimeType: "text/plain",
            body: Buffer.from("test upload"),
        };

        const res = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, name",
            supportsAllDrives: true,
        });

        console.log(`Success! Uploaded: ${res.data.name} (ID: ${res.data.id})`);

        // Clean up
        await drive.files.delete({
            fileId: res.data.id!,
            supportsAllDrives: true,
        });
        console.log("Cleanup: Deleted test file.");
    } catch (error: any) {
        console.error("Test Upload Failed:", error.response ? error.response.data : error.message);
    }
}

main();
