import { google, drive_v3 } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth }) as drive_v3.Drive;

async function listItems(folderId: string) {
    console.log(`Listing items for Folder ID: ${folderId}`);
    try {
        let pageToken: string | undefined = undefined;
        let allItems: any[] = [];
        do {
            const res = await (drive.files.list({
                q: `'${folderId}' in parents and trashed = false`,
                fields: "nextPageToken, files(id, name, mimeType)",
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
                pageToken: pageToken,
            }) as Promise<any>);
            if (res.data.files) {
                allItems = allItems.concat(res.data.files);
            }
            pageToken = res.data.nextPageToken || undefined;
        } while (pageToken);

        console.log(`Found ${allItems.length} items.`);
        allItems.slice(0, 20).forEach(f => console.log(`- ${f.name} (${f.mimeType})`));
    } catch (error: any) {
        console.error("Failed:", error.message);
    }
}

async function main() {
    await listItems("144G03Ct1cv8dcK9_PyeqSzZ-X7ZO5Xqm");
}

main();
