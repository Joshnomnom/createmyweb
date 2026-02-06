import { PageData } from './builder';

export interface PageMetadata {
    id: string;
    userId: string;
    title: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
    published: boolean;
    content: PageData;
}
