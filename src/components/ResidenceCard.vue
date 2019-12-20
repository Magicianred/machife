<template>
  <InfoCard :title="title" icon="ResidenceIcon" :infos="infos" />
</template>
<script>
import InfoCard from "./InfoCard";
export default {
  name: "ResidenceCard",
  components: {
    InfoCard
  },
  data: () => ({
    title: "Residenza"
  }),
  computed: {
    infos() {
      let residenza = this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.residence
        : null;

      return  [
            {
              info: "Indirizzo di residenza",
              value: residenza?residenza.address:'Dato non disponibile'
            },
            {
              info: "Numero unità immobiliare",
              value: residenza?residenza.housingnumber:'Dato non disponibile'
            },
            { info: "Piano", value: residenza?residenza.floor:'Dato non disponibile' }
            // { info: "Circoscrizione", value: residenza.circoscrizione },
            // { info: "Quartiere", value: residenza.quartiere },
            // { info: "Sezione censimento", value: residenza.sezione_censimento }
          ];
    }
  }
};
</script>