<template>
  <v-card class="mx-auto" v-if="full_name">
    <v-card-text class="pa-0">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="4" class="py-0 d-none d-md-flex">
          <v-img
            style="border-top-left-radius: 4px;border-bottom-left-radius: 4px;"
            :src="require('../assets/img_profile_card.png')"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="12" md="8" class="py-0">
          <v-container>
            <v-row class="my-4">
              <v-col cols="12" sm="12" md="5" justify="center" class="pl-8 py-1">
                <v-row class="ma-0 pa-0" >
                  <v-col cols="12" md="12" sm="4">
                    <v-avatar color="orange" size="100">
                      <BeardManIcon />
                    </v-avatar>
                  </v-col>
                  <v-col class="my-0 my-auto pa-0" cols="12" md="12" sm="8">
                    <div class="title">{{full_name}}</div>
                    <div class="body-2">{{cod_fisc}}</div>
                    <div class="title-divider-15"></div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="12" md="7" class="px-8">
                <div class="datablock">
                  <div class="black--text subtitle-2">Luogo e data di nascita</div>
                  <div class="black--text body-2">{{birth_place}}</div>
                  <div class="black--text body-2">{{birth_date}}</div>
                </div>
                <div class="datablock">
                  <div class="black--text subtitle-2">Sesso</div>
                  <div class="black--text body-2">{{gender}}</div>
                </div>
                <div class="datablock">
                  <div class="black--text subtitle-2">Stato civile</div>
                  <div class="black--text body-2">{{marital_status}}</div>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pb-0">
              <v-col class="pb-0 mt-2" align="right">
                <router-link style="text-decoration:none" to="/i-miei-dati">
                  <span class="body-2 font-weight-bold">Vedi tutto</span>
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text>Click</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
import { DateFormatBasic } from "../util";
import BeardManIcon from "./BeardManIcon";

export default {
  name: "ProfileCard",
  components: { BeardManIcon },
  data: () => ({
    item: null
  }),
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    full_name() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.namesurname
        : "";
    },
    cod_fisc() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.fiscalcode
        : "";
    },
    birth_place() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.birthplace
        : "";
    },
    birth_date() {
      return this.$store.state.smartdata.profilo
        ? DateFormatBasic(this.$store.state.smartdata.profilo.dateofbirth)
        : "";
    },
    gender() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.gender
        : "";
    },
    marital_status() {
      return this.$store.state.smartdata.profilo
        ? this.$store.state.smartdata.profilo.maritalstatus
        : "";
    }
  }
};
</script>