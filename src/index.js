let defaultDirective = 'hint-css'
let defaultPrefixClass = 'hint--'
let defaultAttr = 'aria-label'

let defaultStaticModifier = 'static'

const directions = [
  'bottom-right',
  'bottom',
  'bottom-left',
  'right',
  'left',
  'top-right',
  'top',
  'top-left'
]
const colors = [
  'error',
  'info',
  'warning',
  'success'
]
const sizes = [
  'small',
  'medium',
  'large'
]
const extra = [
  'always',
  'rounded',
]
const effects = [
  'no-animate',
  'bounce'
]
const defaultText = null
const defaultDirection = 'top'
const defaultColor = 'info'
const defaultSize = null
const defaultAlways = false
const defaultRounded = false
const defaultEffect = null

let hintCss = {}

hintCss.install = function (Vue, options) {
  let directive = options ? options.directive || defaultDirective : defaultDirective
  let prefixClass = options ? options.prefixClass || defaultPrefixClass : defaultPrefixClass
  let attr = options ? options.attr || defaultAttr : defaultAttr
  let staticModifier = options ? options.staticModifier || defaultStaticModifier : defaultStaticModifier
  let map = new WeakMap()

  const getVue = el => {
    if (!map.has(el)) {
      let vue = new Vue({
        data () {
          return {
            value: {},
            modifiers: []
          }
        },
        computed: {
          text () {
            let str = String(this.value.text)
            if (str === '') return str
            if (!this.value.text) return defaultText
            return str
          },
          hasText () {
            if (this.text === '') return true
            if (!this.text) return false
            return true
          },
          directionFromModifier () {
            let effectiveDirections = directions.filter(direction => this.modifiers.includes(direction))
            if (effectiveDirections.length === 0) {
              return null
            }
            return effectiveDirections[0]
          },
          directionFromValue () {
            let direction = directions.find(direction => this.value.direction === direction) || null
            return direction
          },
          direction () {
            if (this.static) {
              return this.directionFromModifier || this.directionFromValue || defaultDirection
            }
            return this.directionFromValue || this.directionFromModifier || defaultDirection
          },
          colorFromModifier () {
            let effectiveColors = colors.filter(color => this.modifiers.includes(color))
            if (effectiveColors.length === 0) {
              return null
            }
            return effectiveColors[0]
          },
          colorFromValue () {
            let color = colors.find(color => this.value.color === color) || null
            return color
          },
          color () {
            if (this.static) {
              return this.colorFromModifier || this.colorFromValue || defaultColor
            }
            return this.colorFromValue || this.colorFromModifier || defaultColor
          },
          sizeFromModifier () {
            let effectiveSizes = sizes.filter(size => this.modifiers.includes(size))
            if (effectiveSizes.length === 0) {
              return null
            }
            return effectiveSizes[0]
          },
          sizeFromValue () {
            let size = sizes.find(size => this.value.size === size) || null
            return size
          },
          size () {
            if (this.static) {
              return this.sizeFromModifier || this.sizeFromValue || defaultSize
            }
            return this.sizeFromValue || this.sizeFromModifier || defaultSize
          },
          alwaysFromModifier () {
            return this.modifiers.includes('always') ? true : null
          },
          alwaysFromValue () {
            return this.value.hasOwnProperty('always') ? Boolean(this.value.always) : null
          },
          always () {
            if (this.static) {
              if (this.alwaysFromModifier !== null) return this.alwaysFromModifier
              if (this.alwaysFromValue !== null) return this.alwaysFromValue
            } else {
              if (this.alwaysFromValue !== null) return this.alwaysFromValue
              if (this.alwaysFromModifier !== null) return this.alwaysFromModifier
            }
            return defaultAlways
          },
          roundedFromModifier () {
            return this.modifiers.includes('rounded') ? true : null
          },
          roundedFromValue () {
            return this.value.hasOwnProperty('rounded') ? Boolean(this.value.rounded) : null
          },
          rounded () {
            if (this.static) {
              if (this.roundedFromModifier !== null) return this.roundedFromModifier
              if (this.roundedFromValue !== null) return this.roundedFromValue
            } else {
              if (this.roundedFromValue !== null) return this.roundedFromValue
              if (this.roundedFromModifier !== null) return this.roundedFromModifier
            }
            return defaultRounded
          },
          effectFromModifier () {
            let effectiveEffects = effects.filter(effect => this.modifiers.includes(effect))
            if (effectiveEffects.length === 0) {
              return null
            }
            return effectiveEffects[0]
          },
          effectFromValue () {
            let effect = effects.find(effect => this.value.effect === effect) || null
            return effect
          },
          effect () {
            if (this.static) {
              return this.effectFromModifier || this.effectFromValue || defaultEffect
            }
            return this.effectFromValue || this.effectFromModifier || defaultEffect
          },
          static () {
            return this.modifiers.includes(staticModifier)
          },
          classesObj () {
            let classes = {}
            if (!this.hasText) {
              return classes
            }
            classes[this.direction] = true
            classes[this.color] = true
            if (this.size) {
              classes[this.size] = true
            }
            if (this.always) {
              classes['always'] = true
            }
            if (this.rounded) {
              classes['rounded'] = true
            }
            if (this.effect) {
              classes[this.effect] = true
            }
            return classes
          },
          classesAry () {
            return Object.keys(this.classesObj).map(name => prefixClass.concat(name))
          }
        },
        methods: {
          applyClasses (beforeClasses, afterClasses) {
            let classesToRemove = beforeClasses.filter(a => !afterClasses.find(b => b === a))
            el.classList.remove(...classesToRemove)
            el.classList.add(...afterClasses)
          }
        },
        watch: {
          text (val) {
            if (!this.hasText) {
              el.removeAttribute(attr)
              return
            }
            el.setAttribute(attr, val)
          },
          classesAry (after, before) {
            this.applyClasses(before, after)
          }
        },
        created () {
          this.applyClasses([], this.classesAry)
        }
      })
      map.set(el, vue)
      return vue
    }
    return map.get(el)
  }

  const render = (el, binding) => {
    let vue = getVue(el)
    let value = binding.value
    if (!value) {
      value = {}
    }
    if (typeof value === 'string') {
      value = {
        text: value
      }
    }
    let modifiers = Object.keys(binding.modifiers)
    vue.value = value
    vue.modifiers = modifiers
  }
  Vue.directive(directive, {
    bind: render,
    componentUpdated: render
  })
}

export default hintCss
