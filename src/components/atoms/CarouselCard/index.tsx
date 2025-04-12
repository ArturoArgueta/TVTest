import React from 'react';
import { ImageRequireSource } from 'react-native';
import { CardImage, FocusableWrapper } from './styles';
import { Source } from 'react-native-fast-image';
import { useTVFocus } from '../../../hooks/useTVFocus';
import { useTheme } from '@emotion/react';

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
    focusBorderColor = '#42bff5',
  }) => {
    const { focusProps } = useTVFocus(hasTVPreferredFocus);
    const theme = useTheme();
  
    return (
    <FocusableWrapper
        {...focusProps}
        onPress={onPress}
        focusStyle={{
          borderColor: focusBorderColor,
          borderWidth: theme.scale(4)
        }}
      >
        <CardImage
            aspectRatio={aspectRatio}
            width={width}
            height={height}
            source={image_src}
        />
      </FocusableWrapper>
    );
  };
  
  export default CarouselCard;
