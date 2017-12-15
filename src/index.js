let defaultDirective = 'hint-css'
let defaultPrefixClass = 'hint--'
let defaultAttr = 'aria-label'

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
  let map = new WeakMap()

  const getVue = el => {
    if (!map.has(el)) {
      let vue = new Vue({
        data () {
          return {
            text: defaultText,
            direction: defaultDirection,
            color: defaultColor,
            size: defaultSize,
            always: defaultAlways,
            rounded: defaultRounded,
            effect: defaultEffect
          }
        },
        computed: {
          classesObj () {
            let classes = {}
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
          },

          serializedClasses () {
            return JSON.stringify(this.classesAry)
          }
        },
        methods: {
          applyClasses (beforeClasses, afterClasses) {
            let classesToRemove = beforeClasses.filter(a => !afterClasses.find(b => b === a))
            let classesToAdd = afterClasses.filter(a => !beforeClasses.find(b => b === a))
            el.classList.remove(...classesToRemove)
            el.classList.add(...classesToAdd)
          }
        },
        watch: {
          text (val) {
            if (val === null) {
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
      throw new Error('value not set')
    }
    vue.text = value.text || defaultText
    vue.direction = value.direction || defaultDirection
    vue.color = value.color || defaultColor
    vue.size = value.size || defaultSize
    vue.always = value.hasOwnProperty('always') ? Boolean(value.always) : defaultAlways
    vue.rounded = value.hasOwnProperty('rounded') ? Boolean(value.rounded) : defaultRounded
    vue.effect = value.effect || defaultEffect
  }
  Vue.directive(directive, {
    bind: render,
    componentUpdated: render
  })
}

export default hintCss
