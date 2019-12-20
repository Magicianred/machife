<template>
  <div>
    <Tabs
      :value="activeTab"
      title="Servizi"
      :items="tab_items"
      :onChange="changeTab"
    />
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <v-row class="pa-6" v-if="selected.length>0">
        <v-col
          cols="12"
          xl="2"
          sm="6"
          md="4"
          lg="4"
          xs="12"
          v-for="service in selected"
          :key="service.service_id"
        >
          <ServiceCard v-bind="service"></ServiceCard>
        </v-col>
      </v-row>
      <v-row class="pa-6" v-else>
        Nessun servizio presente
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceCard from "../components/ServiceCard";
import Tabs from "../components/Tabs";

export default {
  name: "Servizi",
  data: () => ({
    activeTab: 0
  }),
  components: {
    Tabs,
    ServiceCard
  },
  computed: {
    tab_items() {
      return [
        {
          id: 1,
          text: "Tutti",
          active: true
        },
        {
          id: 2,
          text: "Preferiti",
          active: true
        }
      ].filter(x => x.active);
    },
    favorites() {
      return this.$store.state.generic.services.filter(x => x.favorite);
    },
    services() {
      return this.$store.state.generic.services;
    },
    selected() {
      switch (this.activeTab) {
        case 0:
          return this.services;
        case 1:
          return this.favorites;
        default:
          break;
      }
    }
  },
  created() {
    this.$store.dispatch("get_services");
  },
  methods: {
    changeTab(val) {
      this.activeTab = val;
    }
  }
};
</script>
