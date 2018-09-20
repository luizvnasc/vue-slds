<template>
	<div 
		:class="{'slds-dropdown-trigger_click slds-is-open': isOpen}" 
		class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
		<input 
			id="date-input-id" 
			v-model="dateString" 
			type="text" 
			placeholder=" " 
			class="slds-input" 
			@blur="updateValue()" >
		<button 
			:title="config.i18n.tip" 
			class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" 
			@click="openDialog()">
			<event-icon 
				class="slds-button__icon" 
				aria-hidden="true" />
			<span class="slds-assistive-text">{{ config.i18n.tip }}</span>
		</button>
		<div 
			v-click-outside="closeDialog" 
			v-if="isOpen" 
			aria-hidden="false" 
			aria-label="Date picker: June" 
			class="slds-datepicker slds-dropdown slds-dropdown_left" 
			role="dialog">
			<div class="slds-datepicker__filter slds-grid">
				<div class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
					<div class="slds-align-middle">
						<button 
							:title="config.i18n.previous_month" 
							class="slds-button slds-button_icon slds-button_icon-container" 
							@click="previous()">
							<left-icon 
								class="slds-button__icon" 
								aria-hidden="true" />
							<span class="slds-assistive-text">{{ config.i18n.previous_month }}</span>
						</button>
					</div>
					<h2 
						id="month" 
						aria-atomic="true" 
						aria-live="assertive" 
						class="slds-align-middle">{{ currentMonthName }}</h2>
					<div class="slds-align-middle">
						<button 
							:title="config.i18n.next_month" 
							class="slds-button slds-button_icon slds-button_icon-container" 
							@click="next()">
							<right-icon 
								class="slds-button__icon" 
								aria-hidden="true" />
							<span class="slds-assistive-text">{{ config.i18n.next_month }}</span>
						</button>
					</div>
				</div>
				<div class="slds-shrink-none">
					<label 
						class="slds-assistive-text" 
						for="select-01">{{ config.i18n.pick_year }}</label>
					<div class="slds-select_container">
						<select 
							id="select-01" 
							v-model="year" 
							class="slds-select">
							<option 
								v-for="year in years" 
								:key="year" 
								:value="year">{{ year }}</option>
						</select>
					</div>
				</div>
			</div>
			<slds-month-table 
				v-model="date" 
				:month="month" 
				:year="year" />
		</div>
	</div>
</template>
<script>
import eventIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?event'
import leftIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?left'
import rightIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?right'
import _ from 'lodash'
import moment from 'moment'
import ClickOutside from 'vue-click-outside'
import SldsMonthTable from './slds-month-table'
import VMasker from 'vanilla-masker'
export default {
	directives: { ClickOutside },
	components: {
		'event-icon': eventIcon,
		'left-icon': leftIcon,
		'right-icon': rightIcon,
		'slds-month-table': SldsMonthTable,
	},
	props: {
		config: {
			type: Object,
			default: () => {
				return {
					i18n: {
						tip: 'Select a date',
						next_month: 'Next Month',
						previous_month: 'Previous Month',
						pick_year: 'Pick a Year',
						months: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
							'August',
							'September',
							'October',
							'November',
							'December',
						],
					},
				}
			},
		},
		format: {
			type: String,
			default: 'MM/DD/YYYY',
		},
		value: {
			type: Date,
		},
	},
	data: function() {
		return {
			isOpen: false,
			//Selected Month
			month: new Date().getUTCMonth(),
			//Selected Year
			year: new Date().getUTCFullYear(),
			//Selected Date
			date: this.value,
			//Date as String
			dateString: '',
		}
	},
	computed: {
		//Avaiable years range
		years: function() {
			return _.range(1900, 2999)
		},
		//Selected Month name
		currentMonthName: function() {
			return this.config.i18n.months[this.month]
		},
	},
	watch: {
		date: function(newVal, oldVal) {
			this.dateString = moment(newVal).format(this.format)
			this.month = this.date.getUTCMonth()
			this.year = this.date.getUTCFullYear()
			this.$emit('input', this.date)
		},
		dateString: function(newVal, oldVal) {
			this.dateString = VMasker.toPattern(newVal, this.format.replace(/([a-zA-Z ])/g, '9'))
		},
	},
	mounted: function() {
		this.dateString = this.date === undefined ? '' : moment(this.date).format(this.format)
	},
	methods: {
		next: function() {
			if (this.month == 11) {
				if (this.year === 2099) this.year = 1900
				else this.year++
				this.month = 0
			} else {
				this.month++
			}
		},
		previous: function() {
			if (this.month === 0) {
				if (this.year === 1900) this.year = 2099
				else this.year--
				this.month = 11
			} else {
				this.month--
			}
		},
		closeDialog: function(event) {
			this.isOpen = false
			this.month = this.date.getUTCMonth()
			this.year = this.date.getUTCFullYear()
		},
		openDialog: function() {
			this.isOpen = true
		},
		updateValue: function() {
			let dt = moment(this.dateString, this.format)
			if (dt.isValid()) {
				this.date = moment(this.dateString, this.format).toDate()
			} else {
				this.date = undefined
				this.dateString = ''
			}
		},
	},
}
</script>
