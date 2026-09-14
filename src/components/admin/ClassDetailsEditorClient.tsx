'use client';

import React from 'react';
import EditorShell from './EditorShell';
import ImagePicker from './ImagePicker';
import DriveFolderPicker from './DriveFolderPicker';
import { updateDraft } from '@/app/actions/content';

export default function ClassDetailsEditorClient({ data, photos }: { data: any; photos: any[] }) {
    const classes = Object.entries(data);

    async function handleSave(formData: FormData) {
        await updateDraft('classDetails', formData);
    }

    return (
        <form action={handleSave} id="class-details-editor-form">
            <EditorShell
                title="Individual Class Details"
                description="Manage specific information, images, and galleries for every class type."
                onSave="true"
                formId="class-details-editor-form"
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {classes.map(([slug, detail]: [string, any]) => (
                        <div key={slug} className="group flex flex-col">
                            {/* Hidden slug field for the server action parser */}
                            <input type="hidden" name="_slugs" value={slug} />

                            <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all hover:border-zinc-700">
                                <header className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                                    <h3 className="text-lg font-bold capitalize tracking-tight text-primary">
                                        {slug.replace(/-/g, ' ')}
                                    </h3>
                                    <div className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[10px] uppercase text-zinc-400">
                                        {slug}
                                    </div>
                                </header>

                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Display Title
                                        </label>
                                        <input
                                            name={`${slug}_title`}
                                            defaultValue={detail.title}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Description
                                        </label>
                                        <textarea
                                            name={`${slug}_description`}
                                            defaultValue={detail.description}
                                            rows={5}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Featured Image
                                        </label>
                                        <ImagePicker
                                            name={`${slug}_image`}
                                            defaultValue={detail.image}
                                            photos={photos}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Live Photo Gallery (Folder ID)
                                        </label>
                                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-1">
                                            <DriveFolderPicker
                                                name={`${slug}_galleryFolderId`}
                                                defaultValue={detail.galleryFolderId}
                                            />
                                        </div>
                                        <p className="mt-2 px-1 text-[10px] italic text-zinc-400">
                                            Selecting a folder will automatically pull all photos
                                            from Google Drive to the website's gallery for this
                                            class.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </EditorShell>
        </form>
    );
}
