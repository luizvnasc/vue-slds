<template>
    <section v-show="isActive"
             :aria-hidden="! isActive"
             class="slds-tabs_default__content"
             :id="hash"
             role="tabpanel"
    >
        <slot />
    </section>
</template>

<script>
    export default {
        props: {
            id: { default: null },
            name: { required: true },
            prefix: { default: '' },
            suffix: { default: '' },
            isDisabled:{ default: false },
            route:{default:''}
        },
        data: () => ({
            isActive: false,
            isVisible: true,
        }),
        computed: {
            header() {
                return this.prefix + this.name + this.suffix;
            },
            hash() {
                if (this.isDisabled) {
                    return '#';
                }else{
                return this.id ?
                    this.route + '#' + this.id :
                    this.route + '#' + this.name.toLowerCase().replace(/ /g, '-');
                }
            },
        },
    };
</script>