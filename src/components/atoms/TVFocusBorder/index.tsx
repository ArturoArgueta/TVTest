import React, { ForwardedRef } from 'react';
import { requireNativeComponent, ViewStyle, StyleProp, UIManager } from 'react-native';

type TVFocusBorderProps = {
  style?: StyleProp<ViewStyle>;
  children?: object;
  ref?: ForwardedRef<TVFocusBorderProps>;
  scale?: string;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onPress?: (e: Event) => void;
  focusable?: boolean;
  enableFocusStyle?: boolean;
  focusStyle?: { borderWidth: number; borderColor: string };
};

const NativeComponet = 'FocusableBorderView'
const NativeTVFocusBorder = UIManager.getViewManagerConfig(NativeComponet) != null
? requireNativeComponent<TVFocusBorderProps>(NativeComponet)
: () => {
    throw new Error('FocusableBorderView was not linked!');
  };

const TVFocusBorder =  React.forwardRef(
  (props: TVFocusBorderProps , ref: ForwardedRef<TVFocusBorderProps>) => {
  return (
    <NativeTVFocusBorder
    ref={ref}
    style={props.style}
    focusable={props.focusable ?? true}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onPress={props.onPress}
    scale={props.scale ?? '1'}
    enableFocusStyle={props.enableFocusStyle ?? true}
    focusStyle={props.focusStyle}
    >
      {props.children}
    </NativeTVFocusBorder>
  );
})

export default TVFocusBorder