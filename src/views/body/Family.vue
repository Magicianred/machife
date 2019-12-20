<template>
  <div>
    <v-row class="pa-6">
      <v-col v-for="(item, n) in items" :key="n" cols="12" xl="2" sm="6" md="6" lg="4" xs="12">
        <InfoCard v-bind="item" classes expandable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InfoCard from "../../components/InfoCard";
import { DateFormatBasic } from "../../util";

export default {
  name: "Family",
  components: {
    InfoCard
  },
  computed: {
    items() {
      return (this.$store.state.smartdata.famiglia || []).map(x => ({
        overline: x.familyrole,
        icon: this.IdentifyIcon(x),
        title: x.namesurname,
        link: null,
        infos: [
          { info: "Codice Fiscale", value: x.fiscalcode },
          { info: "Luogo di nascita", value: x.birthplace },
          { info: "Data di nascita", value: DateFormatBasic(x.dateofbirth) },
          { info: "Sesso", value: x.gender },
          { info: "Stato civile", value: x.maritalstatus }
        ]
      }));
    }
  },
  methods:{
    IdentifyIcon(element){
      if(['INTESTATARIO SCHEDA', 'SUOCERO/A', 'MARITO'].indexOf(element.familyrole)!=-1 && element.gender == 'M'){
        return 'BeardManIcon';
      }else if(['INTESTATARIO SCHEDA', 'SUOCERO/A', 'MOGLIE'].indexOf(element.familyrole)!=-1 && element.gender == 'F'){
        return 'WomanIcon';
      } else if(['FIGLIO/A'].indexOf(element.familyrole)!=-1 && element.gender == 'F'){
        return 'DaughterIcon'
      } else if(['FIGLIO/A'].indexOf(element.familyrole)!=-1 && element.gender == 'M'){
        return 'SonIcon'
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("smartdata/famiglia");
  }
};
</script>
