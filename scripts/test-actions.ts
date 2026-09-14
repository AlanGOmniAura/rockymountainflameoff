import { listGalleryPhotos } from "../src/lib/drive";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

async function main() {
    console.log("Testing GOOGLE_DRIVE_FOLDER_ID:", process.env.GOOGLE_DRIVE_FOLDER_ID);
    try {
        const p1 = await listGalleryPhotos(process.env.GOOGLE_DRIVE_FOLDER_ID);
        console.log(`Found ${p1.length} raw files.`);
        p1.slice(0, 5).forEach(f => console.log(`- ${f.name}`));
    } catch (e: any) {
        console.error("Failed:", e.message);
    }

    console.log("\nTesting GOOGLE_DRIVE_LEGACY_FOLDER_ID:", process.env.GOOGLE_DRIVE_LEGACY_FOLDER_ID);
    try {
        const p2 = await listGalleryPhotos(process.env.GOOGLE_DRIVE_LEGACY_FOLDER_ID);
        console.log(`Found ${p2.length} raw files.`);
        p2.forEach(p => console.log(`- ${p.name}`));
    } catch (e: any) {
        console.error("Failed:", e.message);
    }
}

main();
