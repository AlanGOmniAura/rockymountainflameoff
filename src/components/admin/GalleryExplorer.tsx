'use client';

import React, { useState, useEffect } from 'react';
import { getFolders, getPhotos, removePhoto } from '@/app/actions/gallery';
import {
    Folder,
    ChevronRight,
    Image as ImageIcon,
    ArrowLeft,
    Trash2,
    ExternalLink,
} from 'lucide-react';

interface DriveItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    thumbnail?: string; // For files
    src?: string; // For files
}

export default function GalleryExplorer({ studioFolderId }: { studioFolderId?: string }) {
    const [source, setSource] = useState<'denver' | 'studio'>('denver');
    const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
    const [history, setHistory] = useState<{ id: string | undefined; name: string }[]>([
        { id: undefined, name: 'Denver Gallery' },
    ]);

    useEffect(() => {
        // Reset view when source changes
        const rootName = source === 'denver' ? 'Denver Gallery' : 'Studio Gallery';
        const rootId = source === 'denver' ? undefined : studioFolderId;

        setHistory([{ id: rootId, name: rootName }]);
        setCurrentFolderId(rootId);
    }, [source]);

    // Content state
    const [folders, setFolders] = useState<any[]>([]);
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent(currentFolderId);
    }, [currentFolderId]);

    async function loadContent(folderId?: string) {
        setLoading(true);
        try {
            // Fetch both folders and photos for the current directory
            const [folderData, photoData] = await Promise.all([
                getFolders(folderId),
                getPhotos(folderId),
            ]);

            setFolders(folderData || []);
            setPhotos(photoData || []);
        } catch (err) {
            console.error('Failed to load drive content:', err);
        } finally {
            setLoading(false);
        }
    }

    function handleNavigate(folderId: string, folderName: string) {
        setHistory([...history, { id: folderId, name: folderName }]);
        setCurrentFolderId(folderId);
    }

    function handleBack(index: number) {
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);
        setCurrentFolderId(newHistory[newHistory.length - 1].id);
    }

    async function handleDelete(photoId: string) {
        if (
            !confirm(
                'Are you sure you want to delete this photo locally? (Drive permissions may apply)'
            )
        )
            return;

        await removePhoto(photoId);
        // Refresh current view
        loadContent(currentFolderId);
    }

    return (
        <div className="space-y-6">
            {/* Source Toggle */}
            <div className="flex w-fit gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
                <button
                    onClick={() => setSource('denver')}
                    className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${
                        source === 'denver'
                            ? 'bg-white text-black'
                            : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    Denver Site
                </button>
                <button
                    onClick={() => setSource('studio')}
                    disabled={!studioFolderId}
                    className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${
                        source === 'studio'
                            ? 'bg-white text-black'
                            : 'text-zinc-400 hover:text-white'
                    } ${!studioFolderId ? 'cursor-not-allowed opacity-30' : ''}`}
                >
                    The Studio
                </button>
            </div>

            {/* Header / Breadcrumbs */}
            <div className="flex items-center gap-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                {history.map((item, i) => (
                    <div key={i} className="flex items-center whitespace-nowrap">
                        {i > 0 && <ChevronRight size={16} className="mx-2 text-zinc-400" />}
                        <button
                            onClick={() => handleBack(i)}
                            className={`flex items-center gap-2 transition-colors hover:text-white ${
                                i === history.length - 1 ? 'font-bold text-white' : 'text-zinc-400'
                            }`}
                        >
                            {i === 0 && <Folder size={16} />}
                            {item.name}
                        </button>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="py-20 text-center text-zinc-400">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    Loading content...
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Folders Section */}
                    {folders.length > 0 && (
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                                Folders
                            </h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                {folders.map((folder: any) => (
                                    <button
                                        key={folder.id}
                                        onClick={() => handleNavigate(folder.id, folder.name)}
                                        className="group flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:scale-105 hover:bg-zinc-800"
                                    >
                                        <Folder
                                            size={48}
                                            className="mb-3 text-zinc-700 transition-colors group-hover:text-yellow-500"
                                        />
                                        <span className="w-full truncate px-2 text-center text-sm font-medium text-zinc-300">
                                            {folder.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Photos Section */}
                    <div>
                        <h3 className="mb-4 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-zinc-400">
                            <span>
                                Photos ({photos.length}){' '}
                                <span className="ml-2 text-xs font-normal opacity-50">
                                    ID: {currentFolderId || 'Root'}
                                </span>
                            </span>
                            {currentFolderId && (
                                <a
                                    href={`https://drive.google.com/drive/u/0/folders/${currentFolderId}`}
                                    target="_blank"
                                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                    Open in Google Drive <ExternalLink size={12} />
                                </a>
                            )}
                        </h3>

                        {photos.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 py-12 text-center">
                                <p className="text-sm text-zinc-400">No photos in this folder.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                                {photos.map((photo: any) => (
                                    <div
                                        key={photo.id}
                                        className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950"
                                    >
                                        <img
                                            src={photo.src} // Local proxy URL
                                            alt={photo.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-zinc-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                                            <a
                                                href={photo.src}
                                                target="_blank"
                                                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
                                                title="View Full Size"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(photo.id)}
                                                className="rounded-full bg-red-500/20 p-2 text-red-500 backdrop-blur-sm transition-colors hover:bg-red-500/80 hover:text-white"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 truncate bg-zinc-950/50 p-2 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                            {photo.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
