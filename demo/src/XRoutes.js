'use strict'

export function HomePage () {
    return {
        getTitle: () => 'Home Page',
        getSceneClass: () => require('./pages/HomePage').default
    }
}
export function TabIndicatorPage () {
    return {
        getTitle: () => 'Tab Indicator',
        getSceneClass: () => require('./pages/TabIndicatorPage').default
    }
}
export function TitleIndicatorPage () {
    return {
        getTitle: () => 'Title Indicator',
        getSceneClass: () => require('./pages/TitleIndicatorPage').default
    }
}
export function DotIndicatorPage () {
    return {
        getTitle: () => 'Dot Indicator',
        getSceneClass: () => require('./pages/DotIndicatorPage').default
    }
}