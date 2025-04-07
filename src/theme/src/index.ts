import { Colors, Sizes } from '../types';
import { ThemeColors } from './colors';
import { useDeviceDimensions } from './hooks/useDeviceDimensions';
import { sizes } from './sizes';

export interface SimpleTVTheme {
    colors: Colors
    sizes: Sizes
    scale: useDeviceDimensions['scale']
}

export const simpleTVTheme = (scale: useDeviceDimensions['scale']) : SimpleTVTheme  => {
    return{
        colors: ThemeColors,
        sizes: sizes(scale),
        scale,
    };
};

export * from './colors';
export * from './sizes';
