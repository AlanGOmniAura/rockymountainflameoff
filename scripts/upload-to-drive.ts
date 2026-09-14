
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

if (!FOLDER_ID) {
    console.error("Error: GOOGLE_DRIVE_FOLDER_ID is not set in .env.local");
    process.exit(1);
}

if (!fs.existsSync(KEY_FILE_PATH)) {
    console.error("Error: service-account.json not found in root directory.");
    process.exit(1);
}

// Initialize Auth
const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// Helper to crawl directory recursively
function getFiles(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            // Filter for images
            if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

async function fileExistsInDrive(fileName: string) {
    try {
        const res = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and name = '${fileName}' and trashed = false`,
            fields: "files(id, name)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });
        return res.data.files && res.data.files.length > 0;
    } catch (error: any) {
        console.error("Error checking file existence:", JSON.stringify(error, null, 2));
        if (error.code === 403) {
            console.error("403 Forbidden. Possible causes: API disabled, quota exceeded, or lack of permissions.");
        }
        return false;
    }
}

async function uploadFile(filePath: string) {
    const fileName = path.basename(filePath);

    // Simple deduplication by name
    const exists = await fileExistsInDrive(fileName);
    if (exists) {
        console.log(`Skipping (already exists): ${fileName}`);
        return;
    }

    try {
        const fileMetadata = {
            name: fileName,
            parents: [FOLDER_ID!],
        };
        const media = {
            mimeType: "image/jpeg", // Basic assumption, drive can auto-detect usually or we can be specific
            body: fs.createReadStream(filePath),
        };

        const res = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, name",
            supportsAllDrives: true,
        });

        console.log(`Uploaded: ${fileName} (ID: ${res.data.id})`);
    } catch (error: any) {
        console.error(`Failed to upload ${fileName}:`, JSON.stringify(error.response ? error.response.data : error, null, 2));
    }
}

async function main() {
    console.log(`Scanning for images in: ${IMAGES_DIR}`);
    console.log(`Target Drive Folder ID: ${FOLDER_ID}`);

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error("Error: public/images directory not found.");
        process.exit(1);
    }

    const allImages = getFiles(IMAGES_DIR);
    console.log(`Found ${allImages.length} images.`);

    for (const imagePath of allImages) {
        await uploadFile(imagePath);
    }

    console.log("Done!");
}

main();
