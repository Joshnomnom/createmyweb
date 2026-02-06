export type ComponentType = 'text' | 'button' | 'image' | 'card' | 'section' | 'heading' | 'container' | 'columns' | 'video' | 'divider';

export interface ComponentProps {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    children?: string[]; // IDs of child components
}

export interface PageData {
    id: string;
    title: string;
    components: Record<string, ComponentProps>;
    rootComponentIds: string[];
}

export interface BuilderState {
    pageData: PageData;
    selectedComponentId: string | null;
    history: PageData[];
    historyIndex: number;
}
