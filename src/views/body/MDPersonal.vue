<template>
  <div>
    <v-item-group>
      <v-row class="pa-6">
        <v-col cols="12" xl="2" sm="6" md="4" lg="4" xs="12" v-if="show_residence">
          <v-item v-slot:default="{ active, toggle }">
            <ResidenceCard />
          </v-item>
        </v-col>
        <v-col cols="12" xl="2" sm="6" md="4" lg="4" xs="12" v-if="show_identity_card">
          <v-item v-slot:default="{ active, toggle }">
            <IdentityCardCard />
          </v-item>
        </v-col>
        <v-col cols="12" xl="2" sm="6" md="4" lg="4" xs="12" v-if="show_election_data">
          <v-item v-slot:default="{ active, toggle }">
            <ElectionDataCard />
          </v-item>
        </v-col>
        <v-col cols="12" xl="2" sm="6" md="4" lg="4" xs="12" v-if="show_profession">
          <v-item v-slot:default="{ active, toggle }">
            <ProfessionCard />
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
import ProfileCard from "../../components/ProfileCard";
import InfoCard from "../../components/InfoCard";
import ResidenceCard from "../../components/ResidenceCard";
import IdentityCardCard from "../../components/IdentityCardCard";
import ElectionDataCard from "../../components/ElectionDataCard";
import ProfessionCard from "../../components/ProfessionCard";

export default {
  name: "MDPersonal",
  components: {
    ProfileCard,
    InfoCard,
    ResidenceCard,
    IdentityCardCard,
    ElectionDataCard,
    ProfessionCard
  },
  computed: {
    show_residence() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.residenza
        : false;
    },
    show_identity_card() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.carta_identita
        : false;
    },
    show_election_data() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.dati_elettorali
        : false;
    },
    show_profession() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.professione_istruzione
        : false;
    }
  },
  beforeMount() {
    this.$store.dispatch("smartdata/profilo");
  }
};
</script>
