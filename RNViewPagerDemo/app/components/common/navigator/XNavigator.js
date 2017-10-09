/**
 * Created by tangzhibin on 15/12/28.
 */

'use strict'

import { StyleSheet, Platform, ViewPropTypes, Text, Image, BackAndroid } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { PropTypes } from 'react'
import React from 'react'
import XNavBarStyle from './XNavBarStyle'
import XNavigatorStyles from './XNavigatorStyles'
import XRouteRenderer from './XRouteRenderer'
import XNavigatorMixin from './XNavigatorMixin'

export default class XNavigator extends React.Component {
    constructor (props, context) {
        super(props, context)
        this._routeRenderer = new XRouteRenderer(this, {
            titleStyle: props.titleStyle,
            barButtonTextStyle: props.barButtonTextStyle,
            barButtonIconStyle: props.barButtonIconStyle
        })

        this._renderScene = this._renderScene.bind(this)
        this._renderNavigationBar = this._renderNavigationBar.bind(this)
        this._setNavigatorRef = this._setNavigatorRef.bind(this)
    }

    static propTypes = {
        ...Navigator.props,
        sceneStyle: ViewPropTypes.style,
        navigationBarStyle: ViewPropTypes.style,
        titleStyle: Text.propTypes.style,
        barButtonTextStyle: Text.propTypes.style,
        barButtonIconStyle: Image.propTypes.style,
        showNavigationBar: PropTypes.bool,
        renderNavigationBar: PropTypes.func,
        augmentScene: PropTypes.func
    }

    static defaultProps = {
        ...Navigator.defaultProps,
        showNavigationBar: true,
        renderNavigationBar: props => <Navigator.NavigationBar {...props} />
    }

    render () {
        let sencePaddingTop = this.props.showNavigationBar ? XNavBarStyle.General.TotalNavHeight : 0
        return (
            <Navigator
                {...this.props}
                ref={this._setNavigatorRef}
                style={[XNavigatorStyles.navigator, this.props.style]}
                sceneStyle={StyleSheet.flatten([XNavigatorStyles.scene, {paddingTop: sencePaddingTop}, this.props.sceneStyle])}
                navigationBar={this._renderNavigationBar()}
                configureScene={route => this._routeRenderer.configureScene(route)}
                renderScene={this._renderScene}
            />
        )
    }

    _setNavigatorRef (navigator) {
        this.__navigator = navigator
        if (!navigator) this._unsubscribeFromFocusEvents(navigator)
    }

    _renderScene (route, navigator) {
        if (!this._subscribedToFocusEvents) this._subscribeToFocusEvents(navigator)
        this._setNavigatorRef(navigator)

        let scene = this._routeRenderer.renderScene(route, this)
        if (typeof this.props.augmentScene === 'function')
            scene = this.props.augmentScene(scene, route)

        let firstRoute = navigator.getCurrentRoutes()[0]
        if (route === firstRoute)
            scene = React.cloneElement(scene, {
                ref: component => {
                    this._firstScene = component
                    route.scene = component
                }
            })
        return scene
    }

    _subscribeToFocusEvents (navigator) {
        let navigationContext = navigator.navigationContext
        this._onWillFocusSubscription = navigationContext.addListener('willfocus', event => this._routeRenderer.onWillFocus(event))
        this._onDidFocusSubscription = navigationContext.addListener('didfocus', event => this._routeRenderer.onDidFocus(event))
        this._subscribedToFocusEvents = true
    }

    _unsubscribeFromFocusEvents () {
        this._onWillFocusSubscription.remove()
        this._onDidFocusSubscription.remove()
        this._subscribedToFocusEvents = false
    }

    get navigationContext () {
        return this.__navigator.navigationContext
    }

    get parentNavigator () {
        // Navigator sets its `parentNavigator` property in componentWillMount, but
        // we don't get a reference to the Navigator until it has been mounted. So
        // there is a window of time during which the Navigator's `parentNavigator`
        // property has been set but we don't have a reference to the Navigator;
        // when that happens we'll simulate Navigator and return our `navigator`
        // prop.
        return !this.__navigator ? this.props.navigator : this.__navigator.parentNavigator
    }

    /**
     * 渲染标题栏
     * @returns {XML}
     * @private
     */
    _renderNavigationBar () {
        if (!this.props.showNavigationBar) return null
        return this.props.renderNavigationBar({
            routeMapper: this._routeRenderer.navigationBarRouteMapper,
            style: [XNavigatorStyles.bar, this.props.navigationBarStyle],
            navigationStyles: XNavBarStyle
        })
    }

    componentWillMount () {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this._routeRenderer.onBackPress)
        }
    }

    componentWillUnmount () {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this._routeRenderer.onBackPress)
        }
    }
}
Object.assign(XNavigator.prototype, XNavigatorMixin)