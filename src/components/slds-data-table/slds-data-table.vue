<template>
    <table class="slds-table" 
    :class="{
        'slds-table_bordered': options.row_bordered,
        'slds-table_col-bordered': options.col_bordered,
        'slds-table_striped': options.striped
        }">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.fieldName" :colspan="column.colspan || 0" :class="{'slds-is-sortable': column.sortable}">
                    <a class="slds-th__action slds-text-link_reset"  role="button" tabindex="-1" @click="!!column.sortable ? sortColumn(column): undefined ">
                        <span class="slds-truncate" >{{column.label}}</span>
                        <div v-if="!!column.sortable" class="slds-icon_container">
                            <arrow-down-icon  class="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon"  v-if="column.sortable !== 'asc'"/>
                            <arrow-up-icon  class="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon"  v-if="column.sortable === 'asc'"/>
                        </div>
                    </a>
                </th>
            </tr>
        </thead>
        <tbody>
            <slot v-if="hasCustomRow && dataset.length > 0" v-for="row in dataset" :row="row"></slot>
            <tr v-if="!hasCustomRow && dataset.length > 0" v-for="row in dataset" :key="row">
                <td v-for="column in columns" :key="column.fieldName" :colspan="column.colspan || 0">
                    {{row[column.fieldName] !== undefined ? row[column.fieldName] : '' }}
                </td>
            </tr>
            <tr v-if="dataset.length === 0" :colaspan="colspan">
                {{options.empty_message}}
            </tr>
        <tbody>
    </table>
</template>
<script>
import arrowDownIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?arrowdown';
import arrowUpIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?arrowup';
export default {
  components: {
    'arrow-down-icon': arrowDownIcon,
    'arrow-up-icon': arrowUpIcon
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return [
          { label: 'Column 1', fieldName: 'item1', colspan: 1, sortable:'desc' },
          { label: 'Column 2', fieldName: 'item2', colspan: 3 },
          { label: 'Column 3', fieldName: 'item3', colspan: 2 }
        ];
      }
    },
    dataset: {
      type: Array,
      default: () => {
        return [
          { item1: 'Item 1', item2: 'Item 2', item3: 'item 3' },
          { item1: 'Item 4', item2: 'Item 5', item3: 'item 6' },
          { item1: 'Item 7', item2: 'Item 8', item3: 'item 9' }
        ];
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          empty_message: '0 rows.',
          row_bordered: true,
          col_bordered: false,
          striped: true
        };
      }
    }
  },
  computed: {
    hasCustomRow: function() {
      return !!this.$scopedSlots.default;
    },
    colspan: function() {
      let cols = 0;
      for (i = 0; i < columns.length; i++) {
        cols += columns[i].colspan !== undefined ? columns[i].colspan : 0;
      }
      return cols;
    }
  },
  methods: {
    sortColumn(col) {
      if (col.sortable == 'desc') {
        this.dataset.sort(function(a, b) {
          if (typeof a[col.fieldName] === 'string') {
            let a1 = a[col.fieldName].toLowerCase();
            let b1 = b[col.fieldName].toLowerCase();
            return a1 < b1;
          } else {
            return a < b;
          }
        });
        col.sortable = 'asc'
      } else {
        this.dataset.sort(function(a, b) {
          if (typeof a[col.fieldName] === 'string') {
            let a1 = a[col.fieldName].toLowerCase();
            let b1 = b[col.fieldName].toLowerCase();
            return a1 > b1;
          } else {
            return a > b;
          }
        });
        col.sortable = 'desc'
      }
    }
  }
};
</script>
