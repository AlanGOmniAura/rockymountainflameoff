'use client';

import React from 'react';
import EditorShell from './EditorShell';
import ImagePicker from './ImagePicker';
import { updateDraft } from '@/app/actions/content';

export default function AboutEditorClient({ data, photos }: { data: any; photos: any[] }) {
    const instructor = data.instructor || {};
    const studio = data.studio || {};

    async function handleSave(formData: FormData) {
        await updateDraft('about', formData); // Action will need to be updated to handle this
    }

    return (
        <form action={handleSave} id="about-editor-form">
            <EditorShell
                title="About Page Content"
                description="Manage information about the instructor and the studio."
                onSave="true"
                formId="about-editor-form"
            >
                {/* INSTRUCTOR */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                    <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                        Instructor Profile
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Heading
                                </label>
                                <input
                                    name="instr_title"
                                    defaultValue={instructor.title}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Biography / Description
                                </label>
                                <textarea
                                    name="instr_description"
                                    defaultValue={instructor.description}
                                    rows={8}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Profile Photo
                                </label>
                                <ImagePicker
                                    name="instr_imageSrc"
                                    defaultValue={instructor.imageSrc}
                                    photos={photos}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Background Parallax Image
                                </label>
                                <ImagePicker
                                    name="instr_parallaxBg"
                                    defaultValue={instructor.parallaxBg}
                                    photos={photos}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Button Text
                                    </label>
                                    <input
                                        name="instr_linkText"
                                        defaultValue={instructor.linkText}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Button Link
                                    </label>
                                    <input
                                        name="instr_linkHref"
                                        defaultValue={instructor.linkHref}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STUDIO */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                    <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                        Studio Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Title
                            </label>
                            <input
                                name="studio_title"
                                defaultValue={studio.title}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-bold text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Description Text
                            </label>
                            <textarea
                                name="studio_text"
                                defaultValue={studio.text}
                                rows={6}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                            />
                        </div>
                    </div>
                </section>
            </EditorShell>
        </form>
    );
}
