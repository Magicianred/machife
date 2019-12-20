<template>
  <div>
    <Tabs title="Documenti" />
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <v-row class="pa-6" justify="center" no-gutters>
        <v-col cols="12">
          <v-data-table
            :headers="[
                {text:'NOME FILE', value:'file', sort:(a, b)=>a.name.localeCompare(b.name)},
                {text:'AMBITO', value:'scope'},
                {text:'DATA', value:'date'},
            ]"
            :items="[
              {
                file:{
                  icon:'mdi-file-document',
                  name:'scuola.pdf'
                },
                scope:'scuola',
                date:'19/09/2019'
              },
              {
                file:{
                  icon:'mdi-file-document',
                  name:'anagrafe.doc'
                },
                scope:'anagrafe',
                date:'19/09/2019'
              },
              {
                file:{
                  icon:'mdi-file-document',
                  name:'Documento 2.doc'
                },
                scope:'tasse e tributi',
                date:'19/09/2019'
              },
              {
                file:{
                  icon:'mdi-file-document',
                  name:'Documento 2.pdf'
                },
                scope:'scuola',
                date:'19/09/2019'
              },
              {
                file:{
                  icon:'mdi-file-document',
                  name:'Documento 3.doc'
                },
                scope:'anagrafe',
                date:'19/09/2019'
              }
            ]"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.file="{ item }">
              <v-icon class="mt-n1 blue-icon">{{item.file.icon}}</v-icon>
              {{item.file.name}}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Tabs from "../components/Tabs";

export default {
  name: "Docs",
  components: {
    Tabs
  }
};
</script>