
# WaitDialog
## waitdialog@1.0.0

A marketplace component for loading screens.

## Installation: 
- Open the **Marketplace - beta** on the right corner at Smartface IDE & download **waitdialog**

## Features:
- Activity Indicator
- Gif Indicator
- Image Indicator

## Usage : 

- You need to require it on the page you want to use first.
```javascript
const WaitDialog = require("sf_modules/components/WaitDialog");
```
- Then you want to show it on the screen.
```javascript
WaitDialog.show();
```
- Lastly you need to hide it.
```javascript
WaitDialog.hide();
```

## Remarks

> **IMPORTANT NOTE** : Initializing **waitdialog** on the constructor might cause unexpected errors and styles for **waitdialog** will not be applied, because the component is not in the context. Make your implementation in `onShow()` or `onLoad()` methods on the page.

## Theming and customization

> The default theme implementation is under `/themes/baseTheme/styles/waitdialog.json` file. DO NOT make changes on this file.

> To change the themes as you like, simply create `themes/${selectedTheme}/styles/waitdialog.json` with your changed styles. You can find best practices for theming under [smartface documentations.](https://developer.smartface.io/docs/using-themes-in-apps)

## Update
- Run `npm install` under scripts directory. Running `npm update` WILL NOT sync the package with the npm.

## Feedback
* [File an issue](https://github.com/smartface/sf-component-waitdialog/issues)
* Follow [@smartface](https://twitter.com/smartface_io) and let us know what you think!

Author: alim.oncul@smartface.io generated by **smartface** 2019.
    
