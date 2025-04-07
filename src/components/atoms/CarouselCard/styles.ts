import styled from '@emotion/native';
import { DimensionValue, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

export interface CardImageProps {
    aspectRatio: number
    width: DimensionValue
    height?: DimensionValue
}

interface CardWrapperProps {
    tvFocusBorderColor?: string;
}

export const CardWrapper = styled(TouchableOpacity)<CardWrapperProps>(({theme,tvFocusBorderColor}) => ({
    borderRadius: theme.sizes.md,
    overflow: 'hidden',
    ...(tvFocusBorderColor && {
        $focus: {
            borderWidth: 2,
            borderColor: tvFocusBorderColor,
            borderRadius: theme.sizes.md,
        }
    })
}));

export const CardImage = styled(FastImage)<CardImageProps>(({
    theme, 
    width,
    height,
    aspectRatio
}) => ({
    width: width,
    aspectRatio: aspectRatio,
    height,
    borderRadius: theme.sizes.md,
}));
