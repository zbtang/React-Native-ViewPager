/**
 * Created by tangzhibin on 16/7/19.
 */

'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'

export default class DotIndicatorInListPage extends Component {
    constructor (props) {
        super(props)
        this._renderHeader = this._renderHeader.bind(this)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 3', 'row 4'])}
    }

    render () {
        return (
            <ListView
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
                renderHeader={this._renderHeader}
            />
        )
    }

    _renderHeader () {
        return (
            <IndicatorViewPager
                style={{height: 200}}
                indicator={this._renderIndicator()}
                autoPlayEnable
                onPageSelected={(p) => console.log(p)}
            >
                <View style={{backgroundColor: 'red'}} />
                <View style={{backgroundColor: 'green'}} />
                <View style={{backgroundColor: 'yellow'}} />
            </IndicatorViewPager>
        )
    }

    _renderIndicator () {
        return (
            <PagerDotIndicator
                pageCount={3}
                style={{bottom: 16}}
                dotStyle={{backgroundColor: '#FFFFFF88'}}
            />
        )
    }

}

const styles = StyleSheet.create({
    bannerImg: {
        flex: 1,
        height: 100,
        width: 300
    }
})