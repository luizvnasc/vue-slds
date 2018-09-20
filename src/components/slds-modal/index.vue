<template>
	<div v-if="value">
		<section 
			:class="{'slds-modal_medium': size == 'medium', 'slds-modal_large': size == 'large'}" 
			role="dialog" 
			tabindex="-1" 
			aria-labelledby="modal-heading-01" 
			aria-modal="true" 
			aria-describedby="modal-content-id-1" 
			class="slds-modal slds-fade-in-open" >
			<div 
				v-click-outside="close" 
				class="slds-modal__container">
				<header class="slds-modal__header">
					<button 
						class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" 
						title="Close" 
						@click="close()">
						<close-icon class="slds-button__icon slds-button__icon_large"/>
						<span class="slds-assistive-text">Close</span>
					</button>
					<h2 
						v-if="!!title" 
						id="modal-heading-01" 
						class="slds-text-heading_medium slds-hyphenate">{{ title }}</h2>
				</header>
				<div 
					:class="[contentClass, { hasExtraClass: true }]" 
					class="slds-modal__content slds-p-around_medium">
					<slot 
						name="main" 
						class="main"/>
				</div>
				<footer class="slds-modal__footer">
					<slot name="footer"/>
				</footer>
			</div>
		</section>
		<div class="slds-backdrop slds-backdrop_open"/>
	</div>
</template>
<script>
import closeIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?close'
import ClickOutside from 'vue-click-outside'
export default {
	directives: { ClickOutside },
	components: {
		'close-icon': closeIcon
	},
	props: {
		value: {
			type: Boolean
		},
		title: {
			type: String,
			default: 'TITLE'
		},
		contentClass: {
			type: [Object,Array,String]
        
		}, 
		size: {
			type: String,
			default: 'small'
		}
	},
	computed: {
		hasExtraClass: function(){
			return this.contentClass !== undefined 
		}
	},
	methods: {
		close: function() {
			this.value = false
			this.$emit('input', this.value)
			this.$emit('close', this.value)
		}
	}
}
</script>
<style>
.main {
    z-index: 99
}
.vue-slds-modal{
    position: absolute !important;
}
</style>

