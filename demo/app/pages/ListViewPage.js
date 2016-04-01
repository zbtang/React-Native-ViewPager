/**
 * Created by tangzhibin on 16/3/24.
 */

'use strict';

import React, {Component, StyleSheet, View, ListView, Text, RefreshControl} from 'react-native';

export default class ListViewPage extends Component {
    static propTypes = {
        ...View.propTypes
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = [];
        for (let i = 0; i < 100; i++) this.data.push(`row ${i}`);
        this.state = {
            dataSource: dataSource.cloneWithRows(this.data),
            isRefreshing: false,
            isLoadingMore: false,
            hasMoreData: true
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                initialListSize={30}
                pageSize={30}
                removeClippedSubviews={true}
                refreshControl={this.renderRefreshControl()}
                onEndReached={this.onEndReached.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
            />
        );
    }

    onEndReached() {
        let {dataSource, isLoadingMore, hasMoreData} = this.state;
        if (isLoadingMore || !hasMoreData)return;
        console.log('onEndReached');
        let dataLength = this.data.length;

        if (dataLength > 500 && this.state.hasMoreData) {
            this.setState({hasMoreData: false});
            return;
        }

        this.setState({isLoadingMore: true, hasMoreData: true});
        for (let i = dataLength; i < dataLength + 100; i++) this.data.push(`row ${i}`);
        setTimeout(()=> {
            let hasMoreData = this.data.length <= 500;
            this.setState({
                isLoadingMore: false,
                dataSource: dataSource.cloneWithRows(this.data),
                hasMoreData: hasMoreData
            });
        }, 2000);
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => this.setState({isRefreshing: false}), 2000);
    }

    renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                tintColor="#ff0033"
                title="Loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
            />
        );
    }

    renderRow(data) {
        return (
            <View style={styles.itemContainer}>
                <Text>{data}</Text>
            </View>
        );
    }

    renderFooter() {
        let {hasMoreData, isLoadingMore} = this.state;
        if (!hasMoreData)
            return (
                <View style={[styles.itemContainer,{justifyContent:'center'}]}>
                    <Text>THE END</Text>
                </View>
            );
        else if (isLoadingMore)
            return (
                <View style={[styles.itemContainer,{justifyContent:'center'}]}>
                    <Text>LOADING MORE</Text>
                </View>
            );
        else return null;
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