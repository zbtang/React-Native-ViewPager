/**
 * Created by tangzhibin on 16/5/10.
 */

'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform, Image, TouchableOpacity, Animated} from 'react-native';
import {SquarePagerView, TrianglePagerView, CirclePagerView} from '../components/PagerItemView';
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';


export default class TitleIndicatorPage extends Component {
    state = {
        bgColor: new Animated.Value(0)
    };
    _setBgColor = Animated.event([{bgColor: this.state.bgColor}]);


    render() {
        let bgColor = this.state.bgColor.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
        });
        return (
            <Animated.View style={{flex: 1, backgroundColor: bgColor}}>
                <View >
                    {Platform.OS === 'ios' && <View style={styles.statusBar}/>}
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                            <Image style={styles.backImg} source={require('../imgs/back_arrow.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>TITLE</Text>
                    </View>
                </View>
                <IndicatorViewPager
                    style={{flex: 1, flexDirection: 'column-reverse'}}
                    indicator={this._renderTitleIndicator()}
                    onPageScroll={this._onPageScroll.bind(this)}
                >
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}
                </IndicatorViewPager>
            </Animated.View>
        );
    }

    _renderTitleIndicator() {
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                itemTextStyle={styles.indicatorText}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
                titles={['SQUARE', 'CIRCLE', 'TRIANGLE']}
            />
        );
    }

    _onPageScroll(scrollData) {
        let {offset, position}=scrollData;
        if (position < 0 || position >= 2) return;
        this._setBgColor({bgColor: offset + position});
    }

}

const styles = StyleSheet.create({
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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
});