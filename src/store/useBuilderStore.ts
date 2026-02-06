import { create } from 'zustand';
import { PageData, ComponentProps, ComponentType } from '../types/builder';
import { generateId } from '../lib/utils/generateId';

interface BuilderStore {
    pageData: PageData;
    selectedComponentId: string | null;
    setPageData: (pageData: PageData) => void;
    setSelectedComponentId: (id: string | null) => void;
    addComponent: (type: ComponentType, parentId?: string, index?: number) => void;
    updateComponentProps: (id: string, props: Record<string, any>) => void;
    removeComponent: (id: string) => void;
    moveComponent: (componentId: string, newIndex: number, newParentId?: string) => void;
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
    addComponent: (type, parentId, index?: number) => set((state) => {
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
            const newChildren = [...(parent.children || [])];

            if (typeof index === 'number' && index >= 0) {
                newChildren.splice(index, 0, id);
            } else {
                newChildren.push(id);
            }

            newComponents[parentId] = {
                ...parent,
                children: newChildren,
            };
        } else {
            if (typeof index === 'number' && index >= 0) {
                newRootIds.splice(index, 0, id);
            } else {
                newRootIds.push(id);
            }
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
    moveComponent: (componentId: string, newIndex: number, newParentId?: string) => set((state) => {
        // Simple implementation for reordering specifically within the same list for now
        // or moving to root. 
        // Full tree-to-tree move is more complex but this covers basic reorder.

        // 1. Find current parent
        let currentParentId: string | null = null;
        let currentChildren = state.pageData.rootComponentIds;

        // Check if root
        if (!state.pageData.rootComponentIds.includes(componentId)) {
            // Find parent
            const parentEntry = Object.entries(state.pageData.components).find(([_, comp]) =>
                comp.children?.includes(componentId)
            );
            if (parentEntry) {
                currentParentId = parentEntry[0];
                currentChildren = parentEntry[1].children || [];
            }
        }

        // Remove from current position
        const updatedChildren = currentChildren.filter(id => id !== componentId);

        // Insert at new position
        // Note: For now assuming we are moving within the same list or to root for simplicity of first pass
        // Real implementation depends on where we dropped.

        // If we are strictly reordering the *current* list (most common dnd-kit sortable case):
        const finalChildren = [...updatedChildren];
        finalChildren.splice(newIndex, 0, componentId);

        if (currentParentId) {
            return {
                pageData: {
                    ...state.pageData,
                    components: {
                        ...state.pageData.components,
                        [currentParentId]: {
                            ...state.pageData.components[currentParentId],
                            children: finalChildren
                        }
                    }
                }
            };
        } else {
            return {
                pageData: {
                    ...state.pageData,
                    rootComponentIds: finalChildren
                }
            };
        }
    }),
}));
