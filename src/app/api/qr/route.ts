// src/app/api/qr/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firestore';
import QRCode from 'qrcode';

/**
 * POST /api/qr
 * Body: { targetUrl: string, style?: string }
 */
export async function POST(request: Request) {
  try {
    const { targetUrl, style = 'classic', label = '' } = await request.json();
    if (!targetUrl) {
      return NextResponse.json({ error: 'targetUrl is required' }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await db.collection('qr_codes').doc(id).set({
      id,
      target_url: targetUrl,
      click_count: 0,
      style,
      label,
      created_at: new Date().toISOString(),
    });
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const qrImageUrl = `${baseUrl}/api/qr?id=${id}`;
    return NextResponse.json({ id, qrImageUrl });
  } catch (e: any) {
    console.error('POST /api/qr error:', e);
    return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
  }
}

/**
 * GET /api/qr?id=xxx
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    try {
      const snapshot = await db.collection('qr_codes')
        .orderBy('created_at', 'desc')
        .get();
      const qrCodes = snapshot.docs.map(doc => doc.data());
      return NextResponse.json({ qrCodes });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  try {
    const doc = await db.collection('qr_codes').doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: 'QR Code not found' }, { status: 404 });
    }
    const data = doc.data() || {};
    const style = data.style || 'classic';
  
    // Construct the tracking URL dynamically based on the request's origin.
    // This encodes the redirect route `/qr/[id]` inside the QR pattern instead of the target URL directly,
    // enabling 100% accurate, independent scan counting from physical flyers/posters.
    const { origin } = new URL(request.url);
    const qrDataValue = `${origin}/qr/${id}`;

    if (style === 'classic') {
      const pngBuffer = await QRCode.toBuffer(qrDataValue, { 
        type: 'png',
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' }
      });
      return new Response(new Uint8Array(pngBuffer), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' } });
    }

    // Custom Artistic Renderer (SVG -> PNG-like response)
    const qr = QRCode.create(qrDataValue, { errorCorrectionLevel: 'H' });
    const { modules } = qr;
    const { size, data: matrix } = modules;
    
    let bgColor = '#09090b'; // zinc-950
    let dotColor = '#ffffff';
    let isRounded = false;

    if (style === 'gold') {
      dotColor = '#fbbf24'; // amber-400 (Gold)
      isRounded = true;
    } else if (style === 'glass') {
      dotColor = '#22d3ee'; // cyan-400
      isRounded = false;
    } else if (style === 'lava') {
      dotColor = '#f87171'; // red-400
      isRounded = true;
    }

    const margin = 2;
    const totalSize = size + margin * 2;
    const cellSize = 10;
    const viewSize = totalSize * cellSize;

    let svgPaths = '';
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (matrix[row * size + col]) {
          const x = (col + margin) * cellSize;
          const y = (row + margin) * cellSize;
          
          if (isRounded) {
            svgPaths += `<circle cx="${x + cellSize/2}" cy="${y + cellSize/2}" r="${cellSize/2.2}" fill="${dotColor}" />`;
          } else {
            svgPaths += `<rect x="${x}" y="${y}" width="${cellSize * 0.9}" height="${cellSize * 0.9}" rx="1" fill="${dotColor}" />`;
          }
        }
      }
    }

    const svg = `
      <svg width="${viewSize}" height="${viewSize}" viewBox="0 0 ${viewSize} ${viewSize}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}" />
        ${svgPaths}
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e: any) {
    console.error('QR generation error:', e);
    return NextResponse.json({ error: e.message || 'Failed to generate QR code' }, { status: 500 });
  }
}

/**
 * DELETE /api/qr?id=xxx
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    await db.collection('qr_codes').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('DELETE /api/qr error:', e);
    return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
  }
}

