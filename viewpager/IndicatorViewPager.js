/**
 * Created by tangzhibin on 16/3/23.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import ViewPager from './ViewPager';

const VIEWPAGER_REF = 'viewPager';
const INDICATOR_REF = 'indicator';
export default class IndicatorViewPager extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        indicator: PropTypes.node,
        indicatorPosition: PropTypes.string,
        pagerStyle: View.propTypes.style
    };
    static defaultProps = {
        indicator: null,
    indicatorPosition: 'bottom',
        initialPage: 0
    };

    render() {

        const container = (
            <ViewPager
                {...this.props}
                key="ivp-container"
                ref={VIEWPAGER_REF}
                style={[styles.pager, this.props.pagerStyle]}
                onPageScroll={this._onPageScroll.bind(this)}
                onPageSelected={this._onPageSelected.bind(this)}
            />
        );

        const indicator = (
            <View key="ivp-indicator">
                {this._renderIndicator()}
            </View>
        );

        const orderedViews = this.props.indicatorPosition == 'top' ? [indicator, container] : [container, indicator];

        return (
            <View style={[styles.container, this.props.style]}>
                {orderedViews}
            </View>
        );
    }

    _onPageScroll(params) {
        let indicator = this.refs[INDICATOR_REF];
        indicator && indicator.onPageScroll && indicator.onPageScroll(params);
        this.props.onPageScroll && this.props.onPageScroll(params);
    }

    _onPageSelected(params) {
        let indicator = this.refs[INDICATOR_REF];
        indicator && indicator.onPageSelected && indicator.onPageSelected(params);
        this.props.onPageSelected && this.props.onPageSelected(params);
    }

    _renderIndicator() {
        let {indicator, initialPage}=this.props;
        if (!indicator)return null;
        return React.cloneElement(indicator, {
            ref: INDICATOR_REF,
            pager: this,
            initialPage: initialPage
        });
    }

    setPage(selectedPage) {
        this.refs[VIEWPAGER_REF].setPage(selectedPage);
    }

    setPageWithoutAnimation(selectedPage) {
        this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
    }
}
const styles = StyleSheet.create({
    container: {},
    pager: {
        flex: 1
    }
});
