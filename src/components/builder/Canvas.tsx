import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import RenderComponent from './RenderComponent';
import ComponentWrapper from './ComponentWrapper';

const Canvas: React.FC = () => {
    const { pageData, selectedComponentId, setSelectedComponentId } = useBuilderStore();

    return (
        <div
            className="flex-1 bg-gray-50 overflow-auto p-8 min-h-screen"
            onClick={() => setSelectedComponentId(null)}
        >
            <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] border border-gray-200">
                {pageData.rootComponentIds.map((id) => (
                    <ComponentWrapper key={id} id={id}>
                        <RenderComponent id={id} />
                    </ComponentWrapper>
                ))}

                {pageData.rootComponentIds.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 border-2 border-dashed border-gray-200 m-4 rounded">
                        <p>Drag components here to start building</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Canvas;
