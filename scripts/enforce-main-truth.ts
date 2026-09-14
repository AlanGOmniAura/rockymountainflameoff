import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function sync() {
    console.log("Starting GitHub Main Truth Sync...");

    // 1. Read content.json as base
    const contentPath = path.join(process.cwd(), "src", "data", "content.json");
    const json = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
    
    // We'll use the 'live' part of content.json as the baseline for draft too
    const truth = { ...json.live };

    // 2. High-Priority Overrides From Components (The "Real" Source of Truth on Main)
    
    // Hero Slider
    truth.home = truth.home || {};
    truth.home.hero = [
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
            image: "/api/image-proxy?id=1JqUMQR-0xvu7uobetu6uOAWNTvlm18H0",
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

    // Tiles
    truth.home.tiles = [
        { title: "Glass Blowing Experience", image: "/images/tiles/experience.webp", link: "/classes/experience" },
        { title: "Couples Glass Blowing Date", image: "/api/image-proxy?id=1JqUMQR-0xvu7uobetu6uOAWNTvlm18H0", link: "/classes/couples" },
        { title: "Glass Blowing 101", image: "/images/tiles/101.jpg", link: "/classes/101" },
        { title: "Youth Glass Blowing Class", image: "/api/image-proxy?id=1VWuB9yn-jHB6Cb_O-vwr75cevrloeB9O", link: "/classes/youth" },
        { title: "Private/Family Glass Party", image: "/images/tiles/birthday.jpg", link: "/classes/party" },
        { title: "Celebration of Life", image: "/api/image-proxy?id=1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9", link: "/classes/celebration-of-life" },
        { title: "Holiday Ornament Glass Class", image: "/images/tiles/holiday.jpg", link: "/classes/ornament" },
        { title: "Team Building Events", image: "/images/tiles/team.jpg", link: "/classes/team-building" }
    ];

    // Banner & Settings
    truth.settings = {
        banner: { 
            enabled: true, 
            text: "Denver’s Coolest Glassblowing Studio! Our Average Studio Temperature is 74F. • ", 
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
            galleryFolderId: "1-9_f9Gv2m-6nI-uXz6y3d-wL2vP6S4yR"
        }
    };

    // Home Sections Overrides (Source of Truth for Marketing Copy)
    truth.home.sections = [
        {
            id: "experience",
            title: "Glass Blowing Experience",
            description: "Our most popular glass blowing class caters to individuals or small groups, regardless of their level of expertise, and guarantees an enjoyable and stress free experience. The class introduces the fundamentals of glass blowing, and you will be presented with a range of project options to choose from.",
            imageSrc: "/images/glass-class-experience.png",
            linkHref: "/classes/glass-blowing-experience",
            linkText: "Book Now",
            parallaxBg: "/images/DSC_6551.webp",
            reversed: false
        },
        {
            id: "couples",
            title: "Glass Blowing Date Night",
            description: "Experience a date night you won't forget! This class offers a distinctive opportunity to combine the color preferences and contributions of two individuals, resulting in a huge, one-of-a-kind, double-sided marble collaboration.",
            imageSrc: "/api/image-proxy?id=1JqUMQR-0xvu7uobetu6uOAWNTvlm18H0",
            linkHref: "/classes/couples-date-night",
            linkText: "Book Now",
            parallaxBg: "/images/DSC_6544.webp",
            reversed: true
        },
        {
            id: "birthday",
            title: "Glass Blowing Birthday Bash",
            description: "Looking for the ideal experience for your artistic and creative friend? Look no further! With our private glass blowing birthday class, you and your special guest can create a unique piece of art. We cater to everyone, regardless of their previous exposure to glassblowing.",
            imageSrc: "/images/birthday-party.png",
            linkHref: "/classes/birthday-party",
            linkText: "Book Now",
            parallaxBg: "/images/hero-1.jpg",
            reversed: false
        },
        {
            id: "team",
            title: "Team Building",
            description: "Bring your colleagues together for a unique team building activity! Come together with your coworkers to learn the basic of glass blowing and create pieces of glass art to take home as a souvenir. Collaboration is key in the hot shop!",
            imageSrc: "/images/gallery/group.jpg",
            linkHref: "/classes/team-building",
            linkText: "Learn More",
            parallaxBg: "/images/WG-frontier.webp",
            reversed: true
        }
    ];

    // Class Details Overrides
    truth.classDetails = truth.classDetails || {};
    if (truth.classDetails.couples) {
        truth.classDetails.couples.image = "/api/image-proxy?id=1JqUMQR-0xvu7uobetu6uOAWNTvlm18H0";
    }
    if (truth.classDetails.youth) {
        truth.classDetails.youth.image = "/api/image-proxy?id=1VWuB9yn-jHB6Cb_O-vwr75cevrloeB9O";
    }
    if (truth.classDetails['celebration-of-life']) {
        truth.classDetails['celebration-of-life'].galleryFolderId = "155iQwfTgeBPcUAd3Pb-q-HGmF1K7kF-Y";
    }

    // Rentals Overrides
    truth.rentals = {
        hero: {
            title: "Torch Station Rentals",
            description: "Once you start to feel more comfortable with the craft, book a rental bench at Glass Class Denver for focused studio time. Choose to work on personal projects, practice your techniques, or move into production mode.",
            imageSrc: "/api/image-proxy?id=1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9",
            imageAlt: "Torch Station",
            linkHref: "https://fareharbor.com/embeds/book/glassclassdenver/items/627817/?full-items=yes&flow=955320",
            linkText: "Book Now",
            parallaxBg: "/images/hero-1.jpg"
        },
        torches: [
            "Carlisle CC Burners",
            "GTT Phantom & Mirage",
            "Nortel Red Max",
            "Bethlehem Bravo (Available for weekly/monthly)"
        ],
        included: [
            "Protective Safety Glasses",
            "Basic Hand Tools",
            "Kiln Space",
            "Oxygen & Propane"
        ],
        requirements: "Daily and weekly bench rental provides a torch, protective glasses, basic hand tools, and a kiln. Bring your own glass and raw materials. *Limited glass and supplies are available for purchase on site.\n\nRates:\n½ day $32\n1 day $53\n1 week $225\n2 week $400\n1 month $650 (24 Hour Access)"
    };

    // 3. Push to Supabase
    console.log("Upserting to Supabase...");
    const { error } = await supabase
        .from('app_content')
        .upsert({
            id: 'main',
            live_data: truth,
            draft_data: truth, // Sync Admin to Site Reality
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error("Sync Failed:", error);
    } else {
        console.log("✅ GitHub Main Truth Successfully Enforced!");
    }
}

sync();
