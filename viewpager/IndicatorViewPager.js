/**
 * Created by tangzhibin on 16/3/23.
 */

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import ViewPager from './ViewPager'

export default class IndicatorViewPager extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        indicator: PropTypes.node,
        pagerStyle: ViewPropTypes.style,
        autoPlayEnable: PropTypes.bool,
        autoPlayInterval: PropTypes.number,
        horizontalScroll: PropTypes.bool
    }

    static defaultProps = {
        indicator: null,
        initialPage: 0,
        autoPlayInterval: 3000,
        autoPlayEnable: false,
        horizontalScroll: true
    }

    constructor (props) {
        super(props)
        this._onPageScroll = this._onPageScroll.bind(this)
        this._onPageSelected = this._onPageSelected.bind(this)
        this._goToNextPage = this._goToNextPage.bind(this)
        this._renderIndicator = this._renderIndicator.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setPageWithoutAnimation = this.setPageWithoutAnimation.bind(this)
        this._startAutoPlay = this._startAutoPlay.bind(this)
        this._stopAutoPlay = this._stopAutoPlay.bind(this)
        this._currentIndex = props.initialPage
        this._childrenCount = React.Children.count(props.children)
        this.indicatorRef = React.createRef()
        this.viewPagerRef = React.createRef()
    }

    componentDidMount () {
        if (this.props.autoPlayEnable) this._startAutoPlay()
        else this._stopAutoPlay()
    }

    componentDidUpdate (nextProps, nextState) {
        this._childrenCount = React.Children.count(nextProps.children)
        if (this.props.autoPlayEnable !== nextProps.autoPlayEnable) {
            nextProps.autoPlayEnable ? this._startAutoPlay() : this._stopAutoPlay()
        }
    }

    render () {
        return (
            <View style={[styles.container, this.props.style]} >
                <ViewPager
                    {...this.props}
                    horizontalScroll={this.props.horizontalScroll}
                    ref={this.viewPagerRef}
                    style={[styles.pager, this.props.pagerStyle]}
                    onPageScroll={this._onPageScroll}
                    onPageSelected={this._onPageSelected}
                />
                {this._renderIndicator()}
            </View>
        )
    }

    componentWillUnmount () {
        this._stopAutoPlay()
    }

    _onPageScroll (params) {
        let indicator = this.viewPagerRef.current;
        indicator && indicator.onPageScroll && indicator.onPageScroll(params)
        this.props.onPageScroll && this.props.onPageScroll(params)
    }

    _onPageSelected (params) {
        let indicator = this.indicatorRef.current;
        indicator && indicator.onPageSelected && indicator.onPageSelected(params)
        this.props.onPageSelected && this.props.onPageSelected(params)
        this._currentIndex = params.position
    }

    _renderIndicator () {
        let {indicator, initialPage} = this.props
        if (!indicator)return null
        return React.cloneElement(indicator, {
            ref: this.indicatorRef,
            pager: this,
            initialPage: initialPage
        })
    }

    _goToNextPage () {
        let nextIndex = (this._currentIndex + 1) % this._childrenCount
        this.setPage(nextIndex)
    }

    _startAutoPlay () {
        if (this._timerId) clearInterval(this._timerId)
        this._timerId = setInterval(this._goToNextPage, this.props.autoPlayInterval)
    }

    _stopAutoPlay () {
        if (this._timerId) {
            clearInterval(this._timerId)
            this._timerId = null
        }
    }

    setPage (selectedPage) {
        this.viewPagerRef.current.setPage(selectedPage)
    }

    setPageWithoutAnimation (selectedPage) {
        this.viewPagerRef.current.setPageWithoutAnimation(selectedPage)
    }
}

const styles = StyleSheet.create({
    container: {},
    pager: {flex: 1}
})
