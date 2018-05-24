<template>
    <div class="slds-tabs_default">
        <ul class="slds-tabs_default__nav" role="tablist">
            <li
                v-for="(tab, i) in tabs"
                :key="i"
                :class="{ 'slds-is-active': tab.isActive, '': tab.isDisabled }"
                class="slds-tabs_default__item " :title="tab.title" role="presentation"
                v-show="tab.isVisible"
            >
                <a v-html="tab.header"
                   :aria-controls="tab.hash"
                   :aria-selected="tab.isActive"
                   @click=" selectTabAction(tab.hash, $event)"
                   :href="tabURL(tab)"
                   class="slds-tabs_default__link"
                   role="tab"
                >{{tab.header}}</a>
            </li>
        </ul>
        <div >
            <slot/>
        </div>
    </div>
</template>
<script>
import expiringStorage from "./expiringStorage";
export default {
  props: {
    cacheLifetime: {
      default: 5
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        useUrlFragment: true
      })
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    tabs: [],
    activeTabHash: ""
  }),
  computed: {
    storageKey() {
      return `vue-tabs-component.cache.${window.location.host}${
        window.location.pathname
      }`;
    },
    tabIndex(){
      var self = this
      return this.tabs.findIndex(function (tab){return tab.hash === self.activeTabHash})
    }
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    window.addEventListener("hashchange", () =>
      this.selectTab(window.location.hash)
    );
    if (this.findTab(window.location.hash)) {
      this.selectTab(window.location.hash);
      return;
    }
    const previousSelectedTabHash = expiringStorage.get(this.storageKey);
    if (this.findTab(previousSelectedTabHash)) {
      this.selectTab(previousSelectedTabHash);
      return;
    }
    if (this.tabs.length) {
      this.selectTab(this.tabs[0].hash);
    }
  },
  methods: {
    findTab(hash) {
      return this.tabs.find(tab => tab.hash === hash);
    },
    findByIndex(i) {
      if (i < 0 || i >= this.tabs.length) {
        throw "Index out of bounds";
        return;
      }
      return this.tabs[i];
    },
    selectTabAction(selectedTabHash, event){
        if(!this.readonly)
            this.selectTab(selectedTabHash,event)
    },
    selectTab(selectedTabHash, event) {
      // See if we should store the hash in the url fragment.
      if (event && !this.options.useUrlFragment) {
        event.preventDefault();
      }
      const selectedTab = this.findTab(selectedTabHash);
      if (!selectedTab) {
        return;
      }
      if (selectedTab.isDisabled) {
        return;
      }
      this.tabs.forEach(tab => {
        tab.isActive = tab.hash === selectedTab.hash;
      });
      this.$emit("changed", { tab: selectedTab });
      this.activeTabHash = selectedTab.hash;
      expiringStorage.set(
        this.storageKey,
        selectedTab.hash,
        this.cacheLifetime
      );
    },
    selectTabByIndex(i) {
      if (i < 0 || i >= this.tabs.length) {
        throw "Index out of bounds";
        return;
      }
      let tab = this.tabs[i];
      this.selectTab(tab.hash);
    },
    setTabVisible(hash, visible) {
      const tab = this.findTab(hash);
      if (!tab) {
        return;
      }
      tab.isVisible = visible;
      if (tab.isActive) {
        // If tab is active, set a different one as active.
        tab.isActive = visible;
        this.tabs.every((tab, index, array) => {
          if (tab.isVisible) {
            tab.isActive = true;
            return false;
          }
          return true;
        });
      }
    },
    tabURL: function (tab){
      return !this.readonly? window.location.pathname + tab.hash: ''
    }
  }
};
</script>
