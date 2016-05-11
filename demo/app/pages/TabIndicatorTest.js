/**
 * Created by tangzhibin on 16/5/10.
 */

'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {IndicatorViewPager, PagerTabIndicator} from 'rn-viewpager';

export default class TabIndicatorTest extends Component {
    static propTypes = {
        ...View.propTypes
    };
    static defaultProps = {};

    render() {
        return (
            <IndicatorViewPager
                style={{flex:1}}
                indicator={this._renderTabIndicator()}
            >
                <View style={{backgroundColor:'cadetblue'}}>
                    <Text>Home Page</Text>
                </View>
                <View style={{backgroundColor:'cornflowerblue'}}>
                    <Text>Message Page</Text>
                </View>
                <View style={{backgroundColor:'#1AA094'}}>
                    <Text>Profile Page</Text>
                </View>
            </IndicatorViewPager>
        );
    }

    _renderTabIndicator() {
        let tabs = [
            {
                text: 'Home',
                iconSource: require('../imgs/ic_tab_home_normal.png'),
                selectedIconSource: require('../imgs/ic_tab_home_click.png')
            },
            {
                text: 'Message',
                iconSource: require('../imgs/ic_tab_task_normal.png'),
                selectedIconSource: require('../imgs/ic_tab_task_click.png')
            },
            {
                text: 'Profile',
                iconSource: require('../imgs/ic_tab_my_normal.png'),
                selectedIconSource: require('../imgs/ic_tab_my_click.png')
            }
        ];
        return (
            <PagerTabIndicator
                tabs={tabs}
            />
        );
    }
}