require('./styles.scss')
import SldsField from './components/slds-field/slds-field'
import SldsTabs from './components/slds-tabs/slds-tabs'
import SldsTab from './components/slds-tabs/slds-tab'
import SldsAlert from './components/slds-alert/slds-alert'
import SldsDatePicker from './components/slds-datepicker/slds-datepicker'

const VueSlds = {
    install: (Vue) => {
        /* Vue.directive('click-outside',{
            bind: function (el, binding, vNode) {
              el.__vueClickOutside__ = event => {
                if (!el.contains(event.target)) {
                  // call method provided in v-click-outside value
                  vNode.context[binding.expression](event)
                  event.stopPropagation()
                }
              }
              document.body.addEventListener('click', el.__vueClickOutside__)
            },
            unbind: function (el, binding, vNode) {
              // Remove Event Listeners
              document.removeEventListener('click', el.__vueClickOutside__)
              el.__vueClickOutside__ = null
            }
          }) */
        Vue.component('slds-field', SldsField)
        Vue.component('slds-tabs', SldsTabs)
        Vue.component('slds-tab', SldsTab)
        Vue.component('slds-alert', SldsAlert)
        Vue.component('slds-datepicker', SldsDatePicker)
    }
}

export default VueSlds