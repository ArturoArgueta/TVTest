import React from 'react';
import { FlatList } from 'react-native';
import { useCarousel } from '../../../hooks';
import { Carousel } from '../../../interfaces';

export interface CarouselProps {
    carousel : Carousel
}

const CarouselList : React.FC<CarouselProps> = ({carousel}) => {
    const {renderCarouselRow,keyExtractorCarouselRow,ItemSeparator} = useCarousel();
    return (
        <FlatList
        data={carousel.containers}
        renderItem={renderCarouselRow}
        keyExtractor={keyExtractorCarouselRow}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default CarouselList;
