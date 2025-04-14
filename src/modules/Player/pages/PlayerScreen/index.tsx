import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import BackArrow from '../../../../assets/icons/backArrow.svg';
import { ButtonContainer, PlayerContent, RowButtonsContainer } from './styles';
import VideoPlayer,{VideoPlayerRef} from '../../../../components/atoms/VideoPlayer/VideoPlayer';
import { useTheme } from '@emotion/react';
import UpNextPreview from '../../../../components/atoms/VideoPlayer/UpNextPreview';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ route, navigation }) => {
    const { url } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };
    const VideoPlayerRef = useRef<VideoPlayerRef>(null);
    const theme = useTheme();
    const [showUpNext, setShowUpNext] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(8);
    useEffect(() => {VideoPlayerRef.current?.play();},[]);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowUpNext(true);
        }, 10000); // Show after 10 seconds

        return () => clearTimeout(timer);
      }, []);

      // Countdown timer for "Playing in X seconds"
      useEffect(() => {
        if (!showUpNext) {return;}

        if (timeRemaining > 0) {
          const timer = setTimeout(() => {
            setTimeRemaining(prev => prev - 1);
          }, 1000);

          return () => clearTimeout(timer);
        } else {
          // Auto-play next video when countdown reaches 0
          playNextVideo();
        }
      }, [showUpNext, timeRemaining]);

      const playNextVideo = () => {
        // In a real app, you would load the next video here
        Alert.alert('Next Video', 'Playing next video!');
        setShowUpNext(false);
      };


    return (
        <>
            <ButtonContainer onPress={handleBack} 
            focusable={true}
            accessible={true}>
                <BackArrow />
            </ButtonContainer>
            
            <VideoPlayer ref={VideoPlayerRef}
            style={{aspectRatio: 16 / 9, width: '100%' , alignSelf: 'center' }}
            videoURL={'https://flipfit-cdn.akamaized.net/flip_hls/662aae7a42cd740019b91dec-3e114f/video_h1.m3u8'}
            resizeMode="stretch"
            accessible={true}
            upNextComponent={<UpNextPreview
                title="Next Episode: Memoirs of Aratrika"
                episodeInfo="S1 E2"
                imageUrl="https://picsum.photos/300/170"
                timeRemaining={timeRemaining}
                onPress={playNextVideo}
            containerStyle={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                width: 280,
                borderRadius: 8,
                overflow: 'hidden',
                }}/>}
            />
         
        </>
    );
};

export default PlayerScreen;
