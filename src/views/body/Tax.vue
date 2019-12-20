<template>
  <div>
    <v-tabs v-model="tab" background-color="#fafafa" color="basil">
      <v-tab v-for="item in items" :key="item.label">{{ item.label }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" background-color="#fafafa" touchless>
      <v-tab-item v-for="item in items" :key="item.label" background-color="#fafafa">
        <component v-bind:is="item.component"></component>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Pagamenti from "./Pagamenti";
import Utenze from "./Utenze";
export default {
  name: "Tax",
  components: {
    Pagamenti,
    Utenze
  },
  data() {
    return {
      tab: null,
      items: [
        {
          label: "Pagamenti e importi dovuti",
          component: "Pagamenti"
        },
        {
          label: "Utenze",
          component: "Utenze"
        }
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("smartdata/tari");
    this.$store.dispatch("smartdata/utenze_tari");
  }
};
</script>
<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>