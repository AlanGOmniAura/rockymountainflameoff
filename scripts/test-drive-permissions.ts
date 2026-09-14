
import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function testPermissions() {
    console.log(`Testing permissions on Folder ID: ${FOLDER_ID}`);
    let fileId: string | undefined;

    // 1. Try to create a file
    try {
        console.log("Attempting to CREATE a file...");
        const res = await drive.files.create({
            requestBody: {
                name: "test-delete-permission.txt",
                parents: [FOLDER_ID!],
            },
            media: {
                mimeType: "text/plain",
                body: "This is a temporary file to test delete permissions.",
            },
            fields: "id, name",
            supportsAllDrives: true,
        });

        fileId = res.data.id!;
        console.log(`SUCCESS: Created file. ID: ${fileId}`);
    } catch (error: any) {
        console.error("FAILED to create file:", JSON.stringify(error, null, 2));
        return;
    }

    // 2. Try to delete the file
    try {
        console.log(`Attempting to DELETE file ID: ${fileId}...`);
        await drive.files.delete({
            fileId: fileId!,
            supportsAllDrives: true,
        });
        console.log("SUCCESS: Deleted file.");
    } catch (error: any) {
        console.error("FAILED to delete file:", JSON.stringify(error, null, 2));
    }
}

testPermissions();
