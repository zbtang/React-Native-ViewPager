/**
 * Created by tangzhibin on 16/3/21.
 */
'use strict'
import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from './Colors'
import Layout from './Layout'
import XNavBarStyle from './XNavBarStyle'

let XNavigatorStyles = StyleSheet.create({
    navigator: {},
    scene: {
        backgroundColor: 'white'
    },
    bar: {
        backgroundColor: '#F6F6F6',
        borderBottomWidth: Layout.pixel,
        borderBottomColor: '#B2B2B2'
    },
    barTitle: {
        height: XNavBarStyle.General.NavBarHeight,
        justifyContent: 'center'
    },
    barTitleText: {
        fontSize: 18,
        color: '#333333'
    },
    barButtonIcon: {
        tintColor: Colors.tint
    },
    barButtonText: {
        color: Colors.tint,
        fontSize: 17
    },
    barRightButton: {
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: XNavBarStyle.General.NavBarHeight

    },
    barRightButtonText: {
        marginLeft: 5
    },
    barRightButtonIcon: {
        tintColor: undefined,
        width: 20,
        height: 20
    },
    barBackButton: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: XNavBarStyle.General.NavBarHeight
    },
    barBackButtonText: {
        marginLeft: 5
    }
})

XNavigatorStyles.barButtonPressRetentionOffset = {
    top: 40,
    left: 60,
    right: 60,
    bottom: 80
}
export default XNavigatorStyles