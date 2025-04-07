import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../modules/Home/pages/HomeScreen';
import PlayerScreen from '../modules/Player/pages/PlayerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Player" component={PlayerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}; 