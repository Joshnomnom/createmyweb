import React from 'react';

interface SectionBlockProps {
    padding?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
}

const SectionBlock: React.FC<SectionBlockProps> = ({
    padding = '32px',
    backgroundColor = 'transparent',
    children
}) => {
    return (
        <section
            style={{ padding, backgroundColor }}
            className="min-h-[100px] w-full"
        >
            {children || <div className="text-gray-400 text-sm italic text-center">Section Content</div>}
        </section>
    );
};

export default SectionBlock;
