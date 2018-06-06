<template>
	<div class="slds-dropdown-trigger" :class="{'slds-is-open': isOpen}">
		<input class="slds-input" v-model="inputText" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter" @focus="hasFocus= true"
  @blur="hasFocus = false">
		<div v-show="isOpen" class="slds_dropdown_custom full-width">
			<ul class="slds-dropdown__list autocomplete-list">
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
            hasFocus: false,
            current: -1,
        };
    },
    watch: {
        inputText: function(newVal, oldVal) {
            let valueError = false;
            if (this.filteredResult.length !== 1) {
                valueError = true;
            } else {
                if (newVal !== this.displayMethod(this.filteredResult[0])) valueError = true;
            }
            if (valueError) {
                this.current = -1;
                this.result = undefined;
                this.$emit('input', this.result);
            }
        },
        result: function(newVal, oldVal) {
            this.inputText = this.displayMethod(this.result);
        },
    },
    computed: {
        filteredResult: function() {
            return this.items.filter(this.filterMethod(this.inputText));
        },
        isOpen(){
          return this.filteredResult.length > 0 && this.hasFocus
        }
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
.autocomplete-list {
    max-height: 350px;
    overflow-y: scroll;
}
.autocomplete {
    display: inline-block;
}
.slds_dropdown_custom {
    position: absolute;
    margin: 50%;
    z-index: 7000;
    float: left;
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
    border: 1px solid #dddbda;
    border-radius: 0.25rem;
    padding: 0.25rem 0;
    font-size: 0.75rem;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
    transform: translateX(-50%);
}
</style>

