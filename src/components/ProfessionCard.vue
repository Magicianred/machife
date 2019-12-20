<template>
  <InfoCard :title="title" :tooltip_icon="tooltip_icon" icon="ProfessionIcon" :infos="infos" />
</template>
<script>
import InfoCard from "./InfoCard";
export default {
  name: "ProfessionCard",
  components: {
    InfoCard
  },
  data: () => ({
    title: "Professione/Istruzione",
    icon: '',
    tooltip_icon: '',

  }),
  computed:{
    infos(){
      let ps=this.$store.state.smartdata.profilo?this.$store.state.smartdata.profilo.career:null
      return [
      {
        info: "Professione",
        value: ps?ps.profession:'Dato non disponibile'
      },
      { info: "Titolo di Studio", value: ps?ps.qualification:'Dato non disponibile' },
    ]
    }
  }
};
</script>