/**
 * Created by tangzhibin on 16/7/19.
 */

import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from '@shankarmorwal/rn-viewpager'
 
 const DotIndicatorInListPage = () => {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 3', 'row 4']));
    
    function _renderHeader() {
        return (
            <IndicatorViewPager
                style={{height: 200}}
                indicator={_renderIndicator()}
                autoPlayEnable
                onPageSelected={(p) => console.log(p)}
            >
                <View style={{backgroundColor: 'red'}} />
                <View style={{backgroundColor: 'green'}} />
                <View style={{backgroundColor: 'yellow'}} />
            </IndicatorViewPager>
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
    
    return (
        <ListView
        style={{flex: 1}}
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        renderHeader={_renderHeader}
        />
     )
 }
 export default DotIndicatorInListPage;