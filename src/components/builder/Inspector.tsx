import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { componentSchemas } from '../../lib/builder/schema';
import { Input } from '../ui/Input';
import { Trash2 } from 'lucide-react';

const Inspector: React.FC = () => {
    const { selectedComponentId, pageData, updateComponentProps, removeComponent } = useBuilderStore();

    const selectedComponent = selectedComponentId ? pageData.components[selectedComponentId] : null;
    const schema = selectedComponent ? componentSchemas[selectedComponent.type] : null;

    if (!selectedComponent || !schema) {
        return (
            <div className="w-80 bg-white border-l border-gray-200 p-8 text-center text-gray-400">
                Select a component to edit its properties
            </div>
        );
    }

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-bold text-lg uppercase text-xs tracking-wider text-gray-500">Inspector</h2>
                <button
                    onClick={() => removeComponent(selectedComponent.id)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
                <div className="mb-6">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Type</label>
                    <div className="text-sm font-medium">{selectedComponent.type}</div>
                </div>

                {schema.map((prop) => (
                    <div key={prop.name} className="mb-4">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                            {prop.name}
                        </label>
                        {prop.type === 'select' ? (
                            <select
                                className="w-full border border-gray-300 rounded p-2 text-sm"
                                value={selectedComponent.props[prop.name] || ''}
                                onChange={(e) => updateComponentProps(selectedComponent.id, { [prop.name]: e.target.value })}
                            >
                                {prop.options?.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : prop.type === 'color' ? (
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                    value={selectedComponent.props[prop.name] || '#000000'}
                                    onChange={(e) => updateComponentProps(selectedComponent.id, { [prop.name]: e.target.value })}
                                />
                                <Input
                                    value={selectedComponent.props[prop.name] || '#000000'}
                                    onChange={(e) => updateComponentProps(selectedComponent.id, { [prop.name]: e.target.value })}
                                />
                            </div>
                        ) : (
                            <Input
                                value={selectedComponent.props[prop.name] || ''}
                                onChange={(e) => updateComponentProps(selectedComponent.id, { [prop.name]: e.target.value })}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inspector;
