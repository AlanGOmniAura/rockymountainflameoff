import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Firestore } from '@google-cloud/firestore';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Supabase URL or Key not found in .env.local!');
    process.exit(1);
}

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connecting to Firestore (databaseId: "glass-class-denver")...');
const db = new Firestore({
    projectId: process.env.GOOGLE_PROJECT_ID || 'wizard-shop',
    databaseId: 'glass-class-denver',
});

async function runMigration() {
    try {
        // --- 1. Migrate app_content ---
        console.log('\n--- Migrating app_content table ---');
        const { data: contentData, error: contentError } = await supabase
            .from('app_content')
            .select('*');

        if (contentError) {
            throw new Error(`Failed to fetch app_content from Supabase: ${contentError.message}`);
        }

        console.log(`Fetched ${contentData?.length || 0} rows from app_content.`);

        for (const row of (contentData || [])) {
            console.log(`Migrating row: ${row.id}...`);
            await db.collection('app_content').doc(row.id).set({
                id: row.id,
                live_data: row.live_data || {},
                draft_data: row.draft_data || {},
                updated_at: row.updated_at || new Date().toISOString()
            });
            console.log(`Successfully migrated app_content: ${row.id}`);
        }

        // --- 2. Migrate qr_codes ---
        console.log('\n--- Migrating qr_codes table ---');
        const { data: qrData, error: qrError } = await supabase
            .from('qr_codes')
            .select('*');

        if (qrError) {
            throw new Error(`Failed to fetch qr_codes from Supabase: ${qrError.message}`);
        }

        console.log(`Fetched ${qrData?.length || 0} rows from qr_codes.`);

        let qrMigratedCount = 0;
        for (const row of (qrData || [])) {
            console.log(`Migrating QR Code: ${row.id} (${row.label || 'no label'})...`);
            await db.collection('qr_codes').doc(row.id).set({
                id: row.id,
                target_url: row.target_url,
                click_count: row.click_count || 0,
                style: row.style || 'classic',
                label: row.label || '',
                created_at: row.created_at || new Date().toISOString()
            });
            qrMigratedCount++;
        }
        console.log(`Successfully migrated ${qrMigratedCount} QR codes.`);

        console.log('\nMigration completed successfully!');
    } catch (err: any) {
        console.error('Migration failed with error:', err);
        process.exit(1);
    }
}

runMigration();
