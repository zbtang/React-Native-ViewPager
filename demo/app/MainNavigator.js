/**
 * Created by tangzhibin on 16/3/21.
 */

'use strict';

import React, {Component} from 'react-native';
import XNavigator from './components/common/navigator/XNavigator';
import {HomePage} from './XRoutes';

export default class MainNavigator extends Component {

    render() {
        return (
            <XNavigator
                initialRoute={HomePage()}
            />
        );
    }
}