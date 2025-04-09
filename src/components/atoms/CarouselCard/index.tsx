import React from 'react';
import { ImageRequireSource, TouchableOpacity } from 'react-native';
import { CardImage } from './styles';
import { Source } from 'react-native-fast-image';
import { useTVFocus } from '../../../hooks/useTVFocus';
import { useTheme } from '@emotion/react';
import { TVFocusBorder } from '../TVFocusBorder';

interface CarouselCardProps {
    image_src: number | Source | ImageRequireSource;
    onPress?: () => void;
    hasTVPreferredFocus?: boolean;
    focusBorderColor?: string;
    aspectRatio: number;
    width: number ;
    height?: number;
  }
  
  const CarouselCard: React.FC<CarouselCardProps> = ({
    aspectRatio,
    width,
    height,
    image_src,
    onPress,
    hasTVPreferredFocus = false,
    focusBorderColor = '#FFFFFF',
  }) => {
    const { isFocused, focusProps } = useTVFocus(hasTVPreferredFocus);
    const theme = useTheme();
  
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={{ width, aspectRatio, height }}
      >
        <TVFocusBorder
          {...focusProps}
          borderColor={isFocused ? focusBorderColor : 'transparent'}
          borderWidth={isFocused ? 3 : 0}
          cornerRadius={theme.sizes.md}
          style={{ width: '100%', height: '100%' }}
        >
            <CardImage
                aspectRatio={aspectRatio}
                width={width}
                height={height}
                source={image_src}
            />

        </TVFocusBorder>
        </TouchableOpacity>
    );
  };
  
  export default CarouselCard;
