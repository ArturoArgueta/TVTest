import React from 'react';
import { useCallback } from 'react';
import { CarouselContainer, CarouselResource } from '../interfaces';
import { ListRenderItem } from 'react-native';
import { CarouselCard } from '../components';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const ItemSeparator = styled.View(({theme}) => ({
    height: '100%',
    width: theme.sizes.md,
}));

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useCarouselRow = (container: CarouselContainer, containerIndex: number) => {
    const navigation = useNavigation<NavigationProp>();

    const renderResource: ListRenderItem<CarouselResource> = useCallback(({item, index}) => {
        const height = Math.round(container.resource_width / container.aspectRatio);
        const imageUrl = `https://picsum.photos/${container.resource_width}/${height}`;
        
        const handlePress = () => {
            navigation.navigate('Player', { url: imageUrl });
        };

        // Only true for the first item of the first container
        const shouldHaveFocus = containerIndex === 0 && index === 0;

        return(
            <CarouselCard
                image_src={{ uri: imageUrl }}
                aspectRatio={container.aspectRatio}
                width={container.resource_width}
                onPress={handlePress}
                hasTVPreferredFocus={shouldHaveFocus}
            />
        );
    },[container, containerIndex, navigation]);

    const keyResourceExtractor = useCallback((item: CarouselResource) => item._id,[]);

    return {
        renderResource,
        keyResourceExtractor,
        ItemSeparator,
    };
};
