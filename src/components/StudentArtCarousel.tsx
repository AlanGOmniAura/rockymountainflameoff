import dynamic from 'next/dynamic';
import { getPhotos } from '@/app/actions/gallery';

const CarouselModule = dynamic(() => import('./CarouselModule'), {
    ssr: true,
    loading: () => <div className="mx-4 h-96 animate-pulse rounded-xl bg-gray-200" />,
});

export default async function StudentArtCarousel() {
    let studentImages: { image: string }[] = [];
    try {
        // Calling getPhotos() with the correct root folder for Student Art classes
        const currentPhotos = await getPhotos('1K1bKeFOoGfEQUjrVH8RdfYlUgVavrTMR');
        studentImages = currentPhotos.map((p) => ({ image: p.src }));
        console.log(`[DEBUG] StudentArtCarousel: Fetched ${studentImages.length} images`);
    } catch (error) {
        console.error('Failed to fetch student images in StudentArtCarousel:', error);
    }

    return <CarouselModule title="Student Glass Art Pieces" items={studentImages} />;
}
