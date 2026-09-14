import { getStore } from "@netlify/blobs";

async function fixBanner() {
    console.log("Fixing Banner in Netlify Blobs...");
    const configStore = getStore('site-config');
    
    const correctText = "Denver’s Coolest Glassblowing Studio! Our Average Studio Temperature is 74F. • ";
    
    const newConfig = {
        banner: {
            enabled: true,
            text: correctText,
            link: "/classes",
            speed: 60
        },
        contact: {
            phone: "720-995-4742",
            email: "info@glassclassdenver.com",
            address: "2830 S Elati St, Unit #4, Englewood, Co 80110",
            instagram: "https://www.instagram.com/glassclassdenver/",
            facebook: "https://www.facebook.com/glassclassdenver"
        }
    };

    await configStore.setJSON('main', newConfig);
    console.log("✅ Banner and Config fixed in Netlify Blobs!");
}

fixBanner();
