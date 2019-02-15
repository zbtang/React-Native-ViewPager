# <ViewPager /> Component Api


| Prop | Type | Default | Note |
| --- | --- | --- | --- |
| initialPage | number | 0 |  Index of initial page that should be selected. |
| keyboardDismissMode | enum('none', "on-drag")  | on-drag | Determines whether the keyboard gets dismissed in response to a drag. - 'none' , drags do not dismiss the keyboard. - 'on-drag'(the default), the keyboard is dismissed when a drag begins. |
| onPageScroll | function |  |  |
| onPageScrollStateChanged | function |  |  |
| onPageSelected | function |  |  |
| horizontalScroll | bool | true |  |
| scrollEnabled | bool | true | To disable/enable scroll


| Method | Params | Default | Note |
| --- | --- | --- | --- |
| setPage | selectedPageIndex |  |  |
| setPageWithoutAnimation | selectedPageIndex |  |  |


