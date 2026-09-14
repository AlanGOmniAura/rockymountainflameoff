import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://plpfxputyragussldcdk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function main() {
    const { data, error } = await supabase.from('app_content').select('draft_data').eq('id', 'main').single();
    if (error) {
        console.error(error);
        return;
    }
    console.log(JSON.stringify(data.draft_data.about, null, 2));
}

main();
