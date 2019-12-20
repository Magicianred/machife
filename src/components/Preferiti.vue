<template>
  <v-card class="mx-auto pa-5">
    <v-card-title class="pb-0">
      <div style="width:100%">
        {{title}}
        <!-- <v-btn text  to="/servizi">vedi tutti</v-btn> -->
        <router-link class="float-right" style="text-decoration:none" to="/servizi">
          <span class="body-2 font-weight-bold">Vedi tutti</span>
        </router-link>
        <div class="title-divider-5"></div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            xl="2"
            sm="6"
            md="6"
            lg="4"
            xs="12"
            v-for="service in favorites_or_services"
            :key="service.service_id"
          >
            <ServiceCard v-bind="service"></ServiceCard>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import ServiceCard from "./ServiceCard";
export default {
  name: "Preferiti",
  components: {
    ServiceCard
  },
  data: () => ({
    model: null,
    title: null
  }),
  computed: {
    favorites() {
      return this.$store.state.generic.services
        .filter(x => x.favorite)
        .slice(0, this.services_number);
    },
    services() {
      return this.$store.state.generic.services.slice(0, this.services_number);
    },
    favorites_or_services() {
      if (this.favorites.length > 0) {
        this.title = "Servizi preferiti";
        return this.favorites;
      } else {
        this.title = "Servizi più utilizzati";
        return this.services;
      }
    },
    services_number() {
      return this.$store.state.generic.homepage_services;
    }
  },
  created() {
    this.$store.dispatch("get_services");
  }
};
</script>