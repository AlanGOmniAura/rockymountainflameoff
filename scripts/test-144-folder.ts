import { listGalleryPhotos } from "../src/lib/drive";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
    const folderId = "144G03Ct1cv8dcK9_PyeqSzZ-X7ZO5Xqm";
    console.log(`Checking folder: ${folderId}`);

    try {
        const files = await listGalleryPhotos(folderId);
        console.log(`listGalleryPhotos returned ${files.length} raw files.`);

        // Exact logic from getPhotos
        const excludeKeywords = [
            'youth', 'instructor', 'jon', 'team', 'group', 'couple', 'birthday',
            'party', 'class', 'learn', 'experience', 'holiday', 'frontier',
            'denver', 'logo', 'hero', 'private', 'adult-swim', 'GCD', 'PXL', 'DSC', 'IMG'
        ];

        const allowedArtFiles = [
            'artwork.jpg', 'marble.jpg', 'marble-date.jpg', 'made-in-class.jpg'
        ];

        const filtered = files
            .filter(f => f.id && f.name)
            .filter(f => {
                if (folderId) return true; // SHORCUT

                const name = (f.name || "").toLowerCase();
                const isLegacyArt = name.includes('legacy');
                const isKnownArt = allowedArtFiles.some(af => name.includes(af));
                return isLegacyArt || isKnownArt;
            })
            .map(f => ({
                id: f.id!,
                name: f.name!,
            }));

        console.log(`After filtering logic (with folderId = ${folderId}): ${filtered.length} images remain.`);
        if (filtered.length > 0) {
            console.log("First filtered image:", filtered[0].name);
        } else {
            console.log("No images survived the filter or no images were returned by listGalleryPhotos caching.");
        }

    } catch (e: any) {
        console.error("Test Error:", e.message);
    }
}

main();
