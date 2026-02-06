import { ComponentType } from "../../types/builder";
import TextBlock from "../../components/blocks/TextBlock";
import ButtonBlock from "../../components/blocks/ButtonBlock";
import ImageBlock from "../../components/blocks/ImageBlock";
import CardBlock from "../../components/blocks/CardBlock";
import SectionBlock from "../../components/blocks/SectionBlock";

import HeadingBlock from "../../components/blocks/HeadingBlock";
import ContainerBlock from "../../components/blocks/ContainerBlock";
import ColumnsBlock from "../../components/blocks/ColumnsBlock";
import VideoBlock from "../../components/blocks/VideoBlock";
import DividerBlock from "../../components/blocks/DividerBlock";

export const componentRegistry: Record<ComponentType, any> = {
    text: TextBlock,
    button: ButtonBlock,
    image: ImageBlock,
    card: CardBlock,
    section: SectionBlock,
    heading: HeadingBlock,
    container: ContainerBlock,
    columns: ColumnsBlock,
    video: VideoBlock,
    divider: DividerBlock,
};
