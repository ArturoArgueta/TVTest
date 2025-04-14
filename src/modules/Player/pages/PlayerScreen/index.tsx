import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, findNodeHandle, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { ButtonContainer } from './styles';
import VideoPlayer,{VideoPlayerRef} from '../../../../components/atoms/VideoPlayer/VideoPlayer';
import UpNextPreview from '../../../../components/molecules/UpNextView';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack();
    };
    const VideoPlayerRef = useRef<VideoPlayerRef>(null);
    const upNextRef = useRef(null);
    const [showUpNext, setShowUpNext] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(8);
    useEffect(() => {VideoPlayerRef.current?.play();},[]);


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

    const onVideoOver = useCallback(() => {
        setShowUpNext(true);
        VideoPlayerRef.current?.pause();
        
        // Allow a brief moment for the UI to update before attempting to set focus
        setTimeout(() => {
            if (upNextRef.current) {
                // TVFocus handling should be implemented platform-specifically
                const tag = findNodeHandle(upNextRef.current);
                if (tag) {
                    // This will be implemented with actual TV focus API 
                    // TVEventControl.requestTVFocus(tag);
                }
            }
        }, 100);
    },[]);

    return (
        <>
            <ButtonContainer onPress={handleBack} 
            focusable={true}
            accessible={true}>
                <View />
            </ButtonContainer>
            
            <VideoPlayer ref={VideoPlayerRef}
            style={{aspectRatio: 16 / 9, width: '100%' , alignSelf: 'center' }}
            videoURL={'https://flipfit-cdn.akamaized.net/flip_hls/662aae7a42cd740019b91dec-3e114f/video_h1.m3u8'}
            resizeMode="stretch"
            accessible={!showUpNext}
            onEnd={onVideoOver}
            overlayVisible={showUpNext}
            upNextComponent={
                <UpNextPreview
                    ref={upNextRef}
                    title="Next Episode: Memoirs of Aratrika"
                    episodeInfo="S1 E2"
                    imageUrl="https://picsum.photos/300/170"
                    timeRemaining={timeRemaining}
                    onPress={playNextVideo}/>
            }
            />
         
        </>
    );
};

export default PlayerScreen;
