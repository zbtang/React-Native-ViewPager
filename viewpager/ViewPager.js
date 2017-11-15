/**
 * Created by tangzhibin on 16/2/28.
 */

'use strict'

import { PanResponder, Platform, ScrollView, StyleSheet, View, ViewPagerAndroid } from 'react-native'
import React, { Component } from 'react'

const SCROLLVIEW_REF = 'scrollView'
const VIEWPAGER_REF = 'viewPager'

const SCROLL_STATE = {
    idle: 'idle',
    settling: 'settling',
    dragging: 'dragging'
}
export default class ViewPager extends Component {
    static propTypes = {...ViewPagerAndroid.propTypes}

    static defaultProps = {
        initialPage: 0,
        keyboardDismissMode: 'on-drag',
        onPageScroll: null,
        onPageSelected: null,
        onPageScrollStateChanged: null,
        pageMargin: 0,
        horizontalScroll: true
    }


    _scrollState = SCROLL_STATE.idle

    _preScrollX = null

    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => this._setScrollState(SCROLL_STATE.dragging),
        onPanResponderMove: () => null,
        onPanResponderRelease: () => this._setScrollState(SCROLL_STATE.settling),
        onPanResponderTerminate: () => null,
        onPanResponderTerminationRequest: (evt, gestureState) => true
    })

    constructor (props) {
        super(props)
        this._onPageScrollOnAndroid = this._onPageScrollOnAndroid.bind(this)
        this._onPageSelectedOnAndroid = this._onPageSelectedOnAndroid.bind(this)
        this._renderOnIOS = this._renderOnIOS.bind(this)
        this._onScrollOnIOS = this._onScrollOnIOS.bind(this)
        this._onScrollViewLayout = this._onScrollViewLayout.bind(this)
        this._childrenWithOverridenStyle = this._childrenWithOverridenStyle.bind(this)
        this._setScrollState = this._setScrollState.bind(this)
        this.setPageWithoutAnimation = this.setPageWithoutAnimation.bind(this)
        this.setPage = this.setPage.bind(this)
        this.state = {width: 0, height: 0, page: props.initialPage}
    }

    render () {
        return (this.props.forceScrollView || Platform.OS === 'ios') ? this._renderOnIOS() : (
            <ViewPagerAndroid
                {...this.props}
                scrollEnabled={this.props.horizontalScroll ? true : false}
                ref={VIEWPAGER_REF}
                key={this.props.children ? this.props.children.length : 0}
                onPageScroll={this._onPageScrollOnAndroid}
                onPageSelected={this._onPageSelectedOnAndroid}
            />
        )
    }

    _onPageScrollOnAndroid (e) {
        if (this.props.onPageScroll) this.props.onPageScroll(e.nativeEvent)
    }

    _onPageSelectedOnAndroid (e) {
        if (this.props.onPageSelected) this.props.onPageSelected(e.nativeEvent)
    }

    _renderOnIOS () {
        let childrenCount = this.props.children ? this.props.children.length : 0
        let initialPage = Math.min(Math.max(0, this.props.initialPage), childrenCount - 1)
        let needMonitorScroll = !!this.props.onPageScroll || !!this.props.onPageSelected || !!this.props.onPageScrollStateChanged
        let needMonitorTouch = !!this.props.onPageScrollStateChanged
        let props = {
            ...this.props,
            ref: SCROLLVIEW_REF,
            onLayout: this._onScrollViewLayout,
            horizontal: true,
            pagingEnabled: this.props.horizontalScroll ? true : false,
            scrollsToTop: false,
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            children: this._childrenWithOverridenStyle(),
            contentOffset: {x: this.state.width * initialPage, y: 0},
            decelerationRate: 0.9,
            onScroll: needMonitorScroll ? this._onScrollOnIOS : null,
            scrollEventThrottle: needMonitorScroll ? ( this.props.onPageScroll ? 8 : 1) : 0
        }
        if (needMonitorTouch) props = Object.assign(props, this._panResponder.panHandlers)
        const scrollViewStyle = {
            overflow: 'visible',
            marginHorizontal: -this.props.pageMargin / 2
        }
        if (this.props.style && !this.props.style.height)
            return <ScrollView {...props} style={[scrollViewStyle, this.props.style]} />
        else return (
            <View style={this.props.style} >
                <ScrollView {...props} style={scrollViewStyle} />
            </View>
        )
    }

    _onScrollOnIOS (e) {
        let {x} = e.nativeEvent.contentOffset, offset, position = Math.floor(x / this.state.width)
        if (x === this._preScrollX) return
        this._preScrollX = x
        offset = x / this.state.width - position

        if (this.props.onPageScroll) this.props.onPageScroll({offset, position})

        if (this.props.onPageSelected && offset === 0) {
            this.props.onPageSelected({position})
            this.props.onPageScrollStateChanged && this._setScrollState(SCROLL_STATE.idle)
            this.setState({page: position})
        }
    }

    _onScrollViewLayout (event) {
        let {width, height} = event.nativeEvent.layout
        this.setState({width, height}, () => Platform.OS === 'ios' && this.setPageWithoutAnimation(this.state.page))
    }

    _childrenWithOverridenStyle () {
        if (this.state.width === 0 || this.state.height === 0) return null
        return React.Children.map(this.props.children, (child) => {
            if (!child)return null
            let newProps = {
                ...child.props,
                style: [child.props.style, {
                    width: this.state.width,
                    height: this.state.height,
                    position: null
                }],
                collapsable: false
            }
            if (child.type &&
                child.type.displayName &&
                (child.type.displayName !== 'RCTView') &&
                (child.type.displayName !== 'View')) {
                console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName)
            }
            return React.createElement(child.type, newProps)
        })
    }

    _setScrollState (scrollState) {
        if (scrollState === this._scrollState) return
        this.props.onPageScrollStateChanged && this.props.onPageScrollStateChanged(scrollState)
        this._scrollState = scrollState
    }

    setPageWithoutAnimation (selectedPage) {
        this.setState({page: selectedPage})
        if (this.props.forceScrollView || Platform.OS === 'ios')
            this.refs[SCROLLVIEW_REF].scrollTo({x: this.state.width * selectedPage, animated: false})
        else {
            this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage)
            if (this.props.onPageSelected) this.props.onPageSelected({position: selectedPage})
        }
    }

    setPage (selectedPage) {
        this.setState({page: selectedPage})
        if (this.props.forceScrollView || Platform.OS === 'ios') this.refs[SCROLLVIEW_REF].scrollTo({x: this.state.width * selectedPage})
        else {
            this.refs[VIEWPAGER_REF].setPage(selectedPage)
            if (this.props.onPageSelected) this.props.onPageSelected({position: selectedPage})
        }
    }

}
