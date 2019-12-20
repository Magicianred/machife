<template>
  <div style="background-color:#fafafa">
    <template v-for="utenza_tipo in utenze">
      <div :key="utenza_tipo.categorytari">
        <v-card class="my-6">
          <v-card-title>
            <v-list-item>
              <v-list-item-icon>
                <ResidenceIcon v-if="utenza_tipo.categorytari==1" />
                <CarBoxIcon v-if="utenza_tipo.categorytari==41" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="headline">{{utenza_tipo.categorytaridescription}}</v-list-item-title>
                <!-- <v-list-item-subtitle>I dati vengono aggiornati ogni 6 ore</v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Indirizzo</th>
                    <th class="text-left">Piano</th>
                    <th class="text-left">Nui</th>
                    <th class="text-left">Superficie</th>
                    <th class="text-left">Data inizio occupazione</th>
                    <th class="text-left">Componenti</th>
                    <th class="text-left">Stato utenza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="details in utenza_tipo.userdetails" :key="details.useridtarsu">
                    <td>{{ details.address }}</td>
                    <td>{{ details.floor }}</td>
                    <td>{{ details.housingnumber }}</td>
                    <td>{{ details.surface }}</td>
                    <td>{{ DateFormatBasic(details.startdateoccupancy) }}</td>
                    <td>{{ details.numbertot }}</td>
                    <td>{{ details.status }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </div>
    </template>
  </div>
</template>
<script>
import { DateFormatBasic } from "../../util";
import ResidenceIcon from "../../components/ResidenceIcon";
import CarBoxIcon from "../../components/CarBoxIcon";
export default {
  name: "Utenze",
  components: { ResidenceIcon, CarBoxIcon },
  methods: {
    DateFormatBasic
  },
  computed: {
    utenze() {
      return this.$store.state.smartdata.utenze_tari || [];
    }
  }
};
</script>