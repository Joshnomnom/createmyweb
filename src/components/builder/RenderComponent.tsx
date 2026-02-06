import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { componentRegistry } from '../../lib/builder/componentRegistry';
import ComponentWrapper from './ComponentWrapper';

interface RenderComponentProps {
    id: string;
}

const RenderComponent: React.FC<RenderComponentProps> = ({ id }) => {
    const { pageData } = useBuilderStore();
    const component = pageData.components[id];

    if (!component) return null;

    const Component = componentRegistry[component.type];

    if (!Component) {
        return <div className="p-4 text-red-500 border border-red-500">Unknown component type: {component.type}</div>;
    }

    return (
        <Component {...component.props}>
            {component.children?.map((childId) => (
                <ComponentWrapper key={childId} id={childId}>
                    <RenderComponent id={childId} />
                </ComponentWrapper>
            ))}
        </Component>
    );
};

export default RenderComponent;
