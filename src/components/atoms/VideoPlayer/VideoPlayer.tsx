import React, { useRef } from 'react'
import { requireNativeComponent, UIManager, findNodeHandle, StyleProp, ViewStyle, View } from 'react-native'

type ResizeMode = 'contain' | 'cover' | 'stretch'

interface NativeVideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>
  borderRadius?: number
  resizeMode?: string
  children?: React.ReactNode
  onError?: (event: { nativeEvent: { error: string } }) => void
  onLoad?: (event: { nativeEvent: { duration: number } }) => void
  onProgress?: (event: { nativeEvent: { currentTime: number; duration: number } }) => void
  onEnd?: (event: { nativeEvent: any }) => void
  accessible?: boolean
  accessibilityLabel?: string
  hasTVPreferredFocus?: boolean
  tvParallaxProperties?: any
}

const NativeVideoPlayer = requireNativeComponent<NativeVideoPlayerProps>('VideoPlayerView')

// Add this for debugging
console.log('Available UIManager commands:', UIManager.getViewManagerConfig('VideoPlayerView'))

export interface VideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>
  borderRadius?: number
  resizeMode?: ResizeMode
  children?: React.ReactNode
  upNextComponent?: React.ReactNode
  upNextPosition?: 'bottom-right' | 'full-overlay'
  onError?: (error: string) => void
  onLoad?: (data: { duration: number }) => void
  onProgress?: (progress: { currentTime: number; duration: number }) => void
  onEnd?: () => void
  progressUpdateInterval?: number
  // TV-specific props
  accessible?: boolean
  accessibilityLabel?: string
  hasTVPreferredFocus?: boolean
  tvParallaxProperties?: any
  overlayVisible?: boolean
}

export interface VideoPlayerRef {
  play: () => void
  pause: () => void
  seekTo: (time: number) => void
}

const VideoPlayer = React.forwardRef<VideoPlayerRef, VideoPlayerProps>((props, ref) => {
  const videoRef = useRef(null)
  const { 
    videoURL, 
    style, 
    borderRadius = 0, 
    resizeMode = 'cover',
    children,
    upNextComponent,
    upNextPosition = 'bottom-right',
    onError, 
    onLoad, 
    onProgress,
    onEnd,
    // TV-specific props
    accessible = true,
    accessibilityLabel = 'Video Player',
    hasTVPreferredFocus,
    tvParallaxProperties
  } = props

  React.useImperativeHandle(ref, () => ({
    play: () => {
      const tag = findNodeHandle(videoRef.current)
      console.log('Attempting to play with tag:', tag)
      UIManager.dispatchViewManagerCommand(tag, 'play', [])
    },
    pause: () => {
      const tag = findNodeHandle(videoRef.current)
      console.log('Attempting to pause with tag:', tag)
      UIManager.dispatchViewManagerCommand(tag, 'pause', [])
    },
    seekTo: (time: number) => {
      const tag = findNodeHandle(videoRef.current)
      console.log('Attempting to seek with tag:', tag, 'time:', time)
      UIManager.dispatchViewManagerCommand(tag, 'seekTo', [time])
    },
  }))

  const containerStyle: ViewStyle = {
    backgroundColor: 'black',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: borderRadius,
  }

  // Event handlers
  const handleError = (event: { nativeEvent: { error: string } }) => {
    if (onError) {
      onError(event.nativeEvent.error);
    }
  };

  const handleLoad = (event: { nativeEvent: { duration: number } }) => {
    if (onLoad) {
      onLoad({ duration: event.nativeEvent.duration });
    }
  };

  const handleProgress = (event: { nativeEvent: { currentTime: number; duration: number } }) => {
    if (onProgress) {
      onProgress({
        currentTime: event.nativeEvent.currentTime,
        duration: event.nativeEvent.duration,
      });
    }
  };

  const handleEnd = () => {
    if (onEnd) {
      onEnd();
    }
  };

  // When using pure native approach with children, simply pass the children to the native component
  if (children) {
    return (
      <NativeVideoPlayer
        ref={videoRef}
        videoURL={videoURL}
        style={[containerStyle, style]}
        borderRadius={borderRadius}
        resizeMode={resizeMode}
        onError={handleError}
        onLoad={handleLoad}
        onProgress={handleProgress}
        onEnd={handleEnd}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        hasTVPreferredFocus={hasTVPreferredFocus}
        tvParallaxProperties={tvParallaxProperties}
      >
        {children}
      </NativeVideoPlayer>
    )
  }

  // Original React Native overlay approach when using upNextComponent
  return (
    <View style={[containerStyle, style]}>
      <NativeVideoPlayer
        ref={videoRef}
        videoURL={videoURL}
        style={{ width: '100%', height: '100%' }}
        borderRadius={borderRadius}
        resizeMode={resizeMode}
        onError={handleError}
        onLoad={handleLoad}
        onProgress={handleProgress}
        onEnd={handleEnd}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        hasTVPreferredFocus={hasTVPreferredFocus}
        tvParallaxProperties={tvParallaxProperties}
      />
      
      {/* Up Next overlay */}
      {props.overlayVisible && upNextComponent}
    </View>
  )
})

export default VideoPlayer
