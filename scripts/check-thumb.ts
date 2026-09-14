
import { listGalleryPhotos } from "../src/lib/drive";
import { config } from "dotenv";
config({ path: ".env.local" });

async function check() {
    try {
        console.log("Listing photos...");
        const photos = await listGalleryPhotos(); // default folder
        if (photos.length > 0) {
            console.log(`Found ${photos.length} photos.`);
            photos.slice(0, 5).forEach((p, i) => {
                console.log(`[${i}] ID: ${p.id}`);
                console.log(`    Name: ${p.name}`);
                console.log(`    Thumb: ${p.thumbnailLink}`);
                if (p.thumbnailLink) {
                    const high = p.thumbnailLink.replace(/=s\d+$/, "=s1600");
                    console.log(`    High:  ${high}`);
                }
            });
        } else {
            console.log("No photos found.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

check();
