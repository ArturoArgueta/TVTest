import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native'

export interface UpNextPreviewProps {
  title: string
  episodeInfo?: string
  imageUrl: string
  onPress?: () => void
  timeRemaining?: number
  containerStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  textStyle?: StyleProp<TextStyle>
}

const UpNextPreview: React.FC<UpNextPreviewProps> = ({
  title,
  episodeInfo,
  imageUrl,
  onPress,
  timeRemaining,
  containerStyle,
  imageStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={[styles.image, imageStyle]} />
        {timeRemaining !== undefined && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              Playing in {timeRemaining} sec
            </Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, textStyle]} numberOfLines={1}>
          {title}
        </Text>
        {episodeInfo && (
          <Text style={[styles.episodeInfo, textStyle]} numberOfLines={1}>
            {episodeInfo}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 68,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  episodeInfo: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  timeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 4,
  },
  timeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default UpNextPreview 