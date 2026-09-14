'use client';

import React, { useState, useEffect } from 'react';
import { getFolders } from '@/app/actions/gallery';
import { Folder, FolderOpen, ChevronRight, Check } from 'lucide-react';

interface DriveFolder {
    id: string;
    name: string;
}

interface DriveFolderPickerProps {
    name: string;
    defaultValue?: string;
}

export default function DriveFolderPicker({ name, defaultValue }: DriveFolderPickerProps) {
    const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
    const [folders, setFolders] = useState<DriveFolder[]>([]);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<{ id: string | undefined; name: string }[]>([
        { id: undefined, name: 'Root' },
    ]);
    const [selectedId, setSelectedId] = useState<string>(defaultValue || '');

    useEffect(() => {
        loadFolders(currentFolderId);
    }, [currentFolderId]);

    async function loadFolders(parentId?: string) {
        setLoading(true);
        try {
            // If parentId is undefined, the server action defaults to the root folder
            const res = await getFolders(parentId);
            // Ensure types match by mapping and filtering
            const validFolders: DriveFolder[] = (res || [])
                .filter((f: any) => f.id && f.name)
                .map((f: any) => ({
                    id: f.id!,
                    name: f.name!,
                }));
            setFolders(validFolders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleNavigate(folder: DriveFolder) {
        setHistory([...history, { id: folder.id, name: folder.name }]);
        setCurrentFolderId(folder.id);
    }

    function handleBack(index: number) {
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);
        setCurrentFolderId(newHistory[newHistory.length - 1].id);
    }

    function handleSelect(folder: DriveFolder) {
        setSelectedId(folder.id);
    }

    return (
        <div className="rounded border border-zinc-800 bg-zinc-950 p-4">
            <input type="hidden" name={name} value={selectedId} />

            {/* Header: Selected Value */}
            <div className="mb-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-zinc-400">
                    Selected Folder ID
                </p>
                <code className="block break-all rounded bg-zinc-900 p-2 font-mono text-xs text-primary">
                    {selectedId || 'None'}
                </code>
            </div>

            {/* Browser Interface */}
            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                {/* Breadcrumbs */}
                <div className="no-scrollbar flex items-center gap-2 overflow-x-auto bg-zinc-800 px-3 py-2 text-sm">
                    {history.map((item, i) => (
                        <div key={i} className="flex items-center whitespace-nowrap">
                            {i > 0 && <ChevronRight size={14} className="mx-1 text-zinc-400" />}
                            <button
                                type="button"
                                onClick={() => handleBack(i)}
                                className={`hover:text-white ${i === history.length - 1 ? 'font-bold text-white' : 'text-zinc-400'}`}
                            >
                                {item.name}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Folder List */}
                <div className="max-h-60 min-h-[150px] overflow-y-auto p-2">
                    {loading ? (
                        <div className="py-8 text-center text-sm text-zinc-400">Loading...</div>
                    ) : folders.length === 0 ? (
                        <div className="py-8 text-center text-sm text-zinc-400">
                            No subfolders found.
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-1">
                            {folders.map((folder) => {
                                const isSelected = selectedId === folder.id;
                                return (
                                    <li
                                        key={folder.id}
                                        className={`group flex items-center justify-between rounded p-2 hover:bg-zinc-800 ${isSelected ? 'bg-zinc-800/50' : ''}`}
                                    >
                                        {/* Navigate Area */}
                                        <button
                                            type="button"
                                            onClick={() => handleNavigate(folder)}
                                            className="flex flex-1 items-center gap-3 text-left"
                                        >
                                            <Folder
                                                className="shrink-0 text-yellow-500"
                                                size={18}
                                            />
                                            <span className="truncate text-sm text-zinc-200">
                                                {folder.name}
                                            </span>
                                        </button>

                                        {/* Actions */}
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(folder)}
                                            className={`rounded border px-2 py-1 text-xs transition-colors ${
                                                isSelected
                                                    ? 'border-green-900 bg-green-900/30 text-green-400'
                                                    : 'border-zinc-700 bg-zinc-950 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                            }`}
                                        >
                                            {isSelected ? (
                                                <span className="flex items-center gap-1">
                                                    <Check size={12} /> Selected
                                                </span>
                                            ) : (
                                                'Select'
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
