import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { MainWrapper } from '../../../Home/pages/HomeScreen/style';
import { TVButton } from '../../../../components';
import { PlayerContent, ButtonWrapper } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ route, navigation }) => {
    const { url } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <MainWrapper>
            <PlayerContent>
                <Text style={{ color: 'white' }}>Player Screen</Text>
                <Text style={{ color: 'white' }}>URL: {url}</Text>
                <TVButton 
                    title="Back to Home" 
                    onPress={handleBack}
                />
            </PlayerContent>
        </MainWrapper>
    );
};

export default PlayerScreen; 