<template>
	<div class="slds-dropdown-trigger dropdown-trigger_click" :class="{'slds-is-open': isOpen}">
		<input class="slds-input" v-model="inputText" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter">
		<div class="slds-dropdown full-width">
			<ul class="slds-dropdown__list">
				<li class="autocomplete-result slds-dropdown__item" :class="{'autocomplete-current':current === index}" v-for="(item,index) in filteredResult" :key="index" @click="select(item)">
					{{displayMethod(item)}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        filterMethod: {
            type: Function,
            required: true,
        },
        displayMethod: {
            type: Function,
            required: true,
        },
        result: {
            type: [Object, String],
        },
    },
    data: () => {
        return {
            inputText: '',
            isOpen: false,
            current: -1,
        };
    },
    computed: {
        filteredResult: function() {
            return this.items.filter(this.filterMethod(this.inputText));
        },
    },
    methods: {
        select: function(item) {
            this.result = item;
            this.current = -1;
            this.inputText = this.displayMethod(this.result);
            this.$emit('input', this.result);
        },
        onArrowDown(evt) {
            if (this.current < this.filteredResult.length) {
                this.current = this.current + 1;
            }
        },
        onArrowUp() {
            if (this.current > 0) {
                this.current = this.current - 1;
            }
        },
        onEnter() {
            this.select(this.filteredResult[this.current]);
        },
    },
};
</script>
<style>
.full-width {
    width: 100%;
}
.autocomplete-result:hover,
.autocomplete-current {
    background-color: #007add;
    color: white;
}
</style>

