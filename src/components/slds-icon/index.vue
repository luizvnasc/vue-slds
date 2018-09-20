<template>
	<svg 
		v-if="isSprite" 
		size="0 0 24 24" 
		role="presentation" 
		class="icon--inline">
		<use :href="source"/>
	</svg>
	<object 
		v-else 
		:data="source" 
		type="image/svg+xml"/>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
		},
		group: {
			type: String,
		},
		src: {
			type: String,
		},
	},
	computed: {
		source() {
			return this.src === undefined
				? this._data.$sldsConfig.assetsUrl +
                      '/icons/' +
                      this.group +
                      '-sprite/svg/symbols.svg#' +
                      this.icon
				: this.src
		},
		isSprite() {
			return this.source.substr(this.source.length - 4) === '.svg' ? false : true
		},
	},
}
</script>

<style>
</style>
