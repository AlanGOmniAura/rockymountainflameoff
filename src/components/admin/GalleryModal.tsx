'use client';

import { X } from 'lucide-react';

interface GalleryModalProps {
    photos: any[];
    onSelect: (photo: any) => void;
    onClose: () => void;
}

export default function GalleryModal({ photos, onSelect, onClose }: GalleryModalProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm">
            <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                <header className="flex items-center justify-between rounded-t-xl border-b border-zinc-800 bg-zinc-950 p-4">
                    <h3 className="text-lg font-bold text-white">Select Image</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4">
                    {photos.length === 0 ? (
                        <div className="py-20 text-center text-zinc-400">
                            No images found in gallery.
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                            {photos.map((photo) => (
                                <button
                                    key={photo.id}
                                    onClick={() => onSelect(photo)}
                                    className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <img
                                        src={photo.thumbnail}
                                        alt={photo.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-zinc-950/0 transition-colors group-hover:bg-zinc-950/20" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
