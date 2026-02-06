import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ComponentType } from '../../types/builder';
import { Type, Square, Image as ImageIcon, CreditCard, Layout } from 'lucide-react';

const Sidebar: React.FC = () => {
    const { addComponent } = useBuilderStore();

    const components: { type: ComponentType; label: string; icon: any }[] = [
        { type: 'section', label: 'Section', icon: Layout },
        { type: 'text', label: 'Text', icon: Type },
        { type: 'button', label: 'Button', icon: Square },
        { type: 'image', label: 'Image', icon: ImageIcon },
        { type: 'card', label: 'Card', icon: CreditCard },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Components</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                {components.map((comp) => (
                    <button
                        key={comp.type}
                        onClick={() => addComponent(comp.type)}
                        className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    >
                        <comp.icon className="w-6 h-6 mb-2 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">{comp.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
