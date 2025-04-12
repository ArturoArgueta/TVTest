import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { MainWrapper } from '../../../Home/pages/HomeScreen/style';
import { TVButton } from '../../../../components';
import { PlayerContent, ButtonWrapper, RowButtonsContainer } from './styles';
import VideoPlayer,{VideoPlayerRef} from '../../../../components/atoms/VideoPlayer/VideoPlayer';
import { useTheme } from '@emotion/react';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ route, navigation }) => {
    const { url } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };
    const VideoPlayerRef = useRef<VideoPlayerRef>(null)
    const theme = useTheme()
    return (
        <MainWrapper>
            <PlayerContent>
                <Text style={{ color: 'white' }}>Player Screen</Text>
                <Text style={{ color: 'white' }}>URL: {url}</Text>
                <VideoPlayer ref={VideoPlayerRef} 
                style={{aspectRatio: 16/9, width: '80%' , alignSelf: 'center' , padding: theme.scale(15)}}
                videoURL={'https://flipfit-cdn.akamaized.net/flip_hls/662aae7a42cd740019b91dec-3e114f/video_h1.m3u8'} 
                resizeMode='contain'
                />
                <RowButtonsContainer>
                    <TVButton 
                        title="Back to Home" 
                        onPress={handleBack}
                    />
                    <TVButton 
                        title="PLay it" 
                        onPress={() => VideoPlayerRef.current?.play()}
                    />
                    <TVButton 
                        title="Pause it" 
                        onPress={() => VideoPlayerRef.current?.pause()}
                    />
                </RowButtonsContainer>
                
            </PlayerContent>
        </MainWrapper>
    );
};

export default PlayerScreen; 