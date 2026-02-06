import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { cn } from '../ui/Button';

interface ComponentWrapperProps {
    id: string;
    children: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ id, children }) => {
    const { selectedComponentId, setSelectedComponentId } = useBuilderStore();
    const isSelected = selectedComponentId === id;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setSelectedComponentId(id);
            }}
            className={cn(
                'relative group cursor-pointer transition-all border-2 border-transparent',
                isSelected ? 'border-blue-500' : 'hover:border-blue-200'
            )}
        >
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
