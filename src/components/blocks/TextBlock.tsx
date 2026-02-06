import React from 'react';

interface TextBlockProps {
    content?: string;
    fontSize?: string;
    color?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
    content = 'New Text Block',
    fontSize = '16px',
    color = '#000000'
}) => {
    return (
        <div style={{ fontSize, color }}>
            {content}
        </div>
    );
};

export default TextBlock;
