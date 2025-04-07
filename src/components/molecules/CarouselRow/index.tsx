import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { CarouselContainer } from '../../../interfaces';
import { useCarouselRow } from '../../../hooks';

export interface CarouselRowProps {
    container: CarouselContainer;
    containerIndex: number;
}

const CarouselRow: React.FC<CarouselRowProps> = ({
    container,
    containerIndex,
}) => {
    const { renderResource, keyResourceExtractor, ItemSeparator } = useCarouselRow(container, containerIndex);
    return (
        <FlashList
            renderItem={renderResource}
            keyExtractor={keyResourceExtractor}
            data={container.resources}
            horizontal
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default React.memo(CarouselRow);
