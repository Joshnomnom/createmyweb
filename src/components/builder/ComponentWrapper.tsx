import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { cn } from '../ui/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface ComponentWrapperProps {
    id: string;
    children: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ id, children }) => {
    const { selectedComponentId, setSelectedComponentId } = useBuilderStore();
    const isSelected = selectedComponentId === id;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedComponentId(id);
            }}
            className={cn(
                'relative group transition-all border-2 border-transparent mb-1', // Added mb-1 for spacing
                isSelected ? 'border-blue-500' : 'hover:border-blue-200'
            )}
        >
            {/* Drag Handle - visible on hover or selected */}
            <div
                {...attributes}
                {...listeners}
                className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing bg-gray-200 hover:bg-gray-300 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    isSelected && "opacity-100 bg-blue-500 text-white hover:bg-blue-600"
                )}
            >
                <GripVertical className="w-3 h-3" />
            </div>

            {isSelected && (
                <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-t font-bold uppercase">
                    {id.slice(0, 4)}
                </div>
            )}
            {children}
        </div>
    );
};

export default ComponentWrapper;
