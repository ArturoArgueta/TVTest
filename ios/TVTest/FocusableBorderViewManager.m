//
//  FocusableBorderViewManager.m
//  TVTest
//
//  Created by Quasar1 on 4/8/25.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(FocusableBorderViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(scale, NSString)
RCT_EXPORT_VIEW_PROPERTY(focusable, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(enableFocusStyle, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(focusStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onFocus, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBlur, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
