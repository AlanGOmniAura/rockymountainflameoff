import { NextResponse } from 'next/server';
import { listGalleryPhotos } from '@/lib/drive';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const photos = await listGalleryPhotos();
        const cleanPhotos = photos
            .filter((f) => f.id && f.name)
            .map((f) => ({
                id: f.id,
                name: f.name,
                src: `/api/image-proxy?id=${f.id}`,
                thumbnail: f.thumbnailLink,
            }));

        return NextResponse.json(cleanPhotos);
    } catch (error) {
        console.error('Error in /api/gallery:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
