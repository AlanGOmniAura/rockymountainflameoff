'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import GalleryModal from './GalleryModal';

interface ImagePickerProps {
    name: string;
    defaultValue?: string;
    photos: any[];
    className?: string;
}

export default function ImagePicker({ name, defaultValue, photos, className }: ImagePickerProps) {
    const [value, setValue] = useState(defaultValue || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Find thumbnail for preview if value matches a gallery photo, otherwise use value directly (legacy URLs)
    const selectedPhoto = photos.find((p) => p.src === value || p.thumbnail === value);
    const previewSrc = selectedPhoto ? selectedPhoto.thumbnail : value;

    const handleSelect = (photo: any) => {
        // We use webContentLink (src) as the value
        // NOTE: Google Drive webContentLink sometimes forces download.
        // For <img> tags, 'thumbnailLink' is often safer but lower res,
        // or we need a proper proxy.
        // For now let's store the 'thumbnail' which is reliably displayable,
        // OR 'webContentLink' if that's what the previous code used.
        // Let's stick to what the action returns as 'src' but fall back to thumbnail if needed.
        // Actually, for display on site, we probably want the high-res one.
        // Let's store the 'src' (webContentLink) as the value.
        setValue(photo.src); // Or photo.thumbnail if src prevents embedding
        setIsModalOpen(false);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <input type="hidden" name={name} value={value} />

            <div className="flex items-start gap-4">
                <div
                    className="group relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    {previewSrc ? (
                        <img
                            src={previewSrc}
                            alt="Preview"
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-zinc-700">
                            <ImageIcon size={24} />
                        </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Change
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Image URL or Select from Gallery"
                            className="flex-1 rounded border border-zinc-800 bg-zinc-900 p-2 font-mono text-xs text-zinc-300 focus:border-primary focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
                        >
                            Select
                        </button>
                    </div>
                    {value && (
                        <button
                            type="button"
                            onClick={() => setValue('')}
                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                        >
                            <X size={12} /> Clear Image
                        </button>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <GalleryModal
                    photos={photos}
                    onSelect={handleSelect}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
