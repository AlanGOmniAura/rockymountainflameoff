'use client';

import React from 'react';
import EditorShell from './EditorShell';
import ImagePicker from './ImagePicker';
import DriveFolderPicker from './DriveFolderPicker';
import { updateDraft } from '@/app/actions/content';

export default function RentalsEditorClient({ data, photos }: { data: any; photos: any[] }) {
    const hero = data.hero || {};
    const torches = data.torches || [];
    const included = data.included || [];
    const requirements = data.requirements || '';

    async function handleSave(formData: FormData) {
        await updateDraft('rentals', formData);
    }

    return (
        <form action={handleSave} id="rentals-editor-form">
            <EditorShell
                title="Torch Rentals"
                description="Manage the hero section, equipment lists, and requirements for studio torch rentals."
                onSave="true"
                formId="rentals-editor-form"
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Left Side: Hero Section */}
                    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            Hero Section
                        </h2>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Title
                            </label>
                            <input
                                name="hero_title"
                                defaultValue={hero.title}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-lg font-bold text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Description
                            </label>
                            <textarea
                                name="hero_description"
                                defaultValue={hero.description}
                                rows={4}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Hero Image
                            </label>
                            <ImagePicker
                                name="hero_imageSrc"
                                defaultValue={hero.imageSrc}
                                photos={photos}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Image Alt Text
                            </label>
                            <input
                                name="hero_imageAlt"
                                defaultValue={hero.imageAlt}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                CTA Link
                            </label>
                            <input
                                name="hero_linkHref"
                                defaultValue={hero.linkHref}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                CTA Button Text
                            </label>
                            <input
                                name="hero_linkText"
                                defaultValue={hero.linkText}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Parallax Background
                            </label>
                            <ImagePicker
                                name="hero_parallaxBg"
                                defaultValue={hero.parallaxBg}
                                photos={photos}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Torch Rental Image Folder (ID)
                            </label>
                            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-1">
                                <DriveFolderPicker
                                    name="galleryFolderId"
                                    defaultValue={
                                        data.galleryFolderId || '1Ef7JZPwn0mWdX-ggo8eNoSq694BQXAVH'
                                    }
                                />
                            </div>
                            <p className="mt-2 px-1 text-[10px] italic text-zinc-400">
                                Select a specific Google Drive folder for Torch Rental photos.
                            </p>
                        </div>
                    </section>

                    {/* Right Side: Equipment & Requirements */}
                    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            Equipment & Requirements
                        </h2>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Torches (one per line)
                            </label>
                            <textarea
                                name="torches"
                                defaultValue={torches.join('\n')}
                                rows={6}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-white"
                                placeholder={'e.g. 5 GTT Sidewinders\nGTT Phantom\nGTT Delta Elite'}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Included (one per line)
                            </label>
                            <textarea
                                name="included"
                                defaultValue={included.join('\n')}
                                rows={6}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-white"
                                placeholder={'e.g. Oxygen and Gas\nBasic Hand Tools\nKiln Space'}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Requirements
                            </label>
                            <textarea
                                name="requirements"
                                defaultValue={requirements}
                                rows={5}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                placeholder="Experience requirements, safety guidelines, etc."
                            />
                        </div>
                    </section>
                </div>
            </EditorShell>
        </form>
    );
}
