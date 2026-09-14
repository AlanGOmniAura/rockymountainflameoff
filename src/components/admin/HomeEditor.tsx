import HomeEditorClient from './HomeEditorClient';

/**
 * Server Component that fetches data and passes it to the
 * interactive HomeEditorClient.
 */
export default async function HomeEditor({ data, photos }: { data: any; photos: any[] }) {
    // Ensure nested objects exist to avoid client errors
    const sanitizedData = {
        hero: data.hero || [],
        tiles: data.tiles || [],
        sections: data.sections || [],
        faqs: data.faqs || [],
        courseImages: data.courseImages || [],
        video: data.video || {},
        intro: data.intro || {},
    };

    return <HomeEditorClient data={sanitizedData} photos={photos} />;
}
