<template>
    <div class="slds-form-element__icon">
        <button class="slds-button slds-button_icon slds-button slds-button_icon" aria-describedby="help" title="Help" @mouseover="open = true" @mouseleave="open = false">
            <info-icon class="slds-button__icon" />
        </button>
        <div v-show="open" class="slds-popover slds-popover_tooltip slds-nubbin_bottom-left vslds-tooltip" role="tooltip" id="help">
            <div class="slds-popover__body">{{tooltip}}</div>
        </div>
    </div>
</template>

<script>
import InfoIcon from "node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?info";
export default {
  components: {
    "info-icon": InfoIcon
  },
  props: {
    tooltip: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    show() {
      this.open = !this.open;
    }
  }
};
</script>

<style>
.vslds-tooltip {
  position: absolute;
  bottom: 100%;
  left: -15px;
  width: 100%;
  max-width: 300px;
  min-width: 200px;
}
</style>
