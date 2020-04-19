/**
 * Created by tangzhibin on 16/3/21.
 */
'use strict'
import React from 'react'
import { StyleSheet, Image } from 'react-native'

export class BackIcon extends React.Component {
    static propTypes = Image.propTypes

    render () {
        return (
            <Image
                style={[styles.backIcon, this.props.style]}
                source={require('./imgs/ic_back.png')}
                resizeMode={'contain'}
            />
        )
    }
}

const styles = StyleSheet.create({
    backIcon: {
        width: 10,
        height: 18
    }
})