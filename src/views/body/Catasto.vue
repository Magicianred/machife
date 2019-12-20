<template>
  <div>
    <div v-if="fabbricati_view">
      <v-card class="my-6">
        <v-card-title>
          <v-list-item-icon>
            <DocsIcon />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="headline">Fabbricati</v-list-item-title>
            <!-- <v-list-item-subtitle>I dati vengono aggiornati ogni 6 ore</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Foglio</th>
                  <th class="text-left">Particella</th>
                  <th class="text-left">Sub</th>
                  <th class="text-left">Zona cens</th>
                  <th class="text-left">Categoria</th>
                  <th class="text-left">Classe</th>
                  <th class="text-left">Consistenza</th>
                  <th class="text-left">Rendita</th>
                  <th class="text-left">Indirizzo</th>
                  <th class="text-left">Percentuale</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fabbricato in fabbricati" :key="fabbricato.propertyid">
                  <td>{{ fabbricato.sheet }}</td>
                  <td>{{ fabbricato.parcel }}</td>
                  <td>{{ fabbricato.subordinate }}</td>
                  <td>{{ fabbricato.zone}}</td>
                  <td>{{ fabbricato.category }}</td>
                  <td>{{ fabbricato.class }}</td>
                  <td>{{ fabbricato.consistency }}</td>
                  <td>{{ fabbricato.cadastralincome }}</td>
                  <td>{{ fabbricato.address }}</td>
                  <td>{{ fabbricato.ownpercentage }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="terreni_view">
      <v-card class="my-6">
        <v-card-title>
          <v-list-item-icon>
            <DocsIcon />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="headline">Terreni</v-list-item-title>
          </v-list-item-content>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Foglio</th>
                  <th class="text-left">Particella</th>
                  <th class="text-left">Sub</th>
                  <th class="text-left">Zona cens</th>
                  <th class="text-left">Categoria</th>
                  <th class="text-left">Classe</th>
                  <th class="text-left">Consistenza</th>
                  <th class="text-left">Rendita</th>
                  <th class="text-left">Indirizzo</th>
                  <th class="text-left">Percentuale</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="terreno in terreni" :key="terreno.propertyid">
                  <td>{{ terreno.sheet }}</td>
                  <td>{{ terreno.parcel }}</td>
                  <td>{{ terreno.subordinate }}</td>
                  <td>{{ terreno.zone}}</td>
                  <td>{{ terreno.category }}</td>
                  <td>{{ terreno.class }}</td>
                  <td>{{ terreno.consistency }}</td>
                  <td>{{ terreno.cadastralincome }}</td>
                  <td>{{ terreno.address }}</td>
                  <td>{{ terreno.ownpercentage }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { DateFormatBasic } from "../../util";
import DocsIcon from "../../components/DocsIcon";
export default {
  name: "Catasto",
  components: { DocsIcon },
  methods: {
    DateFormatBasic
  },
  computed: {
    fabbricati() {
      return this.$store.state.smartdata.catasto
        ? this.$store.state.smartdata.catasto.builds
        : [];
    },
    terreni() {
      return this.$store.state.smartdata.catasto
        ? this.$store.state.smartdata.catasto.lands
        : [];
    },
    terreni_view() {
      return this.terreni.length > 0;
    },
    fabbricati_view() {
      return this.fabbricati.length > 0;
    }
  },
  beforeCreate() {
    this.$store.dispatch("smartdata/catasto");
  }
};
</script>