import React from 'react';
import { ImageRequireSource, Touchable, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity
            {...focusProps}
            onPress={onPress}
            hasTVPreferredFocus={hasTVPreferredFocus}
            activeOpacity={0.6}
            onFocusStyle={{
                borderWidth: 4,
                borderColor: "#FFFF"
            }
            }
        >
            <CardImage
                aspectRatio={aspectRatio}
                width={width}
                height={height}
                source={image_src}
            />
        </TouchableOpacity>
    );
};

export default CarouselCard;
