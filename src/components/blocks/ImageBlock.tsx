import React from 'react';

interface ImageBlockProps {
    src?: string;
    alt?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({
    src = 'https://via.placeholder.com/150',
    alt = 'Placeholder'
}) => {
    return (
        <img src={src} alt={alt} className="max-w-full h-auto rounded" />
    );
};

export default ImageBlock;
