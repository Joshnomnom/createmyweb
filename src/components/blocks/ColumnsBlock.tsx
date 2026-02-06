import React from 'react';

interface ColumnsBlockProps {
    cols?: string; // Stored as string from select input usually
    gap?: string;
    children?: React.ReactNode;
}

const ColumnsBlock: React.FC<ColumnsBlockProps> = ({
    cols = '2',
    gap = '4',
    children
}) => {
    // We need to distribute children into these columns
    // However, the current recursive renderer just dumping children into the parent.
    // For a true column layout in a builder, typically the "ColumnsBlock" has predefined "Column" children
    // or we use CSS grid on the children.

    // For simplicity V1: Use CSS Grid and just let children flow into it.

    const gridCols = {
        '1': 'grid-cols-1',
        '2': 'grid-cols-1 md:grid-cols-2',
        '3': 'grid-cols-1 md:grid-cols-3',
        '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[cols as keyof typeof gridCols] || 'grid-cols-1'} gap-${gap} w-full`}>
            {children || (
                <>
                    <div className="border border-dashed border-gray-300 p-4 min-h-[50px] bg-gray-50 flex items-center justify-center text-gray-400">Column 1</div>
                    <div className="border border-dashed border-gray-300 p-4 min-h-[50px] bg-gray-50 flex items-center justify-center text-gray-400">Column 2</div>
                </>
            )}
        </div>
    );
};

export default ColumnsBlock;
