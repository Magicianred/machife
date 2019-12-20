<template>
  <div style="background-color:#fafafa">
    <v-col cols="6" class="px-0">
      <v-card class>
        <v-card-text class="pb-0">
          <v-combobox
            v-model="select"
            :items="items"
            label="Anno di emissione/Pagamento"
            multiple
            chips
          ></v-combobox>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" class="px-0 mt-6">
      <v-card>
        <v-card-title>
          <v-list-item>
            <v-list-item-icon>
              <MoneyIcon />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline">Pagamenti</v-list-item-title>
              <v-list-item-subtitle>I dati vengono aggiornati ogni 6 ore</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Data</th>
                  <th class="text-left">Luogo</th>
                  <th class="text-left">Ente</th>
                  <th class="text-left">Servizio</th>
                  <th class="text-left">Anno</th>
                  <th class="text-left">Nr. Documento</th>
                  <th class="text-left">Importo</th>
                  <th class="text-left">Data notifica</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(pagamento, n) in pagamenti">
                  <tr :key="n" v-if="filterYear(pagamento.year)">
                    <td>{{DateFormatBasic(pagamento.actualpaymentdate)}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{pagamento.year}}</td>
                    <td></td>
                    <td>{{pagamento.amount}} €</td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" class="pa-0 mt-6">
      <v-card>
        <v-card-title>
          <v-list-item>
            <v-list-item-icon>
              <MoneyIcon />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline">Importi dovuti</v-list-item-title>
              <v-list-item-subtitle>I dati vengono aggiornati ogni 6 ore</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>
        <v-card-text>
          <template v-for="(importo, n) in importi">
            <div :key="n">
              <div class="body-1 my-2">
                <v-icon class="mt-n1 red--text">mdi-chevron-right</v-icon>
                <b>Categoria:</b>
                {{importo.categorytari}} - {{importo.categorytaridescription}}
                <b>Indirizzo:</b>
                {{importo.address}}
                <b>Piano:</b>
                {{importo.floor}}
                <b>Nui:</b>
                {{importo.housingnumber}}
              </div>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Anno</th>
                      <th class="text-left">Avviso</th>
                      <th class="text-left">Tributo</th>
                      <th class="text-left">Superfici</th>
                      <th class="text-left">Componenti</th>
                      <th class="text-left">Importo lordo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(data, n) in importo.detailAmount">
                      <tr :key="n" v-if="filterYear(data['tax year'])">
                        <td>{{ data['tax year'] }}</td>
                        <td>{{ data.typology}}</td>
                        <td>{{ data.taxdescription}}</td>
                        <td>{{ data.surface }}</td>
                        <td>{{ data.numbertot }}</td>
                        <td>{{ data.grosstaxable }}</td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" class="pa-0 mt-6">
      <v-card>
        <v-card-title>
          <v-list-item>
            <v-list-item-icon>
              <MoneyIcon />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline">Sgravi</v-list-item-title>
              <v-list-item-subtitle>I dati vengono aggiornati ogni 6 ore</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>
        <v-card-text>
          <template v-for="(sgravio, n) in sgravi" >
            <div :key="n" v-if="filterYear(sgravio['year'])">
              <div class="body-1 my-2">
                <v-icon class="mt-n1 red--text">mdi-chevron-right</v-icon>
                <b>Categoria:</b>
                {{sgravio.categorytari}} - {{sgravio.categorytaridescription}}
                <b>Indirizzo:</b>
                {{sgravio.address}}
                <b>Piano:</b>
                {{sgravio.floor}}
                <b>Nui:</b>
                {{sgravio.housingnumber}}
              </div>
              <v-simple-table v-if="filterYear(sgravio['year'])">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Anno imposta</th>
                      <th class="text-left">Avviso</th>
                      <th class="text-left">Descrizione</th>
                      <th class="text-left">Importo lordo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(data, n) in sgravio.taxbreakDetails">
                      <tr :key="n">
                        <td>{{ data['taxyear'] }}</td>
                        <td>{{ data.noticetype}}</td>
                        <td>{{ data.taxreliefdescription}}</td>
                        <td>{{ data.grosstaxable }}</td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import { DateFormatBasic } from "../../util";
import MoneyIcon from "../../components/MoneyIcon";

export default {
  name: "Pagamenti",
  components: { MoneyIcon },
  data() {
    return {
      dialog: false,
      select: [],
      items: []
    };
  },
  methods: {
    DateFormatBasic,
    openDetails(id, details) {
      this.details.title = "UTENZA ID " + id;
      this.details.table_data = [...details];
      this.dialog = true;
    },
    filterYear(year) {
      return this.select.length == 0 ? true : this.select.indexOf(year) !== -1;
    },
    pushYear(year) {
      if (this.items.indexOf(year) === -1) this.items.push(year);
    }
  },
  computed: {
    pagamenti() {
      let payments = this.$store.state.smartdata.tari
        ? this.$store.state.smartdata.tari.payments
        : [];
      payments.forEach(p => {
        this.pushYear(p.year);
      });
      return payments;
    },
    importi() {
      let amounts = this.$store.state.smartdata.tari
        ? this.$store.state.smartdata.tari.amounts
        : [];
      amounts.forEach(a => {
        a.detailAmount.forEach(d => {
          this.pushYear(d["tax year"]);
        });
      });
      return amounts;
    },
    sgravi() {
      let taxbreaks = this.$store.state.smartdata.tari
        ? this.$store.state.smartdata.tari.taxbreaks
        : [];
      taxbreaks.forEach(a => {
          this.pushYear(a["year"]);
      });
      return taxbreaks;
    }
  }
};
</script>