import React from "react";
import { CarouselList } from '../../../../components'
import { SafeAreaView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { MainWrapper } from "./style";
import { useTheme } from "@emotion/react";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const mockCarousel = {
    containers: [
        {
            _id: '1',
            aspectRatio: 16/9,  // 16:9 ratio (widescreen)
            resource_width: 320,
            resources: [
                { _id: '1-1' },
                { _id: '1-2' },
                { _id: '1-3' },
                { _id: '1-4' },
                { _id: '1-5' },
                { _id: '1-6' },
                { _id: '1-7' },
                { _id: '1-8' },
                { _id: '1-9' },
                { _id: '1-10' },
            ]
        },
        {
            _id: '2',
            aspectRatio: 2/3,    // 2:3 ratio (portrait)
            resource_width: 240,
            resources: [
                { _id: '2-1' },
                { _id: '2-2' },
                { _id: '2-3' },
                { _id: '2-4' },
                { _id: '2-5' },
                { _id: '2-6' },
                { _id: '2-7' },
                { _id: '2-8' },
                { _id: '2-9' },
                { _id: '2-10' },
            ]
        },
        {
            _id: '3',
            aspectRatio: 4/3,    // 4:3 ratio (standard)
            resource_width: 280,
            resources: [
                { _id: '3-1' },
                { _id: '3-2' },
                { _id: '3-3' },
                { _id: '3-4' },
                { _id: '3-5' },
                { _id: '3-6' },
                { _id: '3-7' },
                { _id: '3-8' },
                { _id: '3-9' },
                { _id: '3-10' },
            ]
        }
    ]
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // Example of how to navigate to Player screen
    const handleNavigateToPlayer = (url: string) => {
        navigation.navigate('Player', { url });
    };
    const theme = useTheme()
    console.log('backgroundColor',theme.colors.background0)
    return (
        <MainWrapper>
            <CarouselList carousel={mockCarousel} />
        </MainWrapper>
    )
}

export default HomeScreen
