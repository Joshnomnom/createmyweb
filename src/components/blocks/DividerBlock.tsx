import React from 'react';

interface DividerBlockProps {
    color?: string;
    thickness?: string;
    margin?: string;
}

const DividerBlock: React.FC<DividerBlockProps> = ({
    color = '#e5e7eb',
    thickness = '1px',
    margin = '2rem'
}) => {
    return (
        <hr
            style={{
                borderColor: color,
                borderTopWidth: thickness,
                marginTop: margin,
                marginBottom: margin
            }}
            className="w-full"
        />
    );
};

export default DividerBlock;
