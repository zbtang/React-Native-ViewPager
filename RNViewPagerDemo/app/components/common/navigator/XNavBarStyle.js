/**
 * Created by tangzhibin on 15/12/29.
 */

'use strict'

import React from 'react'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'

let buildStyleInterpolator = require('buildStyleInterpolator')
let merge = require('merge')

const SCREEN_WIDTH = Dimensions.get('window').width
const NAV_BAR_HEIGHT = 44
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
const NAV_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT : NAV_BAR_HEIGHT

let BASE_STYLES = {
    Title: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT,
        left: 0,
        right: 0,
        alignItems: 'center',
        height: NAV_BAR_HEIGHT,
        backgroundColor: 'transparent'
    },
    LeftButton: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT,
        left: 0,
        overflow: 'hidden',
        opacity: 1,
        height: NAV_BAR_HEIGHT,
        backgroundColor: 'transparent'
    },
    RightButton: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT,
        right: 0,
        overflow: 'hidden',
        opacity: 1,
        alignItems: 'flex-end',
        height: NAV_BAR_HEIGHT,
        backgroundColor: 'transparent'
    }
}

let Stages = {
    Left: {
        Title: merge(BASE_STYLES.Title, {left: -SCREEN_WIDTH / 2, opacity: 0}),
        LeftButton: merge(BASE_STYLES.LeftButton, {left: -SCREEN_WIDTH / 3, opacity: 0}),
        RightButton: merge(BASE_STYLES.RightButton, {left: SCREEN_WIDTH / 3, opacity: 0})
    },
    Center: {
        Title: merge(BASE_STYLES.Title, {left: 0, opacity: 1}),
        LeftButton: merge(BASE_STYLES.LeftButton, {left: 0, opacity: 1}),
        RightButton: merge(BASE_STYLES.RightButton, {left: 2 * SCREEN_WIDTH / 3 - 0, opacity: 1})
    },
    Right: {
        Title: merge(BASE_STYLES.Title, {left: SCREEN_WIDTH / 2, opacity: 0}),
        LeftButton: merge(BASE_STYLES.LeftButton, {left: 0, opacity: 0}),
        RightButton: merge(BASE_STYLES.RightButton, {left: SCREEN_WIDTH, opacity: 0})
    }
}

let opacityRatio = 100

function buildSceneInterpolators (startStyles, endStyles) {
    return {
        Title: buildStyleInterpolator({
            opacity: {
                type: 'linear',
                from: startStyles.Title.opacity,
                to: endStyles.Title.opacity,
                min: 0,
                max: 1
            },
            left: {
                type: 'linear',
                from: startStyles.Title.left,
                to: endStyles.Title.left,
                min: 0,
                max: 1,
                extrapolate: true
            }
        }),
        LeftButton: buildStyleInterpolator({
            opacity: {
                type: 'linear',
                from: startStyles.LeftButton.opacity,
                to: endStyles.LeftButton.opacity,
                min: 0,
                max: 1,
                round: opacityRatio
            },
            left: {
                type: 'linear',
                from: startStyles.LeftButton.left,
                to: endStyles.LeftButton.left,
                min: 0,
                max: 1
            }
        }),
        RightButton: buildStyleInterpolator({
            opacity: {
                type: 'linear',
                from: startStyles.RightButton.opacity,
                to: endStyles.RightButton.opacity,
                min: 0,
                max: 1,
                round: opacityRatio
            },
            left: {
                type: 'linear',
                from: startStyles.RightButton.left,
                to: endStyles.RightButton.left,
                min: 0,
                max: 1,
                extrapolate: true
            }
        })
    }
}

let Interpolators = {
    RightToCenter: buildSceneInterpolators(Stages.Right, Stages.Center),
    CenterToLeft: buildSceneInterpolators(Stages.Center, Stages.Left),
    RightToLeft: buildSceneInterpolators(Stages.Right, Stages.Left)
}

let XNavBarStyle = {
    General: {
        NavBarHeight: NAV_BAR_HEIGHT,
        StatusBarHeight: STATUS_BAR_HEIGHT,
        TotalNavHeight: NAV_HEIGHT
    },
    Interpolators,
    Stages
}
export default XNavBarStyle