<template>
  <InfoCard :title="title" :tooltip_icon="tooltip_icon" icon="MyDataIcon" :infos="infos" />
</template>
<script>
import InfoCard from "./InfoCard";
import {DateFormatBasic} from '../util'

export default {
  name: "IdentityCardCard",
  components: {
    InfoCard
  },
  data: () => ({
    title: "Carta d'identità",
    icon: '',
    tooltip_icon: '',

  }),
  computed:{
    infos(){
      let ci=this.$store.state.smartdata.profilo?this.$store.state.smartdata.profilo.identitycard:null
      return [
      {
        info: "Rilascita da",
        value: ci?ci.identitycardissuermunicipality:'Dato non disponibile'
      },
      { info: "Numero", value: ci?ci.identitycardcode:'Dato non disponibile' },
      { info: "Data emissione", value: ci?DateFormatBasic(ci.identitycardissuedate):'Dato non disponibile' },
      { info: "Data scadenza", value: ci?DateFormatBasic(ci.identitycardexpirationdate):'Dato non disponibile' },
      { info: "Valida per l'espatrio", value: ci?(ci.ciFlagCie=='S'?'SI':'NO'):'Dato non disponibile' },
    ]
    }
  }
};
</script>