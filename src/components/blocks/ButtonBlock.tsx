import React from 'react';
import { Button } from '../ui/Button';

interface ButtonBlockProps {
    label?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({
    label = 'Click Me',
    variant = 'primary'
}) => {
    return (
        <Button variant={variant}>
            {label}
        </Button>
    );
};

export default ButtonBlock;
