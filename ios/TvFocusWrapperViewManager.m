#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import "TvFocusWrapperView.h"

@interface RCT_EXTERN_MODULE(TvFocusWrapperViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(scale, NSString)
RCT_EXPORT_VIEW_PROPERTY(focusable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enableFocusStyle, BOOL)
RCT_EXPORT_VIEW_PROPERTY(focusStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(enableGradient, BOOL)
RCT_EXPORT_VIEW_PROPERTY(gradientProps, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onFocus, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBlur, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
