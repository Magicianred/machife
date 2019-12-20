<template>
  <v-card class="mx-auto pa-5">
    <v-card-title>
      <div style="width:100%">
        Documenti recenti
        <router-link class="float-right" style="text-decoration:none" to="/documenti">
          <span class="body-2 font-weight-bold">Vedi tutti</span>
        </router-link>
        <div class="title-divider-5"></div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">File</th>
              <th class="text-left">Scope</th>
              <th class="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, i) in docs" :key="i">
              <td>
                <v-icon class="mt-n1 blue-icon">{{doc.file.icon}}</v-icon>
                {{doc.file.name}}
              </td>
              <td>{{ doc.scope }}</td>
              <td>{{ doc.date }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Tabs from "../components/Tabs";

export default {
  name: "DocumentHomeCard",
  components: {
    Tabs
  },
  data() {
    return {
      docs: [
        {
          file: {
            icon: "mdi-file-document",
            name: "scuola.pdf"
          },
          scope: "scuola",
          date: "19/09/2019"
        },
        {
          file: {
            icon: "mdi-file-document",
            name: "anagrafe.doc"
          },
          scope: "anagrafe",
          date: "19/09/2019"
        },
        {
          file: {
            icon: "mdi-file-document",
            name: "Documento 2.doc"
          },
          scope: "tasse e tributi",
          date: "19/09/2019"
        },
        {
          file: {
            icon: "mdi-file-document",
            name: "Documento 2.pdf"
          },
          scope: "scuola",
          date: "19/09/2019"
        },
        {
          file: {
            icon: "mdi-file-document",
            name: "Documento 3.doc"
          },
          scope: "anagrafe",
          date: "19/09/2019"
        }
      ]
    };
  }
};
</script>