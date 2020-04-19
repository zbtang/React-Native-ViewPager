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
    function _renderBackBtn() {
        return (
            <TouchableOpacity
                style={styles.backContainer}
                activeOpacity={0.6}
                onPress={() => props.navigator.pop()}
            >
                <Image
                    source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABPElEQVRoQ+2X0Q3CMBBD3Q0YhRXYBEZgEzYANmADGAE2YARGQP4oqhAJae00qnT5be/qZ1/TtMPCV7dw/QiA1glGApGA6ECMkGigXB4JyBaKDSIB0UC5PBL4YeEKwDph7R3AS7Z90MCdAMVfEwAnADunePZyAswu3gmQE38AsHc73/dzJJATz5Hh6FRbKgBfVs48Ib5XdfHqCDUXrwDkxHNkzsLMjNpqp4xQTryg+1O6AXArbTQWYAvgWNp84n0B8M+42ilUTaCHy0FcADz+uZC5zk3gWVo/9h0Y9k1B8LBGF7mbVF8KAMWldqTZIFSAHASvVf8aOwCaQrgAmkE4AQgx+8nUDdBDpH4pi48IpdtXDYDSZ1vuCwCLjUKTSEAwz1IaCVhsFJpEAoJ5ltJIwGKj0CQSEMyzlC4+gTd/aS0xXlARiwAAAABJRU5ErkJggg=='}}
                    style={styles.backImg}
                />
            </TouchableOpacity>
        )
    }

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
            {_renderBackBtn()}
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