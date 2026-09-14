'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface DynamicListProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    onAdd: () => T;
    name: string; // The prefix for form field names
}

/**
 * A client-side helper for managing lists of items (FAQs, Slides, etc.)
 * Provides Add/Remove functionality and handles the "count" hidden field.
 */
export default function DynamicList<T>({
    title,
    items: initialItems,
    renderItem,
    onAdd,
    name,
}: DynamicListProps<T>) {
    const [items, setItems] = useState<T[]>(initialItems);

    // Sync state when props change (e.g. after a Save/Publish action)
    React.useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const addItem = () => {
        setItems([...items, onAdd()]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <section className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-8 backdrop-blur-sm">
            <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary/20"
                >
                    <Plus size={18} /> Add New
                </button>
            </div>

            {/* Hidden field for form processing */}
            <input type="hidden" name={`${name}_count`} value={items.length} />

            <div className="space-y-6">
                {items.length === 0 ? (
                    <div className="rounded-xl border-2 border-dashed border-zinc-800 py-12 text-center">
                        <p className="text-sm text-zinc-400">
                            No items added yet. Click "Add New" to get started.
                        </p>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div key={index} className="group relative">
                            {/* Actions overlay on hover */}
                            <div className="absolute -left-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="cursor-grab p-1 text-zinc-400 hover:text-zinc-400 active:cursor-grabbing">
                                    <GripVertical size={20} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-zinc-700">
                                <div className="mb-4 flex items-start justify-between">
                                    <span className="rounded bg-zinc-900 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                        Item {index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="p-1 text-zinc-400 transition-colors hover:text-red-400"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                {renderItem(item, index)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
