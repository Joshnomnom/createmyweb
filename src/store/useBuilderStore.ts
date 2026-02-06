import { create } from 'zustand';
import { PageData, ComponentProps, ComponentType } from '../types/builder';
import { generateId } from '../lib/utils/generateId';

interface BuilderStore {
    pageData: PageData;
    selectedComponentId: string | null;
    setPageData: (pageData: PageData) => void;
    setSelectedComponentId: (id: string | null) => void;
    addComponent: (type: ComponentType, parentId?: string) => void;
    updateComponentProps: (id: string, props: Record<string, any>) => void;
    removeComponent: (id: string) => void;
}

const initialPageData: PageData = {
    id: 'new-page',
    title: 'Untitled Page',
    components: {},
    rootComponentIds: [],
};

export const useBuilderStore = create<BuilderStore>((set) => ({
    pageData: initialPageData,
    selectedComponentId: null,
    setPageData: (pageData) => set({ pageData }),
    setSelectedComponentId: (id) => set({ selectedComponentId: id }),
    addComponent: (type, parentId) => set((state) => {
        const id = generateId();
        const newComponent: ComponentProps = {
            id,
            type,
            props: {},
            children: [],
        };

        const newComponents = { ...state.pageData.components, [id]: newComponent };
        let newRootIds = [...state.pageData.rootComponentIds];

        if (parentId && state.pageData.components[parentId]) {
            const parent = state.pageData.components[parentId];
            newComponents[parentId] = {
                ...parent,
                children: [...(parent.children || []), id],
            };
        } else {
            newRootIds.push(id);
        }

        return {
            pageData: {
                ...state.pageData,
                components: newComponents,
                rootComponentIds: newRootIds,
            },
            selectedComponentId: id,
        };
    }),
    updateComponentProps: (id, props) => set((state) => ({
        pageData: {
            ...state.pageData,
            components: {
                ...state.pageData.components,
                [id]: {
                    ...state.pageData.components[id],
                    props: { ...state.pageData.components[id].props, ...props },
                },
            },
        },
    })),
    removeComponent: (id) => set((state) => {
        const { [id]: removed, ...remainingComponents } = state.pageData.components;
        const newRootIds = state.pageData.rootComponentIds.filter((compId) => compId !== id);

        // Also need to remove from parent's children if applicable
        Object.keys(remainingComponents).forEach(key => {
            if (remainingComponents[key].children?.includes(id)) {
                remainingComponents[key].children = remainingComponents[key].children?.filter(cid => cid !== id);
            }
        });

        return {
            pageData: {
                ...state.pageData,
                components: remainingComponents,
                rootComponentIds: newRootIds,
            },
            selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
        };
    }),
}));
