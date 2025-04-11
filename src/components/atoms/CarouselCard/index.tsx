import React from 'react';
import { ImageRequireSource, TouchableOpacity } from 'react-native';
import { CardImage, FocusableWrapper } from './styles';
import { Source } from 'react-native-fast-image';
import { useTVFocus } from '../../../hooks/useTVFocus';
import { useTheme } from '@emotion/react';
import TVFocusBorder from '../TVFocusBorder';

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
    focusBorderColor = '#F40',
  }) => {
    const { focusProps } = useTVFocus(hasTVPreferredFocus);
    const theme = useTheme();
  
    return (
    <FocusableWrapper
        {...focusProps}
        onPress={onPress}
        focusStyle={{
          borderColor: focusBorderColor,
          borderWidth: theme.scale(2)
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
