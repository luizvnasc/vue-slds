require('./styles.scss')
import SldsField from './components/slds-field/slds-field'
import SldsTabs from './components/slds-tabs/slds-tabs'
import SldsTab from './components/slds-tabs/slds-tab'
import SldsAlert from './components/slds-alert/slds-alert'
import SldsDatePicker from './components/slds-datepicker/slds-datepicker'
import SldsRadioGroup from './components/slds-radio-group/slds-radio-group'

const VueSlds = {
    install: (Vue) => {
        
        Vue.component('slds-field', SldsField)
        Vue.component('slds-tabs', SldsTabs)
        Vue.component('slds-tab', SldsTab)
        Vue.component('slds-alert', SldsAlert)
        Vue.component('slds-datepicker', SldsDatePicker)
        Vue.component('slds-radio-group', SldsRadioGroup)
    }
}

export default VueSlds