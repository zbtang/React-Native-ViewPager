declare module 'rn-viewpager' {

    import * as React from 'react';
    import { ImageURISource, ViewProperties, NativeScrollEvent, NativeSyntheticEvent, ViewPagerAndroidOnPageScrollEventData } from 'react-native';

    interface ViewPagerProps extends  ViewProperties {
      initialPage?: number;
      keyboardDismissMode?: 'none' | 'on-drag';
      onPageScroll?(e: ViewPagerAndroidOnPageScrollEventData): void;
      onPageScrollStateChanged?(state: 'idle' | 'settling' | 'dragging'): void;
      onPageSelected?(e: ViewPagerAndroidOnPageScrollEventData): void;
      scrollEnabled?: boolean;
    }

    export class ViewPager extends React.Component<ViewPagerProps> {
      setPage(selectedPage: number): void;
      setPageWithoutAnimation(selectedPage: number): void;
    }

    interface IndicatorViewPagerProps extends ViewProperties {
      indicator: React.ReactNode;
      pagerStyle?: ViewProperties['style'];
      autoPlayEnable?: boolean;
      autoPlayInterval?: boolean;
      horizontalScroll?: boolean;

    }
    export class IndicatorViewPager extends React.Component<IndicatorViewPagerProps> {
      setPage(selectedPage: number): void;
      setPageWithoutAnimation(selectedPage: number): void;
    }

    interface PagerDotIndicatorProps extends ViewProperties {
      pageCount: number;
      dotStyle?: ViewProperties['style'];
      selectedDotStyle?: ViewProperties['style'];
      hideSingle?: boolean;
    }

    export class PagerDotIndicator extends React.Component<PagerDotIndicatorProps> {}

    interface PageTitleIndicatorProps extends ViewProperties {
      titles: string[];
      trackScroll?: boolean;
      itemStyle?: ViewProperties['style'];
      itemTextStyle?: ViewProperties['style'];
      selectedItemTextStyle?: ViewProperties['style'];
      selectedBorderStyle?: ViewProperties['style'];
      renderTitle(index: number, title: string, isSelected: boolean): JSX.Element;
    }
    export class PagerTitleIndicator extends React.Component<PageTitleIndicatorProps> {}

    interface PagerTabIndicatorProps extends ViewProperties {
      tabs: Array<{
        text: string,
        iconSource: ImageURISource,
        selectedIconSource: ImageURISource
      }>;
      itemStyle?: ViewProperties['style'];
      selectedItemStyle?: ViewProperties['style'];
      iconStyle?: ViewProperties['style'];
      selectedIconStyle?: ViewProperties['style'];
      textStyle?: ViewProperties['style'];
      selectedTextStyle?: ViewProperties['style'];
      changePageWithAnimation?: boolean;
    }

    export class PagerTabIndicator extends React.PureComponent<PagerTabIndicatorProps> {}
  }
