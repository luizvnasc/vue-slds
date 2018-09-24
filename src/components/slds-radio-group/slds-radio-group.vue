<template>
	<div 
		:class="{'slds-has-error': error !== undefined}" 
		class="slds-form-element">
		<legend class="slds-form-element__legend slds-form-element__label">
			<abbr 
				v-if="required" 
				class="slds-required" 
				title="required">*</abbr>
			{{ label }}
		</legend>
		<div 
			:class="{'slds-grid': horizontal}" 
			class="slds-form-element__control ">
			<span 
				v-for="option in options" 
				:key="option.value" 
				class="slds-radio slds-col">
				<input 
					:id="_id(option.label)" 
					:value="option.value" 
					v-model="value" 
					type="radio"
					:disabled="disabled"
					@change="update()" >
				<label 
					:for="_id(option.label)" 
					class="slds-radio__label">
					<span class="slds-radio_faux"/>
					<span class="slds-form-element__label">{{ option.label }}</span>
				</label>
			</span>
		</div>
		<div class="slds-form-element__help">{{ error }}</div>
	</div>
</template>
<script>
import _ from 'lodash'
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
				return [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
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
		}
	},
	mounted: function(){
		this._value = this.value
	},
	methods: {
		update: function() {
			this.$emit('input', this.value)
			this.$emit('change', this.value)
		},
		_id: function (label){
			return label + '_' + this.rand
		}
	},
}
</script>
<style>
</style>