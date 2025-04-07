import React from 'react';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { CarouselContainer } from '../interfaces';
import { CarouselRow } from '../components';
import styled from '@emotion/native';

const ItemSeparator = styled.View(({theme}) => ({
    width: '100%',
    height: theme.sizes.md,
}));

export const useCarousel = () => {
    const renderCarouselRow: ListRenderItem<CarouselContainer> = useCallback(({item, index}) => {
        return(<CarouselRow container={item} containerIndex={index} />);
    },[]);

    const keyExtractorCarouselRow = useCallback((item: CarouselContainer) => item._id,[]);

    return{
        renderCarouselRow,
        keyExtractorCarouselRow,
        ItemSeparator,
    };
};
