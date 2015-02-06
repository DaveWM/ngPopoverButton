# ngPopoverButton [![Build Status](https://travis-ci.org/DaveWM/ngPopoverButton.svg)](https://travis-ci.org/DaveWM/ngPopoverButton) [![bitHound Score](https://www.bithound.io/DaveWM/ngPopoverButton/badges/score.svg)](https://www.bithound.io/DaveWM/ngPopoverButton)
ngPopoverButton is a directive for a button that shows a popover when clicked. 
The main attaction of this directive is that the content is compiled in the scope of the parent controller,
so it is completely dynamic, and you can have any bindings you want in it.

This should be possible using the UI bootstrap popover directive, but currently isn't due to 
[this bug](https://github.com/angular-ui/bootstrap/issues/220#issuecomment-68443640),
which was opened almost 2 years ago.

You can see a demo [here](http://embed.plnkr.co/d56XSJoJJfpMm2XyYZC9/preview)

>**Important Note** This directive is not compatible with angular 1.2.x, because of [a bug with nested transclusion](https://github.com/angular/angular.js/issues/6435).
>You need to use angular 1.3.0 or later.

## Using ngPopoverButton
To install ngPopoverButton:
- run `bower install ng-popover-button`
- add references to the script and css files
- add the angular module as a dependency, e.g. `angular.module('app', ['ngPopoverButton']);`

The directive is used as follows:
```html
<popover-button placement="left" button-text="A Button" button-icon="fa-thumbs-up" on-close="onClose()" on-open="onOpen()">
  <title> Title </title>
  <content> This is the content, binding has value: {{binding}} </content>
</popover-button>
```

## Attributes

| Attribute | Type | Description |
|-----------|-------|------------|
| `button-text` | string | The button text |
| `button-icon` | string | An icon to display in the button. You need to have font awesome installed to use this |
| `placement` | string | Determines where the popover shows up, relative to the button. Can be `top`, `bottom`, `right` or `left`. |
| `on-open` | function | Function to execute when popover opens |
| `on-close` | function  | Function to execute when the popover closes |

## Dependencies
- [UI Bootstrap](http://angular-ui.github.io/bootstrap/)
- [Bootstrap](http://getbootstrap.com/) (css only)
