<template>
	<div>
		<table class="slds-table" :class="{
        'slds-table_bordered': options.row_bordered,
        'slds-table_col-bordered': options.col_bordered,
        'slds-table_striped': options.striped
        }">
			<thead>
				<tr>
					<th v-for="column in columns" :key="column.fieldName" :colspan="column.colspan || 0" :class="{'slds-is-sortable': column.sortable}">
						<a class="slds-th__action slds-text-link_reset slds-align_absolute-center" role="button" tabindex="-1" @click="!!column.sortable ? sortColumn(column): undefined ">
							<span class="slds-truncate">{{column.label}}</span>
							<div v-if="!!column.sortable" class="slds-icon_container">
								<arrow-down-icon class="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon" v-if="column.sortable !== 'asc'" />
								<arrow-up-icon class="slds-icon slds-icon_x-small slds-icon-text-default slds-is-sortable__icon" v-if="column.sortable === 'asc'" />
							</div>
						</a>
					</th>
				</tr>
			</thead>

			<tbody>
				<!--Slot for custom rows-->
				<slot v-if="hasCustomRow && dataset.length > 0" v-for="row in rowRange" :row="dataset[row]"></slot>
				<!--default rows if slot is empty -->
				<tr v-if="!hasCustomRow && dataset.length > 0" v-for="row in rowRange" :key="row">
					<td v-for="column in columns" :key="column.fieldName" :colspan="column.colspan || 0">
						{{get(dataset[row],column.fieldName) !== undefined ? get(dataset[row],column.fieldName) : '' }}
					</td>
				</tr>
				<!-- empty message -->
				<tr v-if="dataset.length === 0" :colaspan="colspan">
					{{options.empty_message}}
				</tr>
			</tbody>

		</table>
		<!--footer if pagination is true -->
		<div v-if="options.pagination === true" class="slds-border_top slds-border_bottom slds-p-around_x-small slds-grid">
			<div class="slds-col slds-align_absolute-center slds-size_3-of-12">

			</div>
			<div class="slds-col slds-size_6-of-12">
				<ul class="slds-button-group-list slds-align_absolute-center">
					<li>
						<button :disabled="!hasPreviousPages" class="slds-button slds-button_neutral" @click="previousPages()">&lt;&lt;</button>
					</li>
					<li>
						<button :disabled="!hasPreviousPage" class="slds-button slds-button_neutral" @click="pageIndex > 0 ? pageIndex--: 0 ">&lt;</button>
					</li>
					<li v-for="i in pageRange" :key="i">
						<button class="slds-button " :class="{'slds-button_neutral':i !== pageIndex, 'slds-button_brand':i === pageIndex}" type="buttom" @click="pageIndex = i">{{i+1}}</button>
					</li>
					<li>
						<button :disabled="!hasNextPage" class="slds-button slds-button_neutral" @click="pageIndex < numberOfPages ? pageIndex++: numberOfPages ">&gt;</button>
					</li>
					<li>
						<button :disabled="!hasNextPages" class="slds-button slds-button_neutral">&gt;&gt;</button>
					</li>
				</ul>
			</div>
			<div class="slds-col slds-size_3-of-12">
				<div class="slds-form-element slds-align_absolute-center">
					<label class="slds-form-element__label" for="text-input-id-1">Row per page</label>
					<div class="slds-form-element__control">
						<select class="slds-input" v-model="rowsPerPage">
							<option v-for="rows in listRowsPerPage" :key="rows" :value="rows">{{rows}}</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import arrowDownIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?arrowdown';
import arrowUpIcon from '../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg?arrowup';
import _ from 'lodash';
export default {
    components: {
        'arrow-down-icon': arrowDownIcon,
        'arrow-up-icon': arrowUpIcon,
    },
    props: {
        columns: {
            type: Array,
            default: () => {
                return [
                    {
                        label: 'Column 1',
                        fieldName: 'item1',
                        colspan: 1,
                        sortable: 'desc',
                    },
                    { label: 'Column 2', fieldName: 'item2', colspan: 3 },
                    { label: 'Column 3', fieldName: 'item3', colspan: 1 },
                ];
            },
        },
        dataset: {
            type: Array,
            default: () => {
                return [
                    { item1: 'Item 1', item2: 'Item 2', item3: 'item 3' },
                    { item1: 'Item 4', item2: 'Item 5', item3: 'item 6' },
                    { item1: 'Item 7', item2: 'Item 8', item3: 'item 9' },
                    { item1: 'Item 10', item2: 'Item 11', item3: 'item 12' },
                    { item1: 'Item 13', item2: 'Item 14', item3: 'item 15' },
                    { item1: 'Item 16', item2: 'Item 17', item3: 'item 18' },
                ];
            },
        },
        options: {
            type: Object,
            default: () => {
                return {
                    pagination: true,
                    empty_message: '0 rows.',
                    row_bordered: true,
                    col_bordered: false,
                    striped: true,
                };
            },
        },
    },
    data: () => {
        return {
            rowsPerPage: 5,
            listRowsPerPage: [5, 10, 25, 50],
            rowIndex: 0,
            pageIndex: 0,
            firstPageIndex: 0,
        };
    },
    computed: {
        hasCustomRow: function() {
            return !!this.$scopedSlots.default;
        },
        colspan: function() {
            let cols = 0;
            for (let i = 0; i < this.columns.length; i++) {
                cols += this.columns[i].colspan !== undefined ? this.columns[i].colspan : 0;
            }
            return cols;
        },
        numberOfPages: function() {
            return Math.ceil(this.dataset.length / this.rowsPerPage);
        },
        hasNextPages() {
            return this.firstPageIndex + 5 < this.numberOfPages;
        },
        hasNextPage() {
            return this.pageIndex + 1 < this.numberOfPages;
        },
        hasPreviousPages() {
            return this.firstPageIndex - 5 > 0;
        },
        hasPreviousPage() {
            return this.pageIndex - 1 >= 0;
        },
        lastPageIndex() {
            return this.firstPageIndex + 5 <= this.numberOfPages
                ? this.firstPageIndex + 5
                : this.numberOfPages;
        },
        pageRange() {
            return this.lastPageIndex == 0 ? 0 : _.range(this.firstPageIndex, this.lastPageIndex);
        },
        rowRange() {
            if (!this.options.pagination) {
                return _.range(0, this.dataset.length);
            }
            let firstrow = this.pageIndex * this.rowsPerPage;
            return _.range(
                firstrow,
                firstrow + this.rowsPerPage - 1 >= this.dataset.length
                    ? this.dataset.length
                    : firstrow + this.rowsPerPage - 1,
            );
        },
    },
    watch: {
        rowsPerPage: function() {
            this.pageIndex = 0;
        },
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
                col.sortable = 'asc';
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
                col.sortable = 'desc';
            }
        },
        getValue(object, fieldName) {
            return _.get(object, fieldName);
        },
        nextPages: function() {
            this.firstPage + 5 < this.numberOfPages ? (this.firstPage += 5) : null;
        },
        previousPages: function() {},
    },
};
</script>
<style>
.center {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
}
.middle {
    text-align: center;
}
</style>
