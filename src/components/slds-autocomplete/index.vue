<template>
	<div class="slds-form-element__control">
		<div class="slds-combobox_container">
			<div class="slds-combobox slds-dropdown-trigger" aria-expanded="false" aria-haspopup="listbox" role="combobox">
				<div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
					<input type="text" class="slds-input slds-combobox__input" id="combobox-id-1" aria-autocomplete="list" aria-controls="listbox-id-1" autocomplete="off" role="textbox" v-model="value" @focus="focus()" @blur="blur()" @input="update()" />
					<span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
						<search-icon/>
					</span>
				</div>
				<div v-show="hasFocus" id="listbox-id-1" class="slds-dropdown slds-dropdown_length-7 slds-dropdown_fluid" role="listbox">
					<ul class="slds-listbox slds-listbox_vertical" role="presentation">
						<li class="slds-listbox__item" v-for="(data,key) in dataset" :key="key"  @click="setResult(data)">
							<div  class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option" >
								<span  class="slds-media__body slds-clearfix">
									<span   class="slds-float_left">{{data}}</span>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import searchIcon from 'assets/icons/utility-sprite/svg/symbols.svg?search';
import { setTimeout } from 'timers';
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
        dataset: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    components: {
        'search-icon': searchIcon,
    },
    data() {
        return {
            hasFocus: false,
        };
    },
    methods: {
        focus() {
            this.hasFocus = true;
            this.$emit('focus')
        },
        blur() {
            var self = this
            setTimeout(function(){ self.hasFocus = false},100)
            this.$emit('blur')        
        },  
        update() {
            this.$emit('input', this.value);
        },
        setResult(data) {
            this.value = data;
			this.update();
        },
    },
};
</script>

<style>
</style>
