<template lang="pug">
  .demo
    h2 Options
    .options
      label.field
        .label Text
        input(v-model="text")
      label.field
        .label Position
        select(v-model="direction")
          option(value="") default(top)
          option(value="bottom-right") bottom-right
          option(value="bottom") bottom
          option(value="bottom-left") bottom-left
          option(value="right") right
          option(value="left") left
          option(value="top-right") top-right
          option(value="top") top
          option(value="top-left") top-left
      label.field
        .label Color
        select(v-model="color")
          option(value="") default(info)
          option(value="error") error
          option(value="info") info
          option(value="warning") warning
          option(value="success") success
      label.field
        .label Size
        select(v-model="size")
          option(value="") default
          option(value="small") small
          option(value="medium") medium
          option(value="large") large
      label.field
        input(type="checkbox" v-model="always")
        .checkbox-label always
      label.field
        input(type="checkbox" v-model="rounded")
        .checkbox-label rounded
      label.field
        .label Animate
        select(v-model="effect")
          option(value="") default
          option(value="no-animate") no-animate
          option(value="bounce") bounce
    h2 result
    .result
      button(v-hint-css="options") {{text}}
    h2 Code
    pre.code
      code {{code}}
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      text: 'hover me!!!',
      direction: '',
      color: '',
      size: '',
      always: false,
      rounded: false,
      effect: ''
    }
  },

  computed: {
    code () {
      return `<button(v-hint-css="${JSON.stringify(this.options)}") ${this.text}</button>`
    },
    options () {
      let options = {
        text: this.text
      }
      if (this.direction) {
        options.direction = this.direction
      }
      if (this.color) {
        options.color = this.color
      }
      if (this.size) {
        options.size = this.size
      }
      if (this.always) {
        options.always = true
      }
      if (this.rounded) {
        options.rounded = true
      }
      if (this.effect) {
        options.effect = this.effect
      }
      return options
    }
  }
}
</script>

<style lang="sass" scoped>
.options
  display: flex
  flex-flow: wrap

.field
  display: flex
  margin: 10px
  align-items: center
  justify-content: center

  input[type="checkbox"]
    display: none

    + .checkbox-label:before
      display: inline-block
      content: '☐'
      height: 1em
      width: 1em

    &:checked + .checkbox-label:before
      content: '☑'

.label,
.checkbox-label
  display: inline-block
  padding: 3px

.label
  &:after
    content: ':'

.result
  display: flex
  justify-content: center
  align-items: center

.code
  word-wrap: break-word
  word-break: break-all
  white-space: normal
</style>
