<template>
  <div>
    <Tabs title="I miei dati" :items="tab_items" show_box_image :image="stripe" />
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard";
import Tabs from "../components/Tabs";
import MyDataStripe from "../assets/img_mydata_stripe.png";
import FamilyStripe from "../assets/img_family_stripe.png";
import TaxStripe from "../assets/img_tax_stripe.png";
import CatastoStripe from "../assets/catasto_stripe.png";
import CuriosityStripe from '../assets/img_curiosity_stripe.png';

export default {
  name: "MyData",
  data: () => ({ stripe: MyDataStripe }),
  components: {
    ProfileCard,
    Tabs
  },
  watch: {
    $route: function(to) {
      switch (to.name) {
        case "personal":
          this.stripe = MyDataStripe;
          break;
        case "my_family_data":
          this.stripe = FamilyStripe;
          break;
        case "tax":
          this.stripe = TaxStripe;
          break;
        case "catasto":
          this.stripe = CatastoStripe;
          break;
        case "curiosity":
          this.stripe = CuriosityStripe;
          break;
        default:
          break;
      }
    }
  },
  computed: {
    tab_items() {
      return [
        {
          id: 1,
          text: "Dati personali",
          route_name: "personal",
          active: true
        },
        {
          id: 2,
          text: "Famiglia",
          route_name: "my_family_data",
          active: this.show_family
        },
        {
          id: 3,
          text: "Tasse",
          route_name: "tax",
          active: this.show_tax
        },
        {
          id: 4,
          text: "Catasto",
          route_name: "catasto",
          active: this.show_catasto
        },
        {
          id: 5,
          text: "Curiosità",
          route_name: "curiosity",
          active: this.show_curiosita
        }
      ].filter(x => x.active);
    },
    show_family() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.famiglia
        : false;
    },
    show_tax() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.tasse
        : false;
    },
    show_catasto() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.catasto
        : false;
    },
    show_curiosita() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.curiosita
        : false;
    }
  }
};
</script>
