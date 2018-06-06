<template>
    <div class="slds-dropdown-trigger dropdown-trigger_click" :class="{'slds-is-open': isOpen}">
        <input class="slds-input" v-model="inputText">
        <div class="slds-dropdown">
        <ul class="slds-dropdown__list">
            <li v-for="(item,index) in filteredResult" :key="index">
                {{item}}
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
      required: true
    },
    filterMethod: {
      type: Function,
      required: true
    }
  },
  data: () => {
    return {
      inputText: "",
      isOpen: false
    };
  },
  computed: {
    filteredResult: function() {
      return this.items.filter(this.filterMethod(this.inputText));
    }
  }
};
</script>
