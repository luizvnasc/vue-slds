<template>
  <div id="app">
  <div>
    <slds-tabs>
        <slds-tab name="First tab">
            <slds-alert v-model="showAlert"  type="warning"><h2>erro</h2></slds-alert>
            <button type="button" @click="showAlert = true">show</button>
        </slds-tab>
        <slds-tab name="Second tab">
            Second tab content
        </slds-tab>
        <slds-tab name="Third tab">
            Third tab content
        </slds-tab>
    </slds-tabs>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showAlert: false
    }
  }
}
</script>

<style lang="scss">

</style>
