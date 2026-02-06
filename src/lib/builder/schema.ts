import { ComponentType } from "../../types/builder";

export interface PropertySchema {
    name: string;
    type: 'text' | 'number' | 'color' | 'select';
    options?: string[];
}

export const componentSchemas: Record<ComponentType, PropertySchema[]> = {
    text: [
        { name: 'content', type: 'text' },
        { name: 'fontSize', type: 'text' },
        { name: 'color', type: 'color' },
    ],
    button: [
        { name: 'label', type: 'text' },
        { name: 'variant', type: 'select', options: ['primary', 'secondary', 'outline'] },
    ],
    image: [
        { name: 'src', type: 'text' },
        { name: 'alt', type: 'text' },
    ],
    card: [
        { name: 'padding', type: 'text' },
        { name: 'shadow', type: 'select', options: ['none', 'sm', 'md', 'lg'] },
    ],
    section: [
        { name: 'padding', type: 'text' },
        { name: 'backgroundColor', type: 'color' },
    ],
    heading: [
        { name: 'text', type: 'text' },
        { name: 'level', type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
        { name: 'align', type: 'select', options: ['left', 'center', 'right'] },
    ],
    container: [
        { name: 'maxWidth', type: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
        { name: 'padding', type: 'text' },
    ],
    columns: [
        { name: 'cols', type: 'select', options: ['1', '2', '3', '4'] },
        { name: 'gap', type: 'select', options: ['0', '2', '4', '8'] },
    ],
    video: [
        { name: 'url', type: 'text' },
    ],
    divider: [
        { name: 'color', type: 'color' },
        { name: 'thickness', type: 'text' },
        { name: 'margin', type: 'text' },
    ],
};
