import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE URL or KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const HERO_DEFAULTS = [
    {
        image: "/images/hero-real.webp",
        title: "Denver's Premier Glass Blowing Experience",
        subtitle: "in a Luxurious Air Conditioned Studio!",
        link: "https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320",
        linkText: "Book a Class"
    },
    {
        image: "/images/DSC_6524.webp",
        title: "Family and Youth Glass Blowing Experiences",
        subtitle: "in a safe and fun environment.",
        link: "https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320",
        linkText: "Book a Class"
    },
    {
        image: "/images/slider-real/couple-date.jpg",
        title: "Denver's Best Date Night",
        subtitle: "anniversaries, special occasions, just plain fun.",
        link: "https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320",
        linkText: "Book a Class"
    },
    {
        image: "/images/DSC_6551.webp",
        title: "Official Partner of Denver University",
        subtitle: "Providing Team Building Classes on demand.",
        link: "/contact",
        linkText: "Contact Us For Event Bookings."
    }
];

const TILE_DEFAULTS = [
    { title: "Glass Blowing Experience", image: "/images/tiles/experience.webp", link: "/classes/experience" },
    { title: "Couples Glass Blowing Date", image: "/images/tiles/couples.jpg", link: "/classes/couples" },
    { title: "Glass Blowing 101", image: "/images/tiles/101.jpg", link: "/classes/101" },
    { title: "Holiday Ornament Glass Class", image: "/images/tiles/holiday.jpg", link: "/classes/ornament" },
    { title: "Private/Family Glass Party", image: "/images/tiles/birthday.jpg", link: "/classes/party" },
    { title: "Team Building Events", image: "/images/tiles/team.jpg", link: "/classes/team-building" },
    { title: "Youth Glass Blowing Class", image: "/images/tiles/youth.jpg", link: "/classes/youth" },
];

const DEFAULT_BANNER_TEXT = "Denver’s Coolest Glassblowing Studio! Our Average Studio Temperature is 74F. • ";

const COURSE_IMAGES = [
  { image: "/images/gallery/group.jpg" },
  { image: "/images/gallery/private.jpg" },
  { image: "/images/gallery/learn.jpg" },
  { image: "/images/gallery/classes-denver.jpg" },
  { image: "/images/gallery/denver.jpg" },
];

const DEFAULT_FAQS = [
    {
        question: "What is the glass blowing process?",
        answer: "Glass blowing is a traditional method of shaping molten glass into various objects using a combination of breath, tools, and techniques. The process typically involves preparation, coloring, shaping, blowing, detailing, and annealing (cooling). At Glass Class Denver we simplify the process so anyone can create a beautiful piece."
    },
    {
        question: "What is an Opal Add On?",
        answer: "You may choose to use Gilson opals by enclosing them in glass and incorporating them into your project. Encasing the opal magnifies its appearance and creates a stunning, glittering centerpiece. We have colors like fire black, cotton candy, and blood orange."
    },
    {
        question: "What can we make in our class blowing class?",
        answer: "Projects include: Air plant terrariums, plant watering globes, marbles, pendants, pipes, shot glasses, and candle holders. We are always adding new projects and are open to unique ideas!"
    }
];

const DEFAULT_VIDEO = {
    src: "https://www.youtube.com/embed/j3yWiO2NTv4",
    title: "Glass Class Denver Video Preview",
    description: "Check out this video to see highlights from a public Glass Blowing Experience!"
};

const SETTINGS_DEFAULT = {
    banner: { 
        enabled: true, 
        text: DEFAULT_BANNER_TEXT, 
        link: "/classes", 
        speed: 60 
    },
    contact: {
        phone: "720-995-4742",
        email: "info@glassclassdenver.com",
        address: "2830 S Elati St, Unit #4, Englewood, Co 80110",
        instagram: "https://www.instagram.com/glassclassdenver/",
        facebook: "https://www.facebook.com/glassclassdenver"
    },
    studio: {
        galleryFolderId: "1-9_f9Gv2m-6nI-uXz6y3d-wL2vP6S4yR" // Example folder ID
    }
};

async function migrate() {
  const contentPath = path.join(process.cwd(), "src", "data", "content.json");
  console.log("Reading from:", contentPath);

  try {
    const data = await fs.readFile(contentPath, "utf-8");
    const json = JSON.parse(data);

    // Force sync home content and settings with website reality
    if (!json.live.home) json.live.home = {};
    if (!json.draft.home) json.draft.home = {};

    [json.live, json.draft].forEach(target => {
        target.home.hero = HERO_DEFAULTS; 
        target.home.tiles = TILE_DEFAULTS; 
        target.home.faqs = DEFAULT_FAQS;
        target.home.video = DEFAULT_VIDEO;
        target.home.courseImages = COURSE_IMAGES;
        target.settings = SETTINGS_DEFAULT; // Consolidate settings here
    });

    console.log("Uploading to Supabase...");
    const { error } = await supabase
      .from('app_content')
      .upsert({
        id: 'main',
        live_data: json.live || {},
        draft_data: json.draft || {},
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;
    console.log("✅ Successfully migrated local content (with hardcoded defaults) to Supabase!");

  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
