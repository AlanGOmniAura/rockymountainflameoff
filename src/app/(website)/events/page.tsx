import Section from '@/components/Section';
import HeroSlider from '@/components/HeroSlider';
import ClassGallery from '@/components/ClassGallery';
import { getPhotos } from '@/app/actions/gallery';
import { getContent } from '@/app/actions/content';
import VideoModule from '@/components/VideoModule';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
    const content = await getContent();
    const classDetails = content.classDetails || {};

    // Fetch photos if IDs are present
    const corporateId = classDetails['corporate-events']?.galleryFolderId;
    const partyId = classDetails['private-parties']?.galleryFolderId;

    const [corporatePhotos, partyPhotos] = await Promise.all([
        corporateId ? await getPhotos(corporateId) : [],
        partyId ? await getPhotos(partyId) : [],
    ]);

    const heroSlides = content.eventsPage?.heroSlides || [];
    const sections = content.home?.sections || [];
    const teamSection = sections.find((s: any) => s.id === 'team') || {
        title: 'Team Building',
        description: 'Bring your colleagues together for a unique team building activity!',
        imageSrc: '/images/gallery/group.jpg',
        linkHref: '/contact',
        linkText: 'Inquire for Rates',
        parallaxBg: '/images/WG-frontier.webp',
    };

    const partySection = sections.find((s: any) => s.id === 'birthday') || {
        title: 'Private Parties',
        description: 'Looking for the ideal experience for your artistic and creative friend?',
        imageSrc: '/images/tiles/birthday.jpg',
        linkHref: '/contact',
        linkText: 'Inquire Now',
        parallaxBg: '/images/hero-1.jpg',
    };

    const DEFAULT_VIDEO = {
        src: 'https://www.youtube.com/embed/j3yWiO2NTv4',
        title: 'Glass Class Denver Video Preview',
        description:
            'Check out this video to see highlights from a public Glass Blowing Experience!',
    };
    const video = content.home?.video?.src ? content.home.video : DEFAULT_VIDEO;

    return (
        <main>
            <HeroSlider items={heroSlides} />

            <div
                className="container"
                style={{
                    textAlign: 'center',
                    margin: '4rem auto',
                    maxWidth: '800px',
                    color: '#ccc',
                }}
            >
                <h1>Glass Blowing Parties & Events</h1>
                <p>{content.home?.intro?.text?.slice(0, 200)}...</p>
            </div>

            <VideoModule src={video.src} title={video.title} description={video.description} />

            <div className="spacer" />

            <Section
                title={teamSection.title}
                description={teamSection.description}
                imageSrc={teamSection.imageSrc}
                imageAlt={teamSection.title}
                linkHref={teamSection.linkHref || '/contact'}
                linkText={teamSection.linkText || 'Inquire for Rates'}
                parallaxBg={teamSection.parallaxBg}
                reversed={false}
            />
            {corporatePhotos.length > 0 && (
                <ClassGallery photos={corporatePhotos} title={`${teamSection.title} Gallery`} />
            )}

            <Section
                title={partySection.title}
                description={partySection.description}
                imageSrc={partySection.imageSrc}
                imageAlt={partySection.title}
                linkHref={partySection.linkHref || '/contact'}
                linkText={partySection.linkText || 'Inquire Now'}
                parallaxBg={partySection.parallaxBg}
                reversed={true}
            />
            {partyPhotos.length > 0 && (
                <ClassGallery photos={partyPhotos} title={`${partySection.title} Gallery`} />
            )}
        </main>
    );
}
