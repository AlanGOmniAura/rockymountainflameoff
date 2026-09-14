
import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function testDelete() {
    try {
        console.log("Listing files to find a victim...");
        const listRes = await drive.files.list({
            q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed = false`,
            fields: "files(id, name)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const files = listRes.data.files;
        if (!files || files.length === 0) {
            console.log("No files found to delete.");
            return;
        }

        const victim = files[0];
        console.log(`Found victim: ${victim.name} (${victim.id})`);

        console.log(`Attempting to DELETE file ID: ${victim.id}`);
        // Attempt 1: delete
        try {
            const res = await drive.files.delete({
                fileId: victim.id!,
                supportsAllDrives: true,
            });
            console.log("SUCCESS: Deleted file (204).");
        } catch (delError: any) {
            console.error("Delete failed. Trying Trash...");
            // Attempt 2: trash (update)
            const res = await drive.files.update({
                fileId: victim.id!,
                requestBody: { trashed: true },
                supportsAllDrives: true,
            });
            console.log("SUCCESS: Trashed file.");
        }

    } catch (error: any) {
        console.error("FAILED operation:");
        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error);
        }
    }
}

testDelete();
