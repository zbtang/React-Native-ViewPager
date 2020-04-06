# React-Native-ViewPager-Handy - Updated Version

[![npm](https://img.shields.io/npm/v/rn-viewpager-handy.svg?style=plastic)](https://npmjs.org/package/rn-viewpager-handy) [![npm](https://img.shields.io/npm/dm/rn-viewpager.svg?style=plastic)](https://npmjs.org/package/rn-viewpager-handy) [![npm](https://img.shields.io/npm/dt/rn-viewpager-handy.svg?style=plastic)](https://npmjs.org/package/rn-viewpager-handy)

This repo is updated version from https://github.com/zbtang/React-Native-ViewPager

ViewPager and Indicator component for react-native on both android and ios. ViewPager's props is the same as [ViewPagerAndroid](https://facebook.github.io/react-native/docs/viewpagerandroid.html#content).

<p>
    <img src="./imgs/ad.png" width="1024">
</p>

## Linking - React Native ViewPager Handy:

### >= 0.60

Autolinking will just do the job.

### < 0.60

#### Mostly automatic

`react-native link @react-native-community/viewpager`

#### Manual linking

<details>
<summary>Manually link the library on iOS</summary>
</br>

Follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-viewpager', :path => '../node_modules/@react-native-community/viewpager'
```

</details>

<details>
<summary>Manually link the library on Android</summary>
</br>
Make the following changes:

#### `android/settings.gradle`

```groovy
include ':@react-native-community_viewpager'
project(':@react-native-community_viewpager').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/viewpager/android')
```

#### `android/app/build.gradle`

```groovy
dependencies {
   ...
   implementation project(':@react-native-community_viewpager')
}
```

#### `android/app/src/main/.../MainApplication.java`

On top, where imports are:

```java
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
```

Add the `RNCViewPagerPackage` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new RNCViewPagerPackage()
  );
}
```

</details>

## Features

- unify \<ViewPagerAndroid\> and \<ScrollView pagingEnabled={true}\> to \<ViewPager\>, add offer same props as [ViewPagerAndroid](https://facebook.github.io/react-native/docs/viewpagerandroid.html#content).
- \<IndicatorViewPager\> component support render indicator
- implement common indicator: DotIndicator, TitleIndicator and TabIndicator

## Preview

<p>
    <img src="./imgs/dotIndicator.gif" width="256" />
    <img src="./imgs/titleIndicator.gif" width="256" />
    <img src="./imgs/tabIndicator.gif" width="256" />
</p>

## Build and run the demo

```
cd RNViewPagerDemo/
npm install
react-native run-ios
```

## Component API

[`<ViewPager />` Component API](docs/viewpager.md)

[`<IndicatorViewPager />` Component API](docs/indicatorviewpager.md)

[`<PagerDotIndicator />` Component API](docs/dotindicator.md)

[`<PagerTabIndicator />` Component API](docs/tabindicator.md)

[`<PagerTitleIndicator />` Component API](docs/titleindicator.md)

## Usage

### Install from npm:

`npm install --save rn-viewpager-handy`

### Integrate into your app:

```jsx
import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";
import {
  PagerTabIndicator,
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator
} from "rn-viewpager-handy";

export default class ViewPagerPage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          style={{ height: 200 }}
          indicator={this._renderDotIndicator()}
        >
          <View style={{ backgroundColor: "cadetblue" }}>
            <Text>page one</Text>
          </View>
          <View style={{ backgroundColor: "cornflowerblue" }}>
            <Text>page two</Text>
          </View>
          <View style={{ backgroundColor: "#1AA094" }}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>

        <IndicatorViewPager
          style={{ flex: 1, paddingTop: 20, backgroundColor: "white" }}
          indicator={this._renderTitleIndicator()}
        >
          <View style={{ backgroundColor: "cadetblue" }}>
            <Text>page one</Text>
          </View>
          <View style={{ backgroundColor: "cornflowerblue" }}>
            <Text>page two</Text>
          </View>
          <View style={{ backgroundColor: "#1AA094" }}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>

        <IndicatorViewPager
          style={{ flex: 1, paddingTop: 20, backgroundColor: "white" }}
          indicator={this._renderTabIndicator()}
        >
          <View style={{ backgroundColor: "cadetblue" }}>
            <Text>page one</Text>
          </View>
          <View style={{ backgroundColor: "cornflowerblue" }}>
            <Text>page two</Text>
          </View>
          <View style={{ backgroundColor: "#1AA094" }}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>
      </View>
    );
  }

  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={["one", "two", "three"]} />;
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  _renderTabIndicator() {
    let tabs = [
      {
        text: "Home",
        iconSource: require("../imgs/ic_tab_home_normal.png"),
        selectedIconSource: require("../imgs/ic_tab_home_click.png")
      },
      {
        text: "Message",
        iconSource: require("../imgs/ic_tab_task_normal.png"),
        selectedIconSource: require("../imgs/ic_tab_task_click.png")
      },
      {
        text: "Profile",
        iconSource: require("../imgs/ic_tab_my_normal.png"),
        selectedIconSource: require("../imgs/ic_tab_my_click.png")
      }
    ];
    return <PagerTabIndicator tabs={tabs} />;
  }
}
```

## Note

When use this lib in ListView header on android platform, please add `removeClippedSubviews={false}` prop to your ListView.

## Credit:

this repo package's credit from https://github.com/zbtang/React-Native-ViewPager
