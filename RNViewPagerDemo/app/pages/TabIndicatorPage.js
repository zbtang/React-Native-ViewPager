/**
 * Created by tangzhibin on 16/3/24.
 */

'use strict'

import React, { Component } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { IndicatorViewPager, PagerTabIndicator } from 'rn-viewpager'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from '../components/PagerItemView'

export default class TabIndicatorPage extends Component {
    state = {
        bgColor: new Animated.Value(0)
    }

    _setBgColor = Animated.event([{bgColor: this.state.bgColor}])

    _bgColor = this.state.bgColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
    })

    render () {
        return (
            <Animated.View style={{flex: 1, backgroundColor: this._bgColor}} >
                <IndicatorViewPager
                    style={{flex: 1}}
                    indicator={this._renderTabIndicator()}
                    onPageScroll={this._onPageScroll.bind(this)}
                    scrollEnabled={false}
                    initialPage={1}
                >
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}
                </IndicatorViewPager>
            </Animated.View>
        )
    }

    _onPageScroll (scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position >= 2) return
        this._setBgColor({bgColor: offset + position})
    }

    _renderTabIndicator () {
        let tabs = [
            {
                text: 'SQUARE',
                iconSource: require('../imgs/ic_tab_square.png'),
                selectedIconSource: require('../imgs/ic_tab_square_slct.png')
            },
            {
                text: 'CIRCLE',
                iconSource: require('../imgs/ic_tab_circle.png'),
                selectedIconSource: require('../imgs/ic_tab_circle_slct.png')
            },
            {
                text: 'TRIANGLE',
                iconSource: require('../imgs/ic_tab_triangle.png'),
                selectedIconSource: require('../imgs/ic_tab_triangle_slct.png')
            }
        ]
        return (
            <PagerTabIndicator
                style={styles.indicatorContainer}
                iconStyle={styles.tabIcon}
                selectedIconStyle={styles.selectedTabIcon}
                textStyle={styles.tabTxt}
                selectedTextStyle={styles.selectedTabTxt}
                itemStyle={styles.tabItem}
                selectedItemStyle={styles.selectedTabItem}
                tabs={tabs}
            />
        )
    }

}

const styles = StyleSheet.create({
    indicatorContainer: {
        backgroundColor: 0xFFFFFFFF,
        borderTopWidth: 0,
        height: 56,
        paddingTop: 0,
        paddingBottom: 0
    },
    tabIcon: {
        width: 20,
        height: 20,
        tintColor: '#7F8C8D',
        resizeMode: 'contain'
    },
    selectedTabIcon: {
        width: 20,
        height: 20,
        tintColor: '#2C3E50',
        resizeMode: 'contain'
    },
    tabTxt: {
        color: '#34495E',
        marginTop: 0,
        fontSize: 10.5
    },
    selectedTabTxt: {
        color: '#2C3E50',
        marginTop: 0,
        fontSize: 12
    },
    tabItem: {
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 8
    },
    selectedTabItem: {
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 6
    }

})