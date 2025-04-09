import React from 'react';
import { requireNativeComponent, ViewStyle, NativeSyntheticEvent } from 'react-native';

type TVFocusBorderProps = {
  style?: ViewStyle;
  borderColor?: string;
  borderWidth?: number;
  cornerRadius?: number;
  children?: React.ReactNode;
  hasTVPreferredFocus?: boolean;
  onFocus?: (event: NativeSyntheticEvent<null>) => void;
  onBlur?: (event: NativeSyntheticEvent<null>) => void;
  onPress?: (event: NativeSyntheticEvent<null>) => void;
  focusAnimationDuration?: number;
};

const NativeTVFocusBorder = requireNativeComponent<TVFocusBorderProps>(
  'FocusableBorderView'
);

export const TVFocusBorder: React.FC<TVFocusBorderProps> = ({
  children,
  borderColor = '#FFFFFF',
  borderWidth = 2,
  cornerRadius = 8,
  hasTVPreferredFocus = false,
  focusAnimationDuration = 200,
  onFocus,
  onBlur,
  onPress,
  style,
  ...props
}) => {
  return (
    <NativeTVFocusBorder
      borderColor={borderColor}
      borderWidth={borderWidth}
      cornerRadius={cornerRadius}
      hasTVPreferredFocus={hasTVPreferredFocus}
      focusAnimationDuration={focusAnimationDuration}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPress}
      style={{ overflow: 'hidden' ,...style}}
      {...props}
    >
      {children}
    </NativeTVFocusBorder>
  );
};