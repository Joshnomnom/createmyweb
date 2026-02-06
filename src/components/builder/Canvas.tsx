import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import RenderComponent from './RenderComponent';
import ComponentWrapper from './ComponentWrapper';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn } from '../ui/Button';

const Canvas: React.FC = () => {
    const { pageData, selectedComponentId, setSelectedComponentId } = useBuilderStore();

    // Droppable for the main canvas area (root)
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-root',
    });

    return (
        <div
            className="flex-1 bg-gray-50 overflow-auto p-8 min-h-screen"
            onClick={() => setSelectedComponentId(null)}
        >
            <div
                ref={setNodeRef}
                className={cn(
                    "max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] border transition-colors",
                    isOver ? "border-blue-400 bg-blue-50" : "border-gray-200"
                )}
            >
                <SortableContext
                    items={pageData.rootComponentIds}
                    strategy={verticalListSortingStrategy}
                >
                    {pageData.rootComponentIds.map((id) => (
                        <ComponentWrapper key={id} id={id}>
                            <RenderComponent id={id} />
                        </ComponentWrapper>
                    ))}
                </SortableContext>

                {pageData.rootComponentIds.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 border-2 border-dashed border-gray-200 m-4 rounded pointer-events-none">
                        <p>Drag components here to start building</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Canvas;
