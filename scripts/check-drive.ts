
import { listGalleryPhotos } from "../src/lib/drive";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import fs from "fs";

async function checkFolder() {
    console.log("Checking folder:", process.env.GOOGLE_DRIVE_FOLDER_ID);
    try {
        const files = await listGalleryPhotos(process.env.GOOGLE_DRIVE_FOLDER_ID);
        const output = `Found ${files.length} files.\n` +
            files.slice(0, 20).map(f => `- [${f.id}] ${f.name} (MimeType: ${f.mimeType}, Link: ${f.webViewLink})`).join("\n");

        console.log(output);
        fs.writeFileSync("drive-files.txt", output);

    } catch (error) {
        console.error("Error:", error);
    }
}

checkFolder();
