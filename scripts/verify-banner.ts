import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function verify() {
    console.log("Verifying Banner Content in Supabase...");
    const { data } = await supabase.from('app_content').select('*').eq('id', 'main').single();
    
    if (data) {
        const liveBanner = data.live_data?.settings?.banner;
        const draftBanner = data.draft_data?.settings?.banner;

        console.log("LIVE BANNER:", JSON.stringify(liveBanner, null, 2));
        console.log("DRAFT BANNER:", JSON.stringify(draftBanner, null, 2));

        if (JSON.stringify(data).includes("MibCon")) {
            console.log("❌ WARNING: 'MibCon' still exists in some data fields!");
        } else {
            console.log("✅ SUCCESS: No 'MibCon' references found in Supabase Main record!");
        }
    } else {
        console.log("❌ Error: Could not find 'main' record in Supabase.");
    }
}

verify();
