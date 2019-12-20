<template>
  <div>
    <v-row class="fill-height pa-6" no-gutters>
      <v-col class="text-center" cols="12" sm="4">
        <ManImg v-if="gender=='M'" />
        <WomanImg v-if="gender=='F'" />
      </v-col>
      <v-col class="pl-3 my-auto" cols="12" sm="8" align="left">
        <div class="grey--text">Lo sai che</div>
        <div
          class="display-1 font-weight-light"
        >{{n_nomi+(n_nomi==1?" persona":" persone")}} nella tua città {{n_nomi==1?" ha":" hanno"}} il tuo stesso nome ({{percname}}%).</div>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="fill-height pa-6" no-gutters>
      <v-col class="text-center" cols="12" sm="4">
        <PeopleImg />
      </v-col>
      <v-col class="pl-3 my-auto" cols="12" sm="8" align="left">
        <div class="grey--text">Lo sai che</div>
        <div
          class="display-1 font-weight-light"
        >{{n_cognomi+(n_cognomi==1?" persona":" persone")}} nella tua città {{n_cognomi==1?" ha":" hanno"}} il tuo stesso cognome ({{percsurname}}%).</div>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="fill-height pa-6" no-gutters>
      <v-col class="text-center" cols="12" sm="4">
        <BirthdayImg />
      </v-col>
      <v-col class="pl-3 my-auto" cols="12" sm="8" align="left">
        <div class="grey--text">Lo sai che</div>
        <div
          class="display-1 font-weight-light"
        >{{nbirthday+(nbirthday==1?" persona":" persone")}} ({{percbirthday}}%) nella tua città {{nbirthday==1?" festeggia":" festeggiano"}} il compleano il tuo stesso giorno, di cui {{ndateofbirth}} ({{percdateofbirth}}%) sono nate nel tuo stesso anno</div>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="fill-height pa-6" no-gutters>
      <v-col class="text-center" cols="12" sm="4">
        <PassportImg />
      </v-col>
      <v-col class="pl-3 my-auto" cols="12" sm="8" align="left">
        <div class="grey--text">Lo sai che</div>
        <div
          class="display-1 font-weight-light"
        >{{ncitizenship+(ncitizenship==1?" persona":" persone")}} ({{perccitizenship}}%) nella tua città {{ncitizenship==1?" condivide":" condividono"}} la tua stessa cittadinanza</div>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="fill-height pa-6" no-gutters>
      <v-col class="text-center" cols="12" sm="4">
        <MondoImg />
      </v-col>
      <v-col class="pl-3 my-auto" cols="12" sm="8" align="left">
        <div class="grey--text">Lo sai che</div>
        <div
          class="display-1 font-weight-light"
        >{{nbirthplace+(nbirthplace==1?" persona":" persone")}} nella tua città {{nbirthday==1?" è nata":" sono nati"}} nel tuo stesso luogo ({{percbirthplace}}%).</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MondoImg from "../../components/MondoImg";
import BirthdayImg from "../../components/BirthdayImg";
import WomanImg from "../../components/WomanImg";
import PassportImg from "../../components/PassportImg";
import PeopleImg from "../../components/PeopleImg";
import ManImg from "../../components/ManImg";
export default {
  name: "Curiosity",
  components: {
    MondoImg,
    BirthdayImg,
    WomanImg,
    PassportImg,
    PeopleImg,
    ManImg
  },
  computed: {
    n_nomi() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.nname)
        : 0;
    },
    percname() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.percname
          ).toFixed(3)
        : 0;
    },
    n_cognomi() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.nsurname)
        : 0;
    },
    percsurname() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.percsurname
          ).toFixed(3)
        : 0;
    },
    nbirthday() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.nbirthday)
        : 0;
    },
    percbirthday() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.percbirthday
          ).toFixed(3)
        : 0;
    },
    ndateofbirth() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.ndateofbirth)
        : 0;
    },
    percdateofbirth() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.percdateofbirth
          ).toFixed(3)
        : 0;
    },
    ncitizenship() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.ncitizenship)
        : 0;
    },
    perccitizenship() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.perccitizenship
          ).toFixed(3)
        : 0;
    },
    nbirthplace() {
      return this.$store.state.smartdata.profilo
        ? parseInt(this.$store.state.smartdata.profilo.stats.nbirthplace)
        : 0;
    },
    percbirthplace() {
      return this.$store.state.smartdata.profilo
        ? parseFloat(
            this.$store.state.smartdata.profilo.stats.percbirthplace
          ).toFixed(3)
        : 0;
    },
    gender() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.gender
        : "M";
    }
  }
};
</script>
