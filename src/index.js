require('./styles.scss')
import SldsField from './components/slds-field/slds-field'
import SldsTabs from './components/slds-tabs/slds-tabs'
import SldsTab from './components/slds-tabs/slds-tab'
import SldsAlert from './components/slds-alert/slds-alert'

const VueSlds = {
    install: (Vue) => {
        Vue.component('slds-field', SldsField)
        Vue.component('slds-tabs', SldsTabs)
        Vue.component('slds-tab', SldsTab)
        Vue.component('slds-alert',SldsAlert)
    }
}

export default VueSlds