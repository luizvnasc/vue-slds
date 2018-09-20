<template>
	<div :class="{ 'slds-has-error': error !== undefined }" class="slds-form-element">
		<label class="slds-form-element__label" for="text-input-id-1">
			<abbr v-if="required" class="slds-required" title="required">*</abbr>
			{{ label }}
		</label>
		<slds-tooltip v-if="!!tooltip" :tooltip="tooltip" />
		<div class="slds-form-element__control">
			<slot/>
		</div>
		<div class="slds-form-element__help">{{ error }}</div>
	</div>
</template>
<script>
import SldsTooltips from '../slds-tooltips'
export default {
	components:{
		'slds-tooltip':SldsTooltips
	},
	props: ['required', 'error','label', 'tooltip']
}
</script>
<style>
</style>
