import { Firestore } from '@google-cloud/firestore';
import path from 'path';

async function checkDatabase(databaseId: string) {
    console.log(`\n=== Checking Firestore Database: ${databaseId} ===`);
    try {
        const db = new Firestore({
            projectId: 'wizard-shop',
            databaseId: databaseId,
            keyFilename: path.join(process.cwd(), 'service-account.json'),
        });

        const collections = await db.listCollections();
        console.log(`Found ${collections.length} collections:`);
        for (const col of collections) {
            console.log(`- Collection ID: ${col.id}`);
            const docs = await col.limit(5).get();
            console.log(`  Documents (up to 5):`);
            docs.forEach(doc => {
                console.log(`    * ${doc.id}:`, JSON.stringify(doc.data()).substring(0, 100));
            });
        }
    } catch (e: any) {
        console.error(`Failed to check database ${databaseId}:`, e.message);
    }
}

async function main() {
    await checkDatabase('glass-class-denver');
    await checkDatabase('(default)');
}

main();
