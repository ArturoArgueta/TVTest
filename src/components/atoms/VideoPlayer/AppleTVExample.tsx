import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import VideoPlayer, { VideoPlayerRef } from './VideoPlayer'
import UpNextPreview from './UpNextPreview'

const AppleTVExample: React.FC = () => {
  const videoRef = useRef<VideoPlayerRef>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showUpNext, setShowUpNext] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(8)
  
  // Simulate showing the "Up Next" component near the end of the video
  useEffect(() => {
    if (duration > 0 && currentTime > 0 && duration - currentTime < 15) {
      setShowUpNext(true)
    } else {
      setShowUpNext(false)
    }
  }, [currentTime, duration])
  
  // Countdown timer for "Playing in X seconds"
  useEffect(() => {
    if (!showUpNext) {
      setTimeRemaining(8)
      return
    }
    
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else {
      // Auto-play next video when countdown reaches 0
      handleNextVideo()
    }
  }, [showUpNext, timeRemaining])
  
  const handleNextVideo = () => {
    // In a real app, you would load the next video here
    // For this example, we'll just reset
    videoRef.current?.seekTo(0)
    videoRef.current?.play()
    setShowUpNext(false)
  }
  
  const handleProgress = (progress: { currentTime: number; duration: number }) => {
    setCurrentTime(progress.currentTime)
    setDuration(progress.duration)
  }
  
  const handleEnd = () => {
    setShowUpNext(true)
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apple TV Video Player</Text>
      
      <VideoPlayer
        ref={videoRef}
        videoURL="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        style={styles.player}
        borderRadius={8}
        resizeMode="cover"
        showAppleTVControls={true} // This will enable native Apple TV controls
        onProgress={handleProgress}
        onEnd={handleEnd}
        upNextComponent={
          showUpNext ? (
            <UpNextPreview
              title="Next Episode: Memoirs of Aratrika"
              episodeInfo="S1 E2"
              imageUrl="https://picsum.photos/300/170"
              timeRemaining={timeRemaining}
              onPress={handleNextVideo}
            />
          ) : null
        }
        upNextPosition="bottom-right"
      />
      
      {Platform.isTV ? (
        <Text style={styles.instructions}>
          Use your Apple TV remote to control playback.
          {'\n'}Press Menu to navigate back.
        </Text>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => videoRef.current?.play()}
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => videoRef.current?.pause()}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => videoRef.current?.seekTo(currentTime - 10)}
          >
            <Text style={styles.buttonText}>-10s</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => videoRef.current?.seekTo(currentTime + 10)}
          >
            <Text style={styles.buttonText}>+10s</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.progressInfo}>
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  player: {
    width: '100%',
    height: Platform.isTV ? 500 : 250,
    borderRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  instructions: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: Platform.isTV ? 24 : 16,
    color: '#555',
    lineHeight: Platform.isTV ? 36 : 24,
  },
})

export default AppleTVExample 