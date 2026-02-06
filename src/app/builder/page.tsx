'use client';

import React from 'react';
import Sidebar from '@/components/builder/Sidebar';
import Canvas from '@/components/builder/Canvas';
import Inspector from '@/components/builder/Inspector';
import { Button } from '@/components/ui/Button';
import { Save, Eye, Layout as LayoutIcon, Share2 } from 'lucide-react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { motion } from 'framer-motion';

import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
    closestCenter
} from '@dnd-kit/core';
import { ComponentType } from '@/types/builder';
import { createPortal } from 'react-dom';

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

export default function BuilderPage() {
    const { pageData, addComponent, moveComponent } = useBuilderStore();
    const [activeDraggable, setActiveDraggable] = React.useState<{ type: 'sidebar' | 'canvas', id: string, data?: any } | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeData = active.data.current;

        if (activeData?.isSidebarItem) {
            setActiveDraggable({
                type: 'sidebar',
                id: active.id as string,
                data: activeData
            });
        } else {
            setActiveDraggable({
                type: 'canvas',
                id: active.id as string
            });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDraggable(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Handle Sidebar Item Drop
        if (active.data.current?.isSidebarItem) {
            const type = active.data.current.type as ComponentType;

            // If dropped directly on the canvas container (empty space)
            if (overId === 'canvas-root') {
                addComponent(type);
                return;
            }

            // If dropped over a sortable item in the canvas
            if (pageData.rootComponentIds.includes(overId)) {
                // Calculate index to insert at
                const activeIndex = -1; // New item
                const overIndex = pageData.rootComponentIds.indexOf(overId);

                // Determine layout: if we drop "after" or "before". 
                // For simplicity, let's insert "before" the target or use the edge detection from dnd-kit later.
                // But wait, if I use Sortable and I didn't perform the move during drag, I just drop "at" the position.
                // Let's assume dropping "at" the position of the overId means replacing or inserting before. 
                // Standard sortable behavior is usually "insert at this index".

                addComponent(type, undefined, overIndex);
            }
        }
        // Handle Canvas Item Reorder
        else {
            if (activeId !== overId) {
                const oldIndex = pageData.rootComponentIds.indexOf(activeId);
                const newIndex = pageData.rootComponentIds.indexOf(overId);

                if (oldIndex !== -1 && newIndex !== -1) {
                    moveComponent(activeId, newIndex);
                }
            }
        }
    };

    const handleSave = () => {
        console.log('Saving page data:', pageData);
        alert('Page state logged to console (Firebase integration pending)');
    };

    return (
        <DndContext
            id="builder-dnd-context"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans">
                {/* Header */}
                <motion.header
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <LayoutIcon className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight text-gray-900">
                            CreateMyWeb <span className="text-gray-400 font-normal">| {pageData.title}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(`/preview/${pageData.id}`, '_blank')}>
                            <Eye className="w-4 h-4" />
                            Preview
                        </Button>
                        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </Button>
                    </div>
                </motion.header>

                {/* Main Builder Area */}
                <div className="flex-1 flex overflow-hidden">
                    <Sidebar />
                    <Canvas />
                    <Inspector />
                </div>

                {/* Footer / Status Bar */}
                <footer className="h-8 bg-white border-t border-gray-200 px-4 flex items-center justify-between text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span>Status: <span className="text-green-500 font-bold">Ready</span></span>
                        <span>Components: {Object.keys(pageData.components).length}</span>
                    </div>
                    <div>
                        Last saved: Just now
                    </div>
                </footer>

                {/* Drag Overlay */}
                {mounted && createPortal(
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeDraggable?.type === 'sidebar' ? (
                            <div className="p-3 bg-white border border-blue-500 shadow-xl rounded w-32 flex flex-col items-center opacity-90 cursor-grabbing">
                                <span className="font-bold text-xs">{activeDraggable.data?.label || 'Component'}</span>
                            </div>
                        ) : null}
                        {activeDraggable?.type === 'canvas' ? (
                            <div className="bg-blue-50 border-2 border-blue-500 opacity-80 p-2 rounded w-64 h-16 flex items-center justify-center">
                                <span className="text-blue-700 font-medium">Moving...</span>
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </div>
        </DndContext>
    );
}
