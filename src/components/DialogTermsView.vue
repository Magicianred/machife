<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Termini e condizioni</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div v-html="text"></div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Chiudi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogTermsView",
  components: {},
  data() {
    return {
      services_channels: ["push", "email", "sms"],
      preferences: {},
      services: []
    };
  },
  computed: {
    open() {
      this.init();
      return this.$store.state.generic.terms_dialog;
    },
    text(){
      return this.$store.state.notifier.terms
    }
  },
  methods: {
    close() {
      this.$store.dispatch("terms_dialog_hide");
    },
    async init() {
      this.$store.dispatch("notifier/get_terms");
    }
  }
};
</script>