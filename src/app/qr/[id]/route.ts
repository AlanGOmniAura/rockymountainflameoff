// src/app/qr/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firestore';
import { FieldValue } from '@google-cloud/firestore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // 1. Fetch the QR code target URL
    const docRef = db.collection('qr_codes').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.error('QR code redirect error (not found in Firestore):', id);
      // If the QR code is not in the database, redirect to main site to avoid showing a broken page
      return NextResponse.redirect(new URL('/', request.url));
    }

    const data = doc.data();
    if (!data || !data.target_url) {
      console.error('QR code has no target_url:', id);
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Increment click count in Firestore atomically
    // We await this to ensure the hit is recorded before redirecting on serverless containers
    try {
      await docRef.update({
        click_count: FieldValue.increment(1)
      });
    } catch (updateError) {
      console.error('Failed to increment click count:', updateError);
    }

    // 3. Normalize and redirect to the target URL
    let destination = data.target_url.trim();
    if (!/^https?:\/\//i.test(destination)) {
      destination = `https://${destination}`;
    }

    // Perform a standard 302 Temporary Redirect so that the user's browser doesn't cache
    // the redirect forever (allowing the target URL to be updated dynamically later).
    return NextResponse.redirect(new URL(destination));
  } catch (e) {
    console.error('Redirect route crashed:', e);
    // Fallback to home page on exception
    return NextResponse.redirect(new URL('/', request.url));
  }
}
