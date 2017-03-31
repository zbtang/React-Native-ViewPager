/**
 * Created by tangzhibin on 15/12/29.
 *
 * 相当于Android中的Manifest,所有的页面都要在这里注册
 *
 */

'use strict'

import { StyleSheet, Text, View, Navigator } from 'react-native'

export function ExamplePage () {
    return {
        renderTitle: (navigator, index, state) => null,
        getTitle: (navigator, index, state) => null,

        renderLeftButton: (navigator, index, state) => null,
        renderBackButton: (navigator, index, state) => null,
        getBackButtonTitle: (navigator, index, state) => null,

        renderRightButton: (navigator, index, state) => null,
        getRightButtonImage: (navigator, index, state) => null,
        getRightButtonTitle: (navigator, index, state) => null,
        onPressRightButton: (navigator, index, state) => null,

        configureScene: () => null,
        renderScene: (navigator) => null,
        getSceneClass: () => null,
        onWillFocus: (event) => null,
        onDidFocus: (event) => null,
        onWillBlur: (event) => null,
        onDidBlur: (event) => null
    }
}

export function HomePage () {
    return {
        getTitle: () => '首页',
        getSceneClass: () => require('./pages/HomePage').default
    }
}
export function TabIndicatorPage () {
    return {
        getTitle: () => 'Tab Indicator',
        getSceneClass: () => require('./pages/TabIndicatorPage').default
    }
}
export function TitleIndicatorPage () {
    return {
        getTitle: () => 'Title Indicator',
        getSceneClass: () => require('./pages/TitleIndicatorPage').default
    }
}
export function DotIndicatorPage () {
    return {
        getTitle: () => 'Dot Indicator',
        getSceneClass: () => require('./pages/DotIndicatorPage').default
    }
}