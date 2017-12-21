<template lang="pug">
  .demo
    h2 Options
    .options
      label.field
        input(type="checkbox" v-model="sentText")
        .checkbox-label
        .label Text
        input(v-model="text")
      label.field
        input(type="checkbox" v-model="passText")
        .checkbox-label passText
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
        .label Always
        select(v-model="alwaysSerialized")
          option(value="null") default (false)
          option(value="false") false
          option(value="true") true
      label.field
        .label Rounded
        select(v-model="roundedSerialized")
          option(value="null") default (false)
          option(value="false") false
          option(value="true") true
      label.field
        .label Effect
        select(v-model="effect")
          option(value="") default
          option(value="no-animate") no-animate
          option(value="bounce") bounce
    h3 Modifiers
    h4 Options First
    .result
      button(v-hint-css.right.warning.small.bounce.always.rounded="value") {{text}}
    h4 Modifiers First
    .result
      button(v-hint-css.right.warning.small.bounce.always.rounded.static="value") {{text}}
    h3 Reactive
    .result
      button(v-hint-css="value") {{text}}
    h3 v-hint-css
    pre.code
      code {{JSON.stringify(this.value)}}
</template>

<script>
const options = {
  data () {
    return {
      sentText: true,
      text: 'hover me!!!',
      direction: '',
      color: '',
      size: '',
      alwaysSerialized: 'null',
      roundedSerialized: 'null',
      effect: '',
      passText: false
    }
  },

  computed: {
    always () {
      return eval(this.alwaysSerialized)
    },
    rounded () {
      return eval(this.roundedSerialized)
    },
    options () {
      let options = {
        text: this.textPassed
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
      if (this.always !== null) {
        options.always = this.always
      }
      if (this.rounded !== null) {
        options.rounded = this.rounded
      }
      if (this.effect) {
        options.effect = this.effect
      }
      return options
    },
    textPassed () {
      if (!this.sentText) {
        return null
      }
      return this.text
    },
    value () {
      if (this.passText) {
        return this.textPassed
      }
      return this.options
    }
  }
}

export default {
  name: 'app',
  ...options
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
