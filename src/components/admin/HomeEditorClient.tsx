'use client';

import React, { useState } from 'react';
import EditorShell from './EditorShell';
import DynamicList from './DynamicList';
import ImagePicker from './ImagePicker';
import { updateDraft } from '@/app/actions/content';

export default function HomeEditorClient({ data, photos }: { data: any; photos: any[] }) {
    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'Hero Slider' },
        { id: 'tiles', label: 'Feature Tiles' },
        { id: 'sections', label: 'Page Sections' },
        { id: 'faqs', label: 'FAQs' },
        { id: 'gallery', label: 'Galleries & Video' },
        { id: 'intro', label: 'Intro Text' },
    ];

    async function handleSave(formData: FormData) {
        await updateDraft('home', formData);
    }
    const DEFAULT_FAQS = [
        {
            question: 'What is the glass blowing process?',
            answer: 'Glass blowing is a traditional method of shaping molten glass into various objects using a combination of breath, tools, and techniques. The process typically involves preparation, coloring, shaping, blowing, detailing, and annealing (cooling). At Glass Class Denver we simplify the process so anyone can create a beautiful piece.',
        },
        {
            question: 'What is an Opal Add On?',
            answer: 'You may choose to use Gilson opals by enclosing them in glass and incorporating them into your project. Encasing the opal magnifies its appearance and creates a stunning, glittering centerpiece. We have colors like fire black, cotton candy, and blood orange.',
        },
        {
            question: 'What can we make in our class blowing class?',
            answer: 'Projects include: Air plant terrariums, plant watering globes, marbles, pendants, pipes, shot glasses, and candle holders. We are always adding new projects and are open to unique ideas!',
        },
    ];

    return (
        <form action={handleSave} id="home-editor-form">
            <EditorShell
                title="Home Page Content"
                description="Manage the main landing page of the website."
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSave="true"
                formId="home-editor-form"
            >
                {/* 1. HERO SLIDER */}
                <div className={activeTab === 'hero' ? 'block' : 'hidden'}>
                    <DynamicList
                        title="Hero Carousel"
                        name="hero"
                        items={data.hero || []}
                        onAdd={() => ({
                            title: 'New Slide',
                            subtitle: '',
                            image: '',
                            link: '',
                            linkText: 'Book Now',
                        })}
                        renderItem={(item: any, index: number) => (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Title
                                        </label>
                                        <input
                                            name={`hero_title_${index}`}
                                            defaultValue={item.title}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Subtitle
                                        </label>
                                        <input
                                            name={`hero_subtitle_${index}`}
                                            defaultValue={item.subtitle}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Image Path
                                        </label>
                                        <ImagePicker
                                            name={`hero_image_${index}`}
                                            defaultValue={item.image}
                                            photos={photos}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                Button Link
                                            </label>
                                            <input
                                                name={`hero_link_${index}`}
                                                defaultValue={item.link}
                                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                Button Text
                                            </label>
                                            <input
                                                name={`hero_linkText_${index}`}
                                                defaultValue={item.linkText}
                                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* 2. TILES */}
                <div className={activeTab === 'tiles' ? 'block' : 'hidden'}>
                    <DynamicList
                        title="Feature Blocks"
                        name="tiles"
                        items={data.tiles || []}
                        onAdd={() => ({ title: 'New Class', image: '', link: '' })}
                        renderItem={(item: any, index: number) => (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Title
                                    </label>
                                    <input
                                        name={`tiles_title_${index}`}
                                        defaultValue={item.title}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Target Link
                                    </label>
                                    <input
                                        name={`tiles_link_${index}`}
                                        defaultValue={item.link}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Thumbnail Image
                                    </label>
                                    <ImagePicker
                                        name={`tiles_image_${index}`}
                                        defaultValue={item.image}
                                        photos={photos}
                                    />
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* 3. SECTIONS */}
                <div className={activeTab === 'sections' ? 'block' : 'hidden'}>
                    <DynamicList
                        title="Alternating Content Sections"
                        name="sections"
                        items={data.sections || []}
                        onAdd={() => ({
                            title: 'New Section',
                            description: '',
                            imageSrc: '',
                            reversed: false,
                        })}
                        renderItem={(item: any, index: number) => (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Header
                                        </label>
                                        <input
                                            name={`sections_title_${index}`}
                                            defaultValue={item.title}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Body Copy
                                        </label>
                                        <textarea
                                            name={`sections_description_${index}`}
                                            defaultValue={item.description}
                                            rows={5}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                Button Link
                                            </label>
                                            <input
                                                name={`sections_linkHref_${index}`}
                                                defaultValue={item.linkHref}
                                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                Button Text
                                            </label>
                                            <input
                                                name={`sections_linkText_${index}`}
                                                defaultValue={item.linkText}
                                                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Section Image
                                        </label>
                                        <ImagePicker
                                            name={`sections_imageSrc_${index}`}
                                            defaultValue={item.imageSrc}
                                            photos={photos}
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                        <input
                                            type="checkbox"
                                            name={`sections_reversed_${index}`}
                                            defaultChecked={item.reversed}
                                            className="h-5 w-5 rounded border-zinc-800 bg-zinc-950 text-primary focus:ring-primary"
                                        />
                                        <div>
                                            <span className="block text-sm font-bold text-white">
                                                Flip Layout
                                            </span>
                                            <span className="text-[10px] text-zinc-400">
                                                Places the image on the opposite side.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* 4. FAQS */}
                <div className={activeTab === 'faqs' ? 'block' : 'hidden'}>
                    <DynamicList
                        title="Glass Blowing Class FAQs"
                        name="faqs"
                        items={data.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_FAQS}
                        onAdd={() => ({ question: 'New Question', answer: '' })}
                        renderItem={(item: any, index: number) => (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Question
                                    </label>
                                    <input
                                        name={`faqs_question_${index}`}
                                        defaultValue={item.question}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Answer
                                    </label>
                                    <textarea
                                        name={`faqs_answer_${index}`}
                                        defaultValue={item.answer}
                                        rows={4}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white"
                                    />
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* 5. GALLERY & VIDEO */}
                <div className={activeTab === 'gallery' ? 'block' : 'hidden'}>
                    <div className="space-y-8">
                        {/* Video Module */}
                        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                            <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                                Video Spotlight
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Video Embed URL
                                        </label>
                                        <input
                                            name="video_src"
                                            defaultValue={data.video?.src}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                            placeholder="https://www.youtube.com/embed/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Video Title
                                        </label>
                                        <input
                                            name="video_title"
                                            defaultValue={data.video?.title}
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Description
                                    </label>
                                    <textarea
                                        name="video_description"
                                        defaultValue={data.video?.description}
                                        rows={5}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                    />
                                </div>
                            </div>
                        </section>

                        <DynamicList
                            title="Course Gallery Images"
                            name="courseImages"
                            items={data.courseImages || []}
                            onAdd={() => ({ image: '' })}
                            renderItem={(item: any, index: number) => (
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Image Picker
                                    </label>
                                    <ImagePicker
                                        name={`courseImages_image_${index}`}
                                        defaultValue={item.image}
                                        photos={photos}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* 6. INTRO */}
                <div className={activeTab === 'intro' ? 'block' : 'hidden'}>
                    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            Introduction Section
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Heading
                                </label>
                                <input
                                    name="intro_title"
                                    defaultValue={data.intro?.title}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-lg font-bold text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Body Content
                                </label>
                                <textarea
                                    name="intro_text"
                                    defaultValue={data.intro?.text}
                                    rows={8}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        CTA Link
                                    </label>
                                    <input
                                        name="intro_ctaLink"
                                        defaultValue={data.intro?.ctaLink}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        CTA Text
                                    </label>
                                    <input
                                        name="intro_ctaText"
                                        defaultValue={data.intro?.ctaText}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </EditorShell>
        </form>
    );
}
