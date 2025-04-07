/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { RootNavigator } from './navigation/RootNavigator';

function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <RootNavigator />
        </ThemeProvider>
    );
}

export default App;
