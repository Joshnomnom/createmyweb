'use client';

import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ComponentType } from '../../types/builder';
import { Type, Square, Image as ImageIcon, CreditCard, Layout } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface SidebarItemProps {
    type: ComponentType;
    label: string;
    icon: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ type, label, icon: Icon }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `sidebar-${type}`,
        data: {
            type,
            isSidebarItem: true,
        },
    });

    const style = isDragging ? {
        opacity: 0.5,
    } : undefined;

    return (
        <button
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors bg-white shadow-sm cursor-grab active:cursor-grabbing"
        >
            <Icon className="w-5 h-5 mb-2 text-gray-600" />
            <span className="text-[10px] font-medium text-gray-700">{label}</span>
        </button>
    );
};

const Sidebar: React.FC = () => {
    // Categories definition remains the same
    const categories = {
        Layout: [
            { type: 'section', label: 'Section', icon: Layout },
            { type: 'container', label: 'Container', icon: Square },
            { type: 'columns', label: 'Columns', icon: Layout },
            { type: 'divider', label: 'Divider', icon: Square },
        ],
        Basic: [
            { type: 'heading', label: 'Heading', icon: Type },
            { type: 'text', label: 'Text', icon: Type },
            { type: 'button', label: 'Button', icon: Square },
        ],
        Media: [
            { type: 'image', label: 'Image', icon: ImageIcon },
            { type: 'video', label: 'Video', icon: ImageIcon },
            { type: 'card', label: 'Card', icon: CreditCard },
        ]
    } as const;

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Components</h2>
            </div>
            <div className="p-4 space-y-6">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{category}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {items.map((comp) => (
                                // Use the new SidebarItem component
                                <SidebarItem
                                    key={comp.type}
                                    type={comp.type as ComponentType}
                                    label={comp.label}
                                    icon={comp.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
