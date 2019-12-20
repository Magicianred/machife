<template>
  <div>
    <v-card color>
      <v-card-title class="px-10 py-6">
        <h1 class="font-weight-bold display-2">{{title}}</h1>
      </v-card-title>

      <v-tabs show-arrows center-active v-if="items" :value="value" background-color="transparent" color="#1E59C1" grow @change="change">
        <v-tab
          v-for="item in items"
          :key="item.id"
          :to="item.route_name?{name:item.route_name}:''"
          exact
        >{{ item.text }}</v-tab>
      </v-tabs>
    </v-card>
    <v-img height="200px" v-if="show_box_image" :src="image||require('../assets/largeimage.jpg')">
      <v-row align="center" class="lightbox white--text px-10 fill-height">
        <v-col>
          <div class="title">{{full_name}}</div>
          <div class="subtitle-1">{{cod_fisc}}</div>
          <div class="title-divider-5"></div>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  data() {
    return {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  props: {
    items: Array,
    title: String,
    image:String,
    show_box_image:Boolean,
    onChange:null,
    value:Number
  },
  computed:{
    full_name(){
      return this.$store.state.smartdata.profilo?
      this.$store.state.smartdata.profilo.namesurname
      :""
    },
    cod_fisc(){
      return this.$store.state.smartdata.profilo?
      this.$store.state.smartdata.profilo.fiscalcode
      :""
    },
  },
  methods:{
    change(val){
      if(this.onChange){
        this.onChange(val)
      }
    }
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