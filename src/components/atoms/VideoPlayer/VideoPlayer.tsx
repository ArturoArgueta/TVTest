import React, { useRef } from 'react'
import { requireNativeComponent, UIManager, findNodeHandle, StyleProp, ViewStyle, View } from 'react-native'

type ResizeMode = 'contain' | 'cover' | 'stretch'

interface NativeVideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>
  borderRadius?: number
  resizeMode?: string
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
    </View>
  )
})

export default VideoPlayer
