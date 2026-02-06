import { ComponentType } from "../../types/builder";

export const defaultProps: Record<ComponentType, Record<string, any>> = {
    text: {
        content: "New Text Block",
        fontSize: "16px",
        color: "#000000",
    },
    button: {
        label: "Click Me",
        variant: "primary",
    },
    image: {
        src: "https://via.placeholder.com/150",
        alt: "Placeholder",
    },
    card: {
        padding: "16px",
        shadow: "sm",
    },
    section: {
        padding: "32px",
        backgroundColor: "transparent",
    },
};
