const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://plpfxputyragussldcdk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { persistSession: false } }
);

async function main() {
  const { data, error } = await supabase
    .from('app_content')
    .select('live_data, draft_data')
    .eq('id', 'main')
    .single();

  if (error) {
    console.error('ERROR reading:', error);
    process.exit(1);
  }

  const live = data.live_data || {};
  const draft = data.draft_data || {};

  console.log('\n=== LIVE DATA ===');
  console.log('Top-level keys:', Object.keys(live));
  if (live.home) {
    console.log('home keys:', Object.keys(live.home));
    console.log('home.video:', JSON.stringify(live.home.video));
    console.log('home.courseImages count:', live.home.courseImages?.length);
    console.log('home.courseImages sample:', JSON.stringify((live.home.courseImages || []).slice(0,2)));
    console.log('home.hero count:', live.home.hero?.length);
    console.log('home.tiles count:', live.home.tiles?.length);
    console.log('home.sections count:', live.home.sections?.length);
    if (live.home.hero) {
      live.home.hero.forEach((h, i) => {
        if (!h.link) console.log(`  WARNING hero[${i}] NO link! title: ${h.title}`);
      });
    }
    if (live.home.tiles) {
      live.home.tiles.forEach((t, i) => {
        if (!t.link) console.log(`  WARNING tile[${i}] NO link! title: ${t.title}`);
      });
    }
    if (live.home.sections) {
      live.home.sections.forEach((s, i) => {
        if (!s.linkHref) console.log(`  WARNING section[${i}] NO linkHref! title: ${s.title}`);
      });
    }
  } else {
    console.log('NO home key in live_data!');
  }

  console.log('\n=== DRAFT DATA ===');
  console.log('Top-level keys:', Object.keys(draft));
  if (draft.home) {
    console.log('home keys:', Object.keys(draft.home));
    console.log('home.video:', JSON.stringify(draft.home.video));
    console.log('home.courseImages count:', draft.home.courseImages?.length);
  }
}

main().catch(e => console.error(e));
