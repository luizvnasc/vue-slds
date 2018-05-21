<template>
    <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right" 
    :class="{'slds-dropdown-trigger_click slds-is-open': isOpen}">
      <input type="text" id="date-input-id" placeholder=" " class="slds-input" v-model="date" @blur="updateValue()"/>
      <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" :title="config.i18n.tip" @click="openDialog()">
        <event-icon class="slds-button__icon" aria-hidden="true"/>
        <span class="slds-assistive-text">{{config.i18n.tip}}</span>
      </button>
      <div v-if="isOpen" v-click-outside="closeDialog" aria-hidden="false" aria-label="Date picker: June" class="slds-datepicker slds-dropdown slds-dropdown_left" role="dialog">
      <div class="slds-datepicker__filter slds-grid">
        <div class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
          <div class="slds-align-middle">
            <button class="slds-button slds-button_icon slds-button_icon-container" :title="config.i18n.previous_month" @click="previous()">
              <left-icon class="slds-button__icon" aria-hidden="true"/>
              <span class="slds-assistive-text">{{config.i18n.previous_month}}</span>
            </button>
          </div>
          <h2 aria-atomic="true" aria-live="assertive" class="slds-align-middle" id="month">{{currentMonthName}}</h2>
          <div class="slds-align-middle">
            <button class="slds-button slds-button_icon slds-button_icon-container" :title="config.i18n.next_month" @click="next()">
              <right-icon class="slds-button__icon" aria-hidden="true"/>
              <span class="slds-assistive-text">{{config.i18n.next_month}}</span>
            </button>
          </div>
        </div>
        <div class="slds-shrink-none">
          <label class="slds-assistive-text" for="select-01">{{config.i18n.pick_year}}</label>
          <div class="slds-select_container">
            <select class="slds-select" id="select-01" v-model="year">
              <option v-for="year in years" :key="year" :value="year">{{year}}</option>
            </select>
          </div>
        </div>
      </div>
      <slds-month-table v-model="value" :month="month" :year="year"/>
    </div>
</template>
<script>
import eventIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?event";
import leftIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?left";
import rightIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?right";
import _ from "lodash";
import moment from "moment";
import ClickOutside from "vue-click-outside";
import SldsMonthTable from './slds-month-table';
import VMasker from 'vanilla-masker'
export default {
  directives: { ClickOutside },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          i18n: {
            tip: "Select a date",
            next_month: "Next Month",
            previous_month: "Previous Month",
            pick_year: "Pick a Year",
            months: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          }
        };
      }
    },
    format:{
      type:String,
      default: 'MM/DD/YYYY'
    },
    value: {
      type: Date,
      default: () =>{ return new Date()}
    }
  },
  components: {
    "event-icon": eventIcon,
    "left-icon": leftIcon,
    "right-icon": rightIcon,
    'slds-month-table': SldsMonthTable
  },
  data: function() {
    return {
      isOpen: false,
      month: new Date().getUTCMonth(),
      year: new Date().getUTCFullYear(),
      date: new Date()
    };
  },
  computed: {
    years: function() {
      return _.range(1900, 2999);
    },
    currentMonthName: function() {
      return this.config.i18n.months[this.month];
    }
  },
  watch:{
    date: function(newVal,oldVal){
      this.date = VMasker.toPattern(newVal, this.format.replace(/([a-zA-Z ])/g,'9'))
    }, 
    year: function(newVal,oldVal){
      this.value.setUTCFullYear(newVal);
      this.date = moment(this.value).format(this.format)
    },
    month: function(newVal,oldVal){
      this.value.setUTCMonth(newVal);
      this.date = moment(this.value).format(this.format)
    },
    value:function (newVal, oldVal){
      this.date = moment(newVal).format(this.format)
    }
  },
  methods: {
    next: function() {
      if (this.month == 11) {
        if (this.year === 2099) this.year = 1900;
        else this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
    },
    previous: function() {
      if (this.month === 0) {
        if (this.year === 1900) this.year = 2099;
        else this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
    },
    closeDialog: function(event) {
        this.isOpen = false;
        this.$emit('input', this.value)
    },
    openDialog: function() {
      console.log("abrir popup");
      this.isOpen = true;
    },
    updateValue: function(){
      this.value = moment(this.date, this.format).toDate();
      this.month = this.value.getUTCMonth();
      this.year = this.value.getUTCFullYear();
    }
  }, 
  mounted: function (){
    this.date = moment(this.value).format(this.format)
    this.year = this.value.getUTCFullYear();
    this.month = this.getUTCMonth();
  }
};
</script>
