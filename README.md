# vue-hint.css

> Vue directive for [hint.css](https://kushagragour.in/lab/hint/)

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
          color: null, // 'error', 'info'(default),'warning', 'success'
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
