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
};
