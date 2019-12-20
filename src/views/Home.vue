<template>
  <div>
    <v-img height="200px" :src="require('../assets/img_home_stripe.png')"></v-img>
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <v-row class="pa-6" no-gutters>
        <v-col cols="12">
          <ProfileCard />
          <v-divider v-if="messages" class="my-10"></v-divider>
          <Messages
            v-if="messages"
            title="Ultime comunicazioni"
            :link="{name:'Vedi tutte', route:'/comunicazioni'}"
            useLimit
          />
          <v-divider v-if="favourite" class="my-10"></v-divider>
          <Preferiti v-if="favourite" />
          <v-divider v-if="docs" class="my-10"></v-divider>
          <DocumentHomeCard v-if="docs" />
          <v-divider v-if="curiosity" class="my-10"></v-divider>
          <CuriosityCard v-if="curiosity" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard";
import Messages from "../components/Messages";
import Preferiti from "../components/Preferiti";
import DocumentHomeCard from "../components/DocumentHomeCard";
import CuriosityCard from "../components/CuriosityCard";
import HomeStripe from '../assets/img_home_stripe.png';

export default {
  name: "Home",
  components: {
    ProfileCard,
    Messages,
    Preferiti,
    DocumentHomeCard,
    CuriosityCard,
  },
  computed: {
    messages() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.comunicazioni
        : false;
    },
    favourite() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.servizi
        : false;
    },
    docs() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.documenti
        : false;
    },
    curiosity() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.curiosita
        : false;
    }
  },
  beforeCreate() {
    this.$store.dispatch("smartdata/profilo");
  }
};
</script>
