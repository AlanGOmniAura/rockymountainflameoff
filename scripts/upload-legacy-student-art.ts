import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = "1Z1Pia2Dgxy-0QydYjGAxqdn9WpZg-tkI";

// Specific mapping for legacy images
const LEGACY_DIR = path.join(process.cwd(), "..", "original_clone", "wp-content-orig", "uploads", "2023", "05");

const LEGACY_IMAGES = [
    { original: "Blown-Glass-Artwork-1-1.jpg", upload: "IMG_legacy_blown_glass_artwork.jpg" },
    { original: "Glass-Made-in-Class-1.jpg", upload: "IMG_legacy_glass_made_in_class.jpg" },
    { original: "Glass-Christmas-Ornaments-Made-in-Class-1.jpg", upload: "IMG_legacy_ornaments_in_class.jpg" },
    { original: "Date-Night-Glass-Marble-1.jpg", upload: "IMG_legacy_date_night_marble.jpg" },
    { original: "Glass-Marble-1.jpg", upload: "IMG_legacy_glass_marble.jpg" },
];

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

async function uploadFile(sourceName: string, targetName: string) {
    const filePath = path.join(LEGACY_DIR, sourceName);

    if (!fs.existsSync(filePath)) {
        console.error(`Error: Source file does not exist: ${filePath}`);
        return;
    }

    try {
        const fileMetadata = {
            name: targetName,
            parents: [FOLDER_ID!],
        };
        const media = {
            mimeType: "image/jpeg",
            body: fs.createReadStream(filePath),
        };

        const res = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, name",
            supportsAllDrives: true,
        });

        console.log(`Uploaded: ${sourceName} -> ${targetName} (ID: ${res.data.id})`);
    } catch (error: any) {
        console.error(`Failed to upload ${sourceName}:`, JSON.stringify(error.response ? error.response.data : error, null, 2));
    }
}

async function main() {
    console.log(`Legacy Directory: ${LEGACY_DIR}`);
    console.log(`Target Drive Folder ID: ${FOLDER_ID}`);

    for (const item of LEGACY_IMAGES) {
        await uploadFile(item.original, item.upload);
    }

    console.log("Upload complete!");
}

main();
