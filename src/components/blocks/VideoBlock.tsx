import React from 'react';

interface VideoBlockProps {
    url?: string;
    width?: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({
    url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    width = '100%'
}) => {
    // Basic embed support
    let embedUrl = url;

    // Simple YouTube converter (very basic)
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return (
        <div className="w-full aspect-video bg-black rounded overflow-hidden">
            <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoBlock;
