<template>
  <div class="slds-form-element" :class="{'slds-has-error': error !== undefined}">
    <legend class="slds-form-element__legend slds-form-element__label">
        <abbr v-if="required" class="slds-required" title="required">*</abbr>
        {{label}}
        </legend>
    <div class="slds-form-element__control " :class="{'slds-grid': horizontal}">
        <span v-for="option in options" :key="option.value" class="slds-radio slds-col">
            <input type="radio" :id="_id(option.label)" :value="option.value" v-model="value" @change="update()" />
            <label :for="_id(option.label)" class="slds-radio__label">
                <span class="slds-radio_faux"></span>
                <span class="slds-form-element__label">{{option.label}}</span>
            </label>
        </span>
    </div>
    <div class="slds-form-element__help">{{error}}</div>
</div>
</template>
<script>
import _ from 'lodash';
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: 'Radio Group (Forgot something?)'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Object, Number, Boolean],
      default: null
    },
    options: {
      type: Array,
      default: () => {
        return [{ value: true, label: 'Yes' }, { value: false, label: 'No' }];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      _value: null,
      rand: _.random(0, 999999)
    };
  },
  methods: {
    update: function() {
      this.$emit('input', this.value);
      this.$emit('change', this.value)
    },
    _id: function (label){
        return label + '_' + this.rand
    }
  },
  mounted: function(){
      this._value = this.value
  }
};
</script>
<style>
</style>