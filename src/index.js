require('./styles.scss');
import SvgSprite from 'vue-svg-sprite';
import SldsField from './components/slds-field';
import SldsAlert from './components/slds-alert'
import SldsDatePicker from './components/slds-datepicker/slds-datepicker'
import SldsRadioGroup from './components/slds-radio-group/slds-radio-group'
import SldsDataTable from './components/slds-data-table/slds-data-table'
import SldsModal from './components/slds-modal'
import SldsAutocomplete from './components/slds-autocomplete'
import SldsIcon from './components/slds-icon';
const VueSlds = {
  install: (Vue, config) => {
    //global plugin variables
    Vue.mixin({
      data() {
        return {
          get $sldsConfig() {
            return config;
          },
        };
      },
    });
    Vue.use(SvgSprite);
    Vue.component('slds-field', SldsField);
    Vue.component('slds-alert', SldsAlert)
    Vue.component('slds-datepicker', SldsDatePicker)
    Vue.component('slds-radio-group', SldsRadioGroup)
    Vue.component('slds-data-table', SldsDataTable)
    Vue.component('slds-modal', SldsModal)
    Vue.component('slds-autocomplete',SldsAutocomplete)
    Vue.component('slds-icon', SldsIcon);
  },
};

export default VueSlds;
