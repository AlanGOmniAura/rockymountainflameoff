'use client';

import { useState } from 'react';

export default function ContentTabs({
    home,
    about,
    classesPage,
    classDetails,
    rentals,
}: {
    home: React.ReactNode;
    about: React.ReactNode;
    classesPage: React.ReactNode;
    classDetails: React.ReactNode;
    rentals: React.ReactNode;
}) {
    const [activeTab, setActiveTab] = useState('home');

    const tabs = [
        { id: 'home', label: 'Homepage' },
        { id: 'about', label: 'About Page' },
        { id: 'classes', label: 'Classes Landing' },
        { id: 'details', label: 'Class Details' },
        { id: 'rentals', label: 'Torch Rentals' },
    ];

    return (
        <div>
            <div className="mb-8 flex inline-flex gap-1 rounded-lg bg-zinc-900 p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={activeTab === 'home' ? 'block' : 'hidden'}>{home}</div>
            <div className={activeTab === 'about' ? 'block' : 'hidden'}>{about}</div>
            <div className={activeTab === 'classes' ? 'block' : 'hidden'}>{classesPage}</div>
            <div className={activeTab === 'details' ? 'block' : 'hidden'}>{classDetails}</div>
            <div className={activeTab === 'rentals' ? 'block' : 'hidden'}>{rentals}</div>
        </div>
    );
}
