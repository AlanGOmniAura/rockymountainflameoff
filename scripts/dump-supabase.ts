import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function dump() {
    console.log("Fetching from Supabase...");
    const { data, error } = await supabase
        .from('app_content')
        .select('*')
        .eq('id', 'main')
        .single();
    
    if (error) {
        console.error("Error:", error);
        return;
    }

    fs.writeFileSync('supabase-dump.json', JSON.stringify(data, null, 2));
    console.log("✅ Dumped to supabase-dump.json");
}

dump();
