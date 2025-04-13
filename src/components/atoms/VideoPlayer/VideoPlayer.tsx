import React, { useRef } from 'react'
import { requireNativeComponent, UIManager, findNodeHandle, StyleProp, ViewStyle, View } from 'react-native'

type ResizeMode = 'contain' | 'cover' | 'stretch'

interface NativeVideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>
  borderRadius?: number
  resizeMode?: string
  children?: React.ReactNode
  onError?: (error: any) => void
  onLoad?: () => void
  onProgress?: (progress: { currentTime: number; duration: number }) => void
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
  onError?: (error: any) => void
  onLoad?: () => void
  onProgress?: (progress: { currentTime: number; duration: number }) => void
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
    onProgress 
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

  // Position styles for the up next component when using the React Native approach
  const upNextStyles: ViewStyle = upNextPosition === 'bottom-right' 
    ? {
        position: 'absolute',
        bottom: 16,
        right: 16,
        maxWidth: '40%',
        maxHeight: '40%',
        zIndex: 2,
      }
    : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      }

  // When using pure native approach with children, simply pass the children to the native component
  if (children) {
    return (
      <NativeVideoPlayer
        ref={videoRef}
        videoURL={videoURL}
        style={[containerStyle, style]}
        borderRadius={borderRadius}
        resizeMode={resizeMode}
        onError={onError}
        onLoad={onLoad}
        onProgress={onProgress}
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
        onError={onError}
        onLoad={onLoad}
        onProgress={onProgress}
      />
      
      {/* Up Next overlay */}
      {upNextComponent && (
        <View style={upNextStyles}>
          {upNextComponent}
        </View>
      )}
    </View>
  )
})

export default VideoPlayer
