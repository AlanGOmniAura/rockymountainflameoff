import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
    revalidatePath('/');
    // @ts-ignore - bypassing misaligned generic types in this next.js version
    revalidateTag('gallery');
    return NextResponse.json({ revalidated: true, now: Date.now() });
}
