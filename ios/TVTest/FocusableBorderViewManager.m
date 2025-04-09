//
//  FocusableBorderViewManager.m
//  TVTest
//
//  Created by Quasar1 on 4/8/25.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(FocusableBorderViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(borderColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(borderWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(focusAnimationDuration, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onFocus, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBlur, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(hasTVPreferredFocus, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isTVSelectable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tvParallaxProperties, NSDictionary)

@end
