<template>
  <InfoCard :title="title" :tooltip_icon="tooltip_icon" :icon="icon" :link="link" :infos="infos" />
</template>
<script>
import InfoCard from "./InfoCard";
import {DateFormatBasic} from '../util'
export default {
  name: "ElectionDataCard",
  components: {
    InfoCard
  },
  data: () => ({
    title: "Dati Elettorali",
    icon: '',
    tooltip_icon: '',

  }),
  computed:{
    infos(){
      let de=this.$store.state.smartdata.profilo.dati_elettorali
      return [
      {
        info: "Seggio",
        value: de.denominazione_struttura
      },
      { info: "Circoscrizione", value: de.circoscrizione_sezione },
      { info: "Tipologia", value: de.tipo_struttura },
      { info: "Ingresso", value: de.ingresso },
      { info: "Piano", value: de.pianoSezione },
      // { info: "Evento", value: de.descr_evento_elettorale+', '+DateFormatBasic(de.data_evento_elettorale) },
    ]
    }
  }
};
</script>