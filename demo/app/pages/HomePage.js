/**
 * Created by tangzhibin on 16/3/21.
 */

'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ViewPagerPage, TabIndicatorTest} from '../XRoutes';

export default class HomePage extends Component {

    render() {
        return (
            <View>
                {this.renderItem('DotIndicator & TitleIndicator Test', () => this.props.navigator.push(ViewPagerPage()))}
                {this.renderItem('TabIndicator Test', () => this.props.navigator.push(TabIndicatorTest()))}
            </View>
        );
    }

    renderItem(text, onPress) {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={onPress}
                activeOpacity={0.6}
            >
                <Text>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D2D2D2'
    }
});