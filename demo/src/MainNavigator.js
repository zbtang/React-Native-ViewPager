/**
 * Created by tangzhibin on 16/3/21.
 */
import React from 'react'
import XNavigator from './components/common/navigator/XNavigator'
import { HomePage } from './XRoutes'


const MainNavigator = () => {
    return (
        <XNavigator
            showNavigationBar={false}
            initialRoute={HomePage()}
        />
    )
}

export default MainNavigator;