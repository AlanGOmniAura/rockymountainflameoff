'use client';

import React from 'react';
import EditorShell from './EditorShell';
import DynamicList from './DynamicList';
import ImagePicker from './ImagePicker';
import { updateDraft } from '@/app/actions/content';

export default function ClassesEditorClient({ data, photos }: { data: any; photos: any[] }) {
    const slides = data.heroSlides || [];

    async function handleSave(formData: FormData) {
        await updateDraft('classesPage', formData);
    }

    return (
        <form action={handleSave} id="classes-editor-form">
            <EditorShell
                title="Classes Landing Page"
                description="Manage the top-level categories and hero slider for glass classes."
                onSave="true"
                formId="classes-editor-form"
            >
                <DynamicList
                    title="Classes Hero Slider"
                    name="slides"
                    items={slides}
                    onAdd={() => ({
                        title: 'New Class Slide',
                        subtitle: '',
                        image: '',
                        link: '',
                        linkText: 'Book Now',
                    })}
                    renderItem={(item: any, index: number) => (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Heading
                                    </label>
                                    <input
                                        name={`slides_title_${index}`}
                                        defaultValue={item.title}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Subheading
                                    </label>
                                    <input
                                        name={`slides_subtitle_${index}`}
                                        defaultValue={item.subtitle}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Slide Image
                                    </label>
                                    <ImagePicker
                                        name={`slides_image_${index}`}
                                        defaultValue={item.image}
                                        photos={photos}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Button Link
                                        </label>
                                        <input
                                            name={`slides_link_${index}`}
                                            defaultValue={item.link}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Button Text
                                        </label>
                                        <input
                                            name={`slides_linkText_${index}`}
                                            defaultValue={item.linkText}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </EditorShell>
        </form>
    );
}
