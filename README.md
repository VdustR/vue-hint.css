# vue-hint.css

> Vue directive for [hint.css](https://github.com/chinchang/hint.css)

[![GitHub stars](https://img.shields.io/github/stars/VdustR/vue-hint.css.svg?style=flat-square)](https://github.com/VdustR/vue-hint.css/stargazers)
[![GitHub license](https://img.shields.io/npm/dt/vp-vue-hint.css.svg?style=flat-square)](https://www.npmjs.com/package/vp-vue-hint.css)
[![GitHub license](https://img.shields.io/github/license/VdustR/vue-hint.css.svg?style=flat-square)](https://github.com/VdustR/vue-hint.css/blob/master/LICENSE.md)

## Install

### npm

```text
npm install -D vp-vue-hint.css
```

```javascript
import Vue from 'vue'
import vueHintCss from 'vp-vue-hint.css'
Vue.use(vueHintCss)
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/hint.css"></link>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/vp-vue-hint.css"></script>
<script>
  Vue.use(vueHintCss)
</script>
```

## Usage

Check codepen [example](https://codepen.io/VdustR/pen/RxPOyG).

### Basic

```html
<button v-hint-css="'hover me!!!'">
```

### Modifiers

With Modifiers:

```html
<button v-hint-css.right.warning.small.bounce.always.rounded="options">
```

Modifiers First:

> With modifier `.static`, modifiers will have higher priority than options.

```html
<button v-hint-css.right.warning.small.bounce.always.rounded.static="options">
```

### Advanced

```html
<template>
  <button v-hint-css="options">
</template>
<script>
  export default {
    data () {
      return {
        options: {
          text: null,
            //               (default)
            // 'top-left'      'top'     'top-right'
            // 'left'                        'right'
            // 'bottom-left' 'bottom' 'bottom-right'
          direction: null,
          color: null, // 'error', 'info'(default), 'warning', 'success'
          size: null, // 'small', 'medium', 'large'
          always: false,
          rounded: false,
          effect: null // 'no-animate', 'bounce'
        }
      }
    }
  }
</script>
```

## Plugin options

```javascript
Vue.use(vueHintCss, {
  directive: 'hint-css',
  prefixClass: 'hint--',
  attr: 'aria-label' // or 'data-hint'
})
```

### Default values

```javascript
Vue.use(vueHintCss, {
  defaultText: 'Default Text',
  defaultDirection: 'bottom',
  defaultColor: 'warning',
  defaultSize: 'large',
  defaultAlways: true,
  defaultRounded: true,
  defaultEffect: 'bounce'
})
```

Default values are reactive:

```javascript
import vueHintCss, {defaultOptions} from 'vp-vue-hint.css'

Vue.use(vueHintCss)
defaultOptions.text: 'Default Text',
defaultOptions.direction: 'bottom',
defaultOptions.color: 'warning',
defaultOptions.size: 'large',
defaultOptions.always: true,
defaultOptions.rounded: true,
defaultOptions.effect: 'bounce'
```
