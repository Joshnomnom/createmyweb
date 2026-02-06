import React from 'react';

interface HeadingBlockProps {
    level?: string;
    text?: string;
    align?: 'left' | 'center' | 'right';
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({
    level = 'h2',
    text = 'Heading',
    align = 'left'
}) => {
    const Tag = level as React.ElementType;

    // Safety check to ensure we only render valid heading tags
    if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(level)) {
        return <h2 style={{ textAlign: align }}>{text}</h2>;
    }

    const sizes = {
        h1: 'text-4xl font-extrabold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-bold',
        h4: 'text-xl font-bold',
        h5: 'text-lg font-bold',
        h6: 'text-base font-bold',
    };

    return (
        <Tag className={`${sizes[level as keyof typeof sizes]} text-gray-900 mb-4`} style={{ textAlign: align }}>
            {text}
        </Tag>
    );
};

export default HeadingBlock;
