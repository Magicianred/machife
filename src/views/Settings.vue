<template>
  <div>
    <Tabs title="Impostazioni" />
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <v-sheet elevation="4" class="pa-6 mt-8">
        <div class="title">Impostazioni Notifiche</div>

        <v-list two-line subheader>
          <template v-if="terms_and_condition">
            <v-list-item @click="openEmailDialog">
              <v-list-item-avatar>
                <v-icon class="blue-icon">mdi-email</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-btn icon @click="openEmailDialog"> -->
                <v-icon color>mdi-chevron-right</v-icon>
                <!-- </v-btn> -->
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="openPhoneDialog">
              <v-list-item-avatar>
                <v-icon class="blue-icon">mdi-cellphone</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Numero di cellulare</v-list-item-title>
                <v-list-item-subtitle>{{phone}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon color>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="openPrefDialog">
              <v-list-item-avatar>
                <v-icon class="blue-icon">mdi-settings</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Preferenze di notifica</v-list-item-title>
                <!-- <v-list-item-subtitle>modifica</v-list-item-subtitle> -->
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="openTermsDialog">
              <v-list-item-avatar>
                <v-icon class="blue-icon">mdi-file-document</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Termini e condizioni</v-list-item-title>
                <!-- <v-list-item-subtitle>vedi</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <v-icon color>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="openDeleteConfirmationDialog">
              <v-list-item-avatar>
                <v-icon class="blue-icon">mdi-delete</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Elimina contatti</v-list-item-title>
                <!-- <v-list-item-subtitle>account</v-list-item-subtitle> -->
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="activeMessages">
              <v-list-item-avatar>
                <v-icon>mdi-message</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Attiva le notifiche</v-list-item-title>
                <!-- <v-list-item-subtitle>account</v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-sheet>
      <v-divider class="my-10"></v-divider>
      <v-sheet elevation="4" class="pa-6">
        <div class="title">Visualizza in homepage</div>
        <v-card class="mt-4" elevation="0" style="border: 1px solid rgba(0,0,0,0.1)">
          <v-card-text>
            <v-switch
              @click="set_comunication"
              :input-value="home_comunication"
              label="Comunicazioni"
            ></v-switch>
            <v-expand-transition>
              <div v-show="home_comunication">
                Quante comunicazioni desideri visualizzare?
                <v-radio-group :value="communications_number" row>
                  <v-radio
                    v-for="i in ['5','10','15']"
                    :key="i"
                    :label="i"
                    :value="i"
                    @click="setcommunicationsNumber($event, i)"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
        <v-card class="mt-4" elevation="0" style="border: 1px solid rgba(0,0,0,0.1)">
          <v-card-text>
            <v-switch @click="set_home_services" :input-value="home_services" label="Servizi"></v-switch>
            <v-expand-transition>
              <div v-show="home_services">
                Quanti servizi desideri visualizzare?
                <v-radio-group :value="services_number" row>
                  <v-radio
                    v-for="i in ['3','6','9']"
                    :key="i"
                    :label="i"
                    :value="i"
                    @click="setServicesNumber($event, i)"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
        <v-card class="mt-4" elevation="0" style="border: 1px solid rgba(0,0,0,0.1)">
          <v-card-text>
            <v-switch @click="set_docs" :input-value="home_docs" label="Documenti"></v-switch>
          </v-card-text>
        </v-card>
        <v-card class="mt-4" elevation="0" style="border: 1px solid rgba(0,0,0,0.1)">
          <v-card-text>
            <v-switch @click="set_curiosity" :input-value="home_curiosity" label="Curiosità"></v-switch>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-container>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Desideri eliminare i contatti?</v-card-title>

        <v-card-text>Scegliendo questa opzione perderai tutte le impostazione per le preferenze e le notifiche da e verso le altre applicazioni</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="dialog = false">Annulla</v-btn>

          <v-btn color="secondary" text @click="delete_notifier_profile">Conferma</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ServiceCard from "../components/ServiceCard";
import Tabs from "../components/Tabs";

export default {
  name: "Settings",
  data: () => ({
    preferences: {},
    services: [],
    services_channels: ["push", "email", "sms"],
    dialog: false,
    comunication_number: "5"
  }),
  components: {
    Tabs,
    ServiceCard
  },
  computed: {
    home_comunication() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.comunicazioni
        : false;
    },
    home_services() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.servizi
        : false;
    },
    home_docs() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.documenti
        : false;
    },
    home_curiosity() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.utente.homepage.curiosita
        : false;
    },
    email() {
      return this.$store.state.notifier.contacts
        ? this.$store.state.notifier.contacts.email
        : "";
    },
    phone() {
      return this.$store.state.notifier.contacts
        ? this.$store.state.notifier.contacts.sms
        : "";
    },
    terms_and_condition() {
      return this.$store.state.notifier.terms_accepted;
    },
    services_number() {
      return "" + this.$store.state.generic.homepage_services;
    },
    communications_number() {
      return "" + this.$store.state.generic.homepage_communications;
    }
  },
  methods: {
    set_home_services(event) {
      event.preventDefault();
      event.stopPropagation();
      let prefs = Object.assign(this.$store.state.settings.preferences, {});
      prefs.utente.homepage.servizi = !prefs.utente.homepage.servizi;
      this.$store.commit("settings/set_prefs", prefs);
    },
    set_docs(event) {
      event.preventDefault();
      event.stopPropagation();
      let prefs = Object.assign(this.$store.state.settings.preferences, {});
      prefs.utente.homepage.documenti = !prefs.utente.homepage.documenti;
      this.$store.commit("settings/set_prefs", prefs);
    },
    set_curiosity(event) {
      event.preventDefault();
      event.stopPropagation();
      let prefs = Object.assign(this.$store.state.settings.preferences, {});
      prefs.utente.homepage.curiosita = !prefs.utente.homepage.curiosita;
      this.$store.commit("settings/set_prefs", prefs);
    },
    set_comunication(event) {
      event.preventDefault();
      event.stopPropagation();
      let prefs = Object.assign(this.$store.state.settings.preferences, {});
      prefs.utente.homepage.comunicazioni = !prefs.utente.homepage
        .comunicazioni;
      this.$store.commit("settings/set_prefs", prefs);
    },
    openEmailDialog() {
      this.$store.dispatch("email_dialog_show");
    },
    openPhoneDialog() {
      this.$store.dispatch("phone_dialog_show");
    },
    set_preferences(preferences) {
      this.preferences = {};
      preferences ||
        [].forEach(p => {
          this.preferences[p.service_name] = {};
          this.services_channels.forEach(value => {
            let service_channels = p.channels.split(",");
            this.preferences[p.service_name][value] =
              service_channels.indexOf(value) != -1;
          });
        });
    },
    set_services(services) {
      this.services =
        services ||
        [].map(s => {
          s.channels_array = this.services_channels.map(v => {
            let service_channels = s.channels.split(",");
            let object = { value: v };
            object.exists = service_channels.indexOf(v) != -1;
            return object;
          });
          return s;
        });
    },
    delete_notifier_profile() {
      this.$store.dispatch("notifier/delete_user", text => {
        this.$store.dispatch("dispatch_message", { text });
        this.dialog = false;
      });
    },
    activeMessages() {
      this.$store.dispatch("stepper_dialog_show");
    },
    openPrefDialog() {
      this.$store.dispatch("pref_dialog_show");
    },
    openTermsDialog() {
      this.$store.dispatch("terms_dialog_show");
    },
    openDeleteConfirmationDialog() {
      this.dialog = true;
    },
    setServicesNumber(event, val) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.commit("set_homepage_services", val);
    },
    setcommunicationsNumber(event, val) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.commit("set_homepage_communications", val);
    }
  },
  async created() {
    this.$store.dispatch("notifier/get_contacts", true);
    this.$store.dispatch("notifier/get_terms");
    let [services, preferences] = await Promise.all([
      this.$store.dispatch("notifier/get_services"),
      this.$store.dispatch("notifier/get_preferences")
    ]);
    if (preferences) this.set_preferences(preferences);
    if (services) this.set_services(services);
  }
};
</script>
