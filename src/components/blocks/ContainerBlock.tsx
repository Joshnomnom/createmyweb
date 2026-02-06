import React from 'react';
import { cn } from '@/components/ui/Button'; // Reusing cn utility

interface ContainerBlockProps {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    children?: React.ReactNode;
    className?: string; // Allow passing standard className if needed by wrapper
    padding?: string;
}

const ContainerBlock: React.FC<ContainerBlockProps> = ({
    maxWidth = 'lg',
    children,
    padding = 'p-4'
}) => {
    const maxWidths = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
    };

    return (
        <div className={cn("mx-auto w-full", maxWidths[maxWidth], padding)}>
            {children || <div className="border-2 border-dashed border-gray-300 p-4 text-center text-gray-400">Empty Container</div>}
        </div>
    );
};

export default ContainerBlock;
