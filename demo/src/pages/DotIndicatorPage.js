/**
 * Created by tangzhibin on 16/7/19.
 */

'use strict'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Animated, TouchableOpacity, Image } from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from '@shankarmorwal/rn-viewpager'
import { TrianglePagerView, SquarePagerView, CirclePagerView } from '../components/PagerItemView'

const DotIndicatorPage = (props) => {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));
    let _setBgColor = Animated.event([{bgColor: bgColor}],{useNativeDriver: false});
    function _renderIndicator() {
        return (
            <PagerDotIndicator
                pageCount={3}
                style={{bottom: 16}}
                dotStyle={{backgroundColor: '#FFFFFF88'}}
            />
        )
      }

      function _onPageScroll(scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position >= 2) return
        _setBgColor({bgColor: offset + position})
      }
      let bgColorset = bgColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
    })
   
    return (
        <View style={{flex: 1}} >
            <Animated.View
                style={[styles.bgView, {backgroundColor: bgColorset}]}
            />
            <IndicatorViewPager
                style={{flex: 1}}
                indicator={_renderIndicator()}
                onPageScroll={_onPageScroll.bind(this)}
                autoPlayEnable
                onPageSelected={(p) => console.log(p)}
            >
                {SquarePagerView()}
                {CirclePagerView()}
                {TrianglePagerView()}
            </IndicatorViewPager>
            <View style={styles.divider} />
        </View>
    )
}

export default DotIndicatorPage;

const styles = StyleSheet.create({
    bgView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    divider: {
        height: 1,
        backgroundColor: '#FFFFFF64',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 48
    },
    backContainer: {
        position: 'absolute',
        bottom: 8,
        left: 16
    },
    backImg: {
        width: 32,
        height: 32,
        tintColor: 0XFFFFFFDD
    }
})