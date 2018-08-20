<template>
  <div v-if="value" class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_info" 
  v-bind:class="{'slds-theme_info': isInfo,'slds-theme_error': isError, 'slds-theme_warning': isWarning }" role="alert">
  <span class="slds-assistive-text">{{type}}</span>
  <span class="slds-icon_container slds-icon-utility-user slds-m-right_x-small" title="Description of icon when needed">
      <error-icon v-if="isError" class="slds-icon slds-icon_x-small" aria-hidden="true"/>
      <warn-icon v-if="isWarning" class="slds-icon slds-icon_x-small" aria-hidden="true"/>
  </span>
  <slot/>
  <button class="slds-button slds-button_icon slds-notify__close slds-button_icon-inverse" @click="close()">
      <close-icon class="slds-button__icon" aria-hidden="true"/>
    <span class="slds-assistive-text">Close</span>
  </button>
</div>
</template>
<script>
import closeIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?close";
import warningIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?warning";
import errorIcon from "../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?error";
export default {
  components: {
    "close-icon": closeIcon,
    "warn-icon": warningIcon,
    "error-icon": errorIcon
  },
  props: {
    type: {
      type: String,
      default: "info"
    },
    timer:{
        type: Number,
        default: undefined
    },
    open:{
        type:Boolean
    }
  },
  computed: {
    isError() {
      return this.type === "error";
    },
    isInfo() {
      return this.type === "info";
    },
    isWarning() {
      return this.type === "warning";
    }
  },
  watch:{
    value: function(newVal, oldVal){
      if(newVal && +this.timer > 0){
        setTimeout(() => this.close(),this.timer)
      }
    }
  },
  methods:{
      close: function(){
          this.$emit('close',this.value)
      }
  }
};
</script>
