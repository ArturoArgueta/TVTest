import React, { useRef } from 'react'
import { requireNativeComponent, UIManager, findNodeHandle, StyleProp, ViewStyle, View } from 'react-native'

interface NativeVideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>
  onError?: (error: any) => void
  onLoad?: () => void
  onProgress?: (progress: { currentTime: number; duration: number }) => void
}

const NativeVideoPlayer = requireNativeComponent<NativeVideoPlayerProps>('VideoPlayerView')

// Add this for debugging
console.log('Available UIManager commands:', UIManager.getViewManagerConfig('VideoPlayerView'))

export interface VideoPlayerProps {
  videoURL: string
  style?: StyleProp<ViewStyle>;
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
    height: 300,
    position: 'relative',
    zIndex: 1,
  }

  return (
    <View style={[containerStyle, props.style]}>
      <NativeVideoPlayer
        ref={videoRef}
        videoURL={props.videoURL}
        style={{ width: '100%', height: '100%' }}
        onError={props.onError}
        onLoad={props.onLoad}
        onProgress={props.onProgress}
      />
    </View>
  )
})

export default VideoPlayer
