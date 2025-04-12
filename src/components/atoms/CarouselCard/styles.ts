import styled from '@emotion/native';
import { DimensionValue } from 'react-native';
import FastImage from 'react-native-fast-image';
import TVFocusBorder from '../TVFocusBorder';

export interface CardImageProps {
    aspectRatio: number
    width: DimensionValue
    height?: DimensionValue
}

export const CardImage = styled(FastImage)<CardImageProps>(({
    width,
    height,
    aspectRatio
}) => ({
    width: width,
    aspectRatio: aspectRatio,
    height,
}));
export const FocusableWrapper = styled(TVFocusBorder)(({theme}) => ({
    borderRadius: theme.sizes.md,
    overflow:'hidden'
}))