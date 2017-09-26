'use strict'

import React from 'react'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import XNavigatorStyles from './XNavigatorStyles'
import { BackIcon } from './XNavigatorIcons'

class NavigationBarRouteMapper {
    constructor (navigator, styles) {
        this._navigator = navigator
        this._titleStyle = styles.titleStyle
        this._barButtonTextStyle = styles.barButtonTextStyle
        this._barButtonIconStyle = styles.barButtonIconStyle
    }

    Title (route, navigator, index, state) {
        if (route.renderTitle) return route.renderTitle(this._navigator, index, state)
        if (!route.getTitle) return null
        return (
            <View style={XNavigatorStyles.barTitle} >
                <Text style={[XNavigatorStyles.barTitleText, this._titleStyle]} allowFontScaling={false} >
                    {shortenTitle(route.getTitle(this._navigator, index, state))}
                </Text >
            </View >
        )
    }

    LeftButton (route, navigator, index, state) {
        if (route.renderLeftButton) return route.renderLeftButton(this._navigator, index, state)
        if (index === 0) return null
        return this._renderBackButton(route, index, state)
    }

    _renderBackButton (route, index, state) {
        let previousIndex = index - 1
        let previousRoute = state.routeStack[previousIndex]
        if (previousRoute.renderBackButton) return previousRoute.renderBackButton(this._navigator, previousIndex, state)

        let defaultRenderBackButton = this._navigator.props.renderBackButton
        if (defaultRenderBackButton) return defaultRenderBackButton(this._navigator, previousIndex, state)

        let title
        if (route.getBackButtonTitle) title = route.getBackButtonTitle(this._navigator, index, state)
        else if (previousRoute.getTitle) title = previousRoute.getTitle(this._navigator, previousIndex, state)

        let buttonText = null
        if (title) {
            buttonText = (
                <Text
                    numberOfLines={1}
                    style={[XNavigatorStyles.barButtonText, XNavigatorStyles.barBackButtonText, this._barButtonTextStyle]}
                    allowFontScaling={false}
                >
                    {title}
                </Text >
            )
        }
        return (
            <TouchableOpacity
                pressRetentionOffset={XNavigatorStyles.barButtonPressRetentionOffset}
                onPress={() => this._navigator.pop()}
                style={[XNavigatorStyles.barBackButton]}
            >
                <BackIcon style={[XNavigatorStyles.barButtonIcon, this._barButtonIconStyle]} />
                {buttonText}
            </TouchableOpacity >
        )
    }

    RightButton (route, navigator, index, state) {
        if (route.renderRightButton) return route.renderRightButton(this._navigator, index, state)
        return this._renderRightButton(route, navigator, index, state)
    }

    _renderRightButton (route, navigator, index, state) {
        let title = route.getRightButtonTitle ? route.getRightButtonTitle() : null
        let imgSource = route.getRightButtonImage ? route.getRightButtonImage() : null
        if (!title && !imgSource) return null
        let buttonText = null, buttonImage = null
        if (title)
            buttonText = (
                <Text
                    numberOfLines={1}
                    style={[XNavigatorStyles.barButtonText, XNavigatorStyles.barRightButtonText, this._barButtonTextStyle]}
                    allowFontScaling={false}
                >
                    {title}
                </Text >
            )
        if (imgSource)
            buttonImage = (
                <Image
                    style={[XNavigatorStyles.barButtonIcon, XNavigatorStyles.barRightButtonIcon, this._barButtonIconStyle]}
                    source={imgSource}
                    resizeMode={'contain'} />
            )

        return (
            <TouchableOpacity
                style={[XNavigatorStyles.barRightButton]}
                pressRetentionOffset={XNavigatorStyles.barButtonPressRetentionOffset}
                onPress={route.onPressRightButton ? () => route.onPressRightButton(navigator, index, state) : null}
            >
                {buttonImage}
                {buttonText}
            </TouchableOpacity >
        )
    }
}

export default class ExRouteRenderer {
    constructor (navigator, styles) {
        this._navigator = navigator
        this._previousRoute = null
        this.navigationBarRouteMapper = new NavigationBarRouteMapper(navigator, styles)
        this.onBackPress = this.onBackPress.bind(this)
    }

    configureScene (route) {
        if (route.configureScene) {
            let sceneConfig = route.configureScene()
            if (sceneConfig) return sceneConfig
        }
        return Navigator.SceneConfigs.FloatFromRight
    }

    renderScene (route, navigator) {
        if (route.renderScene) {
            let scene = route.renderScene(navigator)
            if (!scene) {
                console.error('Your route.renderScene() must return a not-null object')
                return scene
            }
            return React.cloneElement(scene, {
                ref: component => route.scene = component,
                navigator: navigator
            })
        }
        if (!route.getSceneClass) {
            console.error('The route must implement renderScene or getSceneClass')
            return null
        }
        let Component = route.getSceneClass()
        return (
            <Component
                ref={component => route.scene = component}
                navigator={navigator}
            />
        )
    }

    onWillFocus (event) {
        let {data: {route}} = event
        if (route.onWillFocus) route.onWillFocus(event)
        // The component isn't mounted yet if this is the first time it's rendered
        if (route.scene && route.scene.componentWillFocus) route.scene.componentWillFocus(event)
        let previousRoute = this._previousRoute
        if (previousRoute) {
            if (previousRoute.onWillBlur) previousRoute.onWillBlur(event)
            let previousScene = previousRoute.scene
            if (previousScene && previousScene.componentWillBlur) previousScene.componentWillBlur(event)
        }
    }

    onDidFocus (event) {
        let {data: {route}} = event
        if (route.onDidFocus) route.onDidFocus(event)

        if (route.scene && route.scene.componentDidFocus) route.scene.componentDidFocus(event)

        let previousRoute = this._previousRoute
        if (previousRoute) {
            if (previousRoute.onDidBlur) previousRoute.onDidBlur(event)
            let previousScene = previousRoute.scene
            if (previousScene && previousScene.componentDidBlur) previousScene.componentDidBlur(event)
        }
        this._previousRoute = route
    }

    onBackPress () {
        if (!this._navigator) return
        let currentRoutes = this._navigator.getCurrentRoutes()
        if (!currentRoutes && currentRoutes.length == 0) return
        let currentRoute = currentRoutes[currentRoutes.length - 1]

        if (currentRoute.onBackPress) return currentRoute.onBackPress(this._navigator)

        if (currentRoute.scene && currentRoute.scene.onBackPress) return currentRoute.scene.onBackPress(this._navigator)

        if (currentRoutes.length > 1) {
            this._navigator.pop()
            return true
        }
        return false

    }
}

/**
 * 缩短标题,防止标题影响布局
 * @param title
 * @returns {*}
 */
function shortenTitle (title) {
    if (title.length > 18) return title.substr(0, 18) + '…'
    else return title
}