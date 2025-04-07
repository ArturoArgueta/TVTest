import React from 'react';
import { ImageRequireSource } from 'react-native';
import { CardImage, CardImageProps, CardWrapper } from './styles';
import { Source } from 'react-native-fast-image';
import { useTVFocus } from '../../../hooks/useTVFocus';
import { useTheme } from '@emotion/react';

export interface CarouselCardProps extends CardImageProps {
    image_src: number | Source | ImageRequireSource;
    onPress?: () => void;
    hasTVPreferredFocus?: boolean;
    tvFocusBorderColor?: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
    aspectRatio,
    width,
    height,
    image_src,
    onPress,
    hasTVPreferredFocus = false,
    tvFocusBorderColor
}) => {
    const { focusProps } = useTVFocus();
    const theme = useTheme();

    return (
        <CardWrapper
            {...focusProps}
            onPress={onPress}
            hasTVPreferredFocus={hasTVPreferredFocus}
            tvFocusBorderColor={tvFocusBorderColor || theme.colors.foreground0}
            activeOpacity={0.6}
        >
            <CardImage
                aspectRatio={aspectRatio}
                width={width}
                height={height}
                source={image_src}
            />
        </CardWrapper>
    );
};

export default CarouselCard;
