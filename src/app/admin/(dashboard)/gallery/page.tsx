import { Images, ExternalLink } from 'lucide-react';
import GalleryExplorer from '@/components/admin/GalleryExplorer';
import { getSiteConfig } from '@/data/settings';

export default async function GalleryPage() {
    const config = await getSiteConfig();
    const studioFolderId = config.studio?.galleryFolderId;

    return (
        <div className="mx-auto max-w-7xl pb-20">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 flex items-center gap-3 font-outfit text-3xl font-bold">
                        <Images className="text-primary" /> Photo Gallery
                    </h1>
                    <p className="text-zinc-400">
                        Browse and manage photos directly from Google Drive.
                    </p>
                </div>
                <div className="flex gap-3">
                    <a
                        href="https://drive.google.com/drive/"
                        target="_blank"
                        className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                    >
                        <ExternalLink size={16} /> Open Drive
                    </a>
                </div>
            </header>

            <GalleryExplorer studioFolderId={studioFolderId} />
        </div>
    );
}
