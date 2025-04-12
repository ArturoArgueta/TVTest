// VideoPlayerViewManager.m
#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

@interface RCT_EXTERN_MODULE(VideoPlayerViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(videoURL, NSString)
RCT_EXPORT_VIEW_PROPERTY(borderRadius, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString)

// Register the commands with RCT_EXTERN_METHOD only
RCT_EXTERN_METHOD(play:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(pause:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(seekTo:(nonnull NSNumber *)node time:(nonnull NSNumber *)time)

@end
