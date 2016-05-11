/**
 * Created by tangzhibin on 16/2/28.
 */

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, ViewPagerAndroid, ScrollView, Platform} from 'react-native';

const SCROLLVIEW_REF = 'scrollView';
const VIEWPAGER_REF = 'viewPager';

export default class ViewPager extends Component {
    static propTypes = {
        ...ViewPagerAndroid.propTypes
    };
    static defaultProps = {
        initialPage: 0,
        keyboardDismissMode: 'on-drag',
        onPageScroll: null,
        onPageSelected: null,
        /**
         * iOS not support yet
         */
        onPageScrollStateChanged: null,
    };

    state = {width: 0, height: 0};

    render() {
        return Platform.OS === 'ios' ? this._renderOnIOS() : (
            <ViewPagerAndroid
                {...this.props}
                ref={VIEWPAGER_REF}
                onPageScroll={this._onPageScrollOnAndroid.bind(this)}
                onPageSelected={this._onPageSelectedOnAndroid.bind(this)}
            />
        );
    }

    _onPageScrollOnAndroid(e) {
        if (this.props.onPageScroll) this.props.onPageScroll(e.nativeEvent);
    }

    _onPageSelectedOnAndroid(e) {
        if (this.props.onPageSelected) this.props.onPageSelected(e.nativeEvent);
    }

    _renderOnIOS() {
        let childrenCount = this.props.children ? this.props.children.length : 0;
        let initialPage = Math.min(Math.max(0, this.props.initialPage), childrenCount - 1);
        let props = {
            ...this.props,
            ref: SCROLLVIEW_REF,
            onLayout: this._onScrollViewLayout.bind(this),
            horizontal: true,
            pagingEnabled: true,
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            children: this._childrenWithOverridenStyle(),
            contentOffset: {x: this.state.width * initialPage, y: 0},
            decelerationRate: 0.9,

            onScroll: !this.props.onPageScroll && !this.props.onPageSelected ? null : this._onScrollOnIOS.bind(this),
            scrollEventThrottle: !this.props.onPageScroll && !this.props.onPageSelected ? 0 : ( this.props.onPageScroll ? 8 : 1)
        };
        if (this.props.style && !this.props.style.height) return (<ScrollView {...props}/>);
        else return (
            <View style={this.props.style}>
                <ScrollView {...props} style={null}/>
            </View>
        )

    }

    _onScrollOnIOS(e) {
        if (!this.props.onPageScroll && !this.props.onPageSelected)return;

        let {x} = e.nativeEvent.contentOffset, offset, position = Math.floor(x / this.state.width);
        offset = x / this.state.width - position;

        if (this.props.onPageScroll) this.props.onPageScroll({offset, position});

        if (this.props.onPageSelected && offset === 0) this.props.onPageSelected({position});
    }

    _onScrollViewLayout(event) {
        let {width, height} = event.nativeEvent.layout;
        this.setState({width, height});
    }

    _childrenWithOverridenStyle() {
        if (this.state.width === 0 || this.state.height === 0) return null;
        return React.Children.map(this.props.children, (child)=> {
            if (!child)return null;
            let newProps = {
                ...child.props,
                style: [child.props.style, {
                    width: this.state.width,
                    height: this.state.height,
                    position: null
                }],
                collapsable: false
            };
            if (child.type &&
                child.type.displayName &&
                (child.type.displayName !== 'RCTView') &&
                (child.type.displayName !== 'View')) {
                console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName);
            }
            return React.createElement(child.type, newProps);
        });
    }

    setPageWithoutAnimation(index) {
        this.refs[SCROLLVIEW_REF].scrollTo({x: this.state.width * index, animated: false});
    }

    setPage(index) {
        if (Platform.OS === 'ios')
            this.refs[SCROLLVIEW_REF].scrollTo({x: this.state.width * index});
        else {
            this.refs[VIEWPAGER_REF].setPage(index);
            if (this.props.onPageSelected) this.props.onPageSelected({position: index});
        }
    }
}