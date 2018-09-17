<template>
  <div class="slds-form-element" v-bind:class="{ 'slds-has-error': error !== undefined }">
    <label class="slds-form-element__label" for="text-input-id-1">
      <abbr v-if="required" class="slds-required" title="required">*</abbr>
      {{label}}
    </label>
    <div class="slds-form-element__control">
      <slot></slot>
    </div>
    <div  class="slds-form-element__help">{{error}}</div>
  </div>
</template>
<script>
export default {
  props: ["required", "error",'label']
};
</script>
<style>
</style>
