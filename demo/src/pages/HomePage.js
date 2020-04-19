/**
 * Created by tangzhibin on 16/3/21.
 */
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const HomePage = ({navigation}) => {
    function renderItem(text, bgColor, shapeStyle, route) {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, {backgroundColor: bgColor}]}
                onPress={() => navigation.navigate(route)}
                activeOpacity={0.6}
            >
                <View style={[styles.shapeBase, shapeStyle]} />
                <Text style={styles.itemTxt} >{text}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container} >
            {renderItem('D.O.T', 0xF1B136FF, styles.circle, "Dot Indicator")}
            {renderItem('T.I.T.L.E', 0x13B0A5FF, styles.square, "Title Indicator")}
            {renderItem('T.A.B', 0xEF6363FF, styles.triangle, "Tab Indicator")}
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTxt: {
        color: 'white',
        fontSize: 28,
        marginTop: 10
    },
    shapeBase: {
        width: 60,
        height: 60,
        backgroundColor: 'white'
    },
    square: {},
    circle: {
        borderRadius: 30
    },
    triangle: {
        borderTopWidth: 0,
        borderRightWidth: 32,
        borderBottomWidth: 60,
        borderLeftWidth: 32,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'white',
        backgroundColor: 'transparent',
        width: 64
    }
})