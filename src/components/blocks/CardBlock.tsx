import React from 'react';

interface CardBlockProps {
    padding?: string;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

const CardBlock: React.FC<CardBlockProps> = ({
    padding = '16px',
    shadow = 'sm',
    children
}) => {
    const shadowClasses = {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
    };

    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 ${shadowClasses[shadow]}`}
            style={{ padding }}
        >
            {children || <div className="text-gray-400 text-sm italic text-center">Card Content</div>}
        </div>
    );
};

export default CardBlock;
