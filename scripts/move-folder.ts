import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");
const FOLDER_ID = "1TRPdL8Ss80dvZamywszb4Xffb8oLQkFz";
const NEW_PARENT_ID = "1FLAGzmaWcyoKyLP1uFH72kom3N1qm4SJ";

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function main() {
    console.log(`Moving Folder ${FOLDER_ID} to Parent ${NEW_PARENT_ID}`);
    try {
        // Get current parents
        const file = await drive.files.get({
            fileId: FOLDER_ID,
            fields: "parents",
            supportsAllDrives: true,
        });
        const previousParents = file.data.parents?.join(",") || "";

        // Move the file to the new folder
        const res = await drive.files.update({
            fileId: FOLDER_ID,
            addParents: NEW_PARENT_ID,
            removeParents: previousParents,
            fields: "id, parents",
            supportsAllDrives: true,
        });

        console.log(`Success! Folder move complete. New parents: ${res.data.parents}`);
    } catch (error: any) {
        console.error("Folder move failed:", error.response ? error.response.data : error.message);
    }
}

main();
