import { NextRequest, NextResponse } from 'next/server';
import { openFileStream, openThumbnailStream, driveClient } from '@/lib/drive';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get('id');

    if (!fileId) {
        return new NextResponse('Missing file ID', { status: 400 });
    }

    const useFull = searchParams.get('full') === 'true';

    try {
        // Fetch metadata to get the actual mimeType of the file
        const meta = await driveClient.files.get({
            fileId,
            fields: 'mimeType',
            supportsAllDrives: true,
        });
        const mimeType = meta.data.mimeType || 'image/jpeg';

        let stream;
        // Always stream full file for videos
        if (useFull || mimeType.startsWith('video/')) {
            stream = await openFileStream(fileId);
        } else {
            stream = await openThumbnailStream(fileId, 1600);
            if (!stream) {
                console.log('Thumbnail failed, falling back to full stream');
                stream = await openFileStream(fileId);
            }
        }

        if (!stream) {
            return new NextResponse('File not found or error', { status: 404 });
        }

        const headers = new Headers();
        headers.set('Content-Type', mimeType);
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');

        console.log(`[ImageProxy] Serving ID: ${fileId} (MimeType: ${mimeType})`);

        return new NextResponse(stream as any, { headers });
    } catch (e) {
        console.error('[ImageProxy] Error proxying file:', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
