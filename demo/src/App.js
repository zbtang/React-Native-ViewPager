'use strict'
import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TitleIndicatorPage from "./pages/TitleIndicatorPage";
import DotIndicatorPage from "./pages/DotIndicatorPage";
import TabIndicatorPage from "./pages/TabIndicatorPage";
import HomePage from "./pages/HomePage";

const Stack = createStackNavigator();

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="HomePage" component={HomePage} />
                        <Stack.Screen name="TitleIndicatorPage" component={TitleIndicatorPage} />
                        <Stack.Screen name="DotIndicatorPage" component={DotIndicatorPage} />
                        <Stack.Screen name="TabIndicatorPage" component={TabIndicatorPage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;