/**
 * Created by tangzhibin on 16/5/10.
 */

'use strict'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Platform, Image, TouchableOpacity, Animated,Dimensions } from 'react-native'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from '../components/PagerItemView'
import { IndicatorViewPager,PagerTitleIndicator } from '@shankarmorwal/rn-viewpager'

const windowWidth = Dimensions.get('window').width;

const TitleIndicatorPage = (props) => {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));
    let _setBgColor = Animated.event([{bgColor: bgColor}],{useNativeDriver: false});
    let _bgColor = bgColor.interpolate({
        inputRange: [0, 1, 2 , 3 , 4, 5 , 6 , 7, 8],
        outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)','hsl(32, 97%, 59%)','hsl(72, 97%, 59%)','hsl(212, 97%, 59%)','hsl(332, 97%, 59%)','hsl(1, 97%, 59%)','hsl(200, 97%, 59%)']
    })
    function _onPageScroll(scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position > 8) return
        _setBgColor({bgColor: offset + position})
    }
    function _renderTitleIndicator(){
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                trackScroll={true}
                itemTextStyle={styles.indicatorText}
                itemStyle={{width:windowWidth/4}}
                selectedItemStyle={{width:windowWidth/4}}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
                titles={['SQUARE', 'CIRCLE','TRIANGLE','SQUARE', 'CIRCLE','TRIANGLE','SQUARE', 'CIRCLE','TRIANGLE']}
            />
        )
    }
    return (
        <Animated.View style={{flex: 1, backgroundColor: _bgColor}} >
                <View >
                    {Platform.OS === 'ios' && <View style={styles.statusBar} />}
                    <View style={styles.toolbarContainer} >
                        <TouchableOpacity onPress={() => props.navigator.pop()} >
                            <Image style={styles.backImg} source={require('../imgs/back_arrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt} >TITLE</Text>
                    </View>
                </View>
                <IndicatorViewPager
                    style={{flex: 1, flexDirection: 'column-reverse'}}
                    indicator={_renderTitleIndicator()}
                    onPageScroll={_onPageScroll}
                >
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}

                </IndicatorViewPager>
            </Animated.View>
    )
}

export default TitleIndicatorPage

const styles = StyleSheet.create({
    indicatorContainer: {
        backgroundColor: 0x00000020,
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        color: 0xFFFFFF99
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 0xFFFFFFFF
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'white'
    },
    statusBar: {
        height: 24,
        backgroundColor: 0x00000044
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: 0x00000020,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20
    }
})