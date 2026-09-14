'use client';

import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Save, Globe } from 'lucide-react';

export function SaveChangesButton({ formId }: { formId: string }) {
    const { pending } = useFormStatus();
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!pending && saved) {
            const timer = setTimeout(() => setSaved(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [pending, saved]);

    return (
        <button
            form={formId}
            type="submit"
            onClick={() => setSaved(true)}
            disabled={pending}
            className={`${pending ? 'scale-95 bg-zinc-500' : saved && !pending ? 'bg-green-500 text-white' : 'bg-white text-black'} flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95`}
        >
            <Save size={24} />
            {pending ? 'Saving...' : saved && !pending ? 'Saved!' : 'Save Changes'}
        </button>
    );
}

export function PublishLiveButton() {
    const { pending } = useFormStatus();
    const [published, setPublished] = useState(false);

    useEffect(() => {
        if (!pending && published) {
            const timer = setTimeout(() => setPublished(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [pending, published]);

    return (
        <button
            type="submit"
            onClick={() => setPublished(true)}
            disabled={pending}
            className={`${pending ? 'bg-zinc-500' : published && !pending ? 'bg-green-500' : 'bg-orange-600 hover:bg-orange-500'} flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors`}
        >
            <Globe size={16} />
            {pending ? 'Publishing...' : published && !pending ? 'Published!' : 'Publish Live'}
        </button>
    );
}
