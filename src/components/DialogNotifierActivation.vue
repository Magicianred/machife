<template>
  <v-dialog v-model="open" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Attiva Notifiche</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
          <v-btn dark text @click="save">Save</v-btn>
        </v-toolbar-items>-->
      </v-toolbar>
      <v-stepper v-model="actual_step">
        <v-stepper-header>
          <v-stepper-step :complete="actual_step > 1" step="1">Termini e condizioni</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="actual_step > 2" step="2">Contatti</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Configurazione notifiche</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <div class="h100vh-200" style="overflow:auto">
            <v-stepper-content class="pa-0" step="1">
              <v-container>
                <v-col xs="12" md="8"  class="ma-auto">
                  <div class="display-1 py-8">Termini e condizioni</div>
                  <span v-html="terms_text"></span>
                  <v-checkbox
                    v-model="conditions"
                    class="mx-2"
                    label="Ho letto e accetto le condizioni"
                  ></v-checkbox>
                </v-col>
              </v-container>
            </v-stepper-content>

            <v-stepper-content class="pa-0" step="2">
              <v-container>
                <v-col xs="12" md="8" class="ma-auto">
                  <div class="display-1 py-4">Contatti</div>
                  <v-alert border="left" colored-border type="info" elevation="2">
                    Per ricevere le notifiche via mail o SMS devi inserire almeno l'indirizzo email.
                    L'indirizzo email e il numero di telefono mobile saranno salvati nel tuo profilo personale e saranno validi come contatto unico per i servizi online della PA piemontese che prevedono l'invio di notifiche.
                  </v-alert>
                  <v-list>
                    <v-divider></v-divider>
                    <v-list-item @click="openEmailDialog">
                      <v-list-item-icon>
                        <v-icon class="blue-icon">mdi-email</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="openPhoneDialog">
                      <v-list-item-icon>
                        <v-icon class="blue-icon">mdi-cellphone</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>Cellulare</v-list-item-title>
                        <v-list-item-subtitle>{{phone}}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-list>
                </v-col>
              </v-container>
            </v-stepper-content>

            <v-stepper-content class="pa-0" step="3">
              <v-container>
                <v-col xs="12" md="8" class="ma-auto">
                  <div class="display-1 py-4">Configurazione servizi</div>
                  <div>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left"></th>
                            <template v-for="value in services_channels">
                              <th :key="value" class="text-left">{{value}}</th>
                            </template>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="service in services" :key="service.uuid">
                            <td>{{service.name | mapServiceName}}</td>
                            <template v-for="(channel, n) in service.channels_array">
                              <td
                                :key="n"
                                @click="togglePreferredServiceChannel(service.name, channel.value)"
                              >
                                <span v-if="!channel.exists"></span>
                                <v-icon
                                  v-else-if="channel.value=='push'"
                                  class="blue-icon"
                                  :disabled="!isPreferredServiceChannel(service.name, channel.value)"
                                >mdi-cellphone</v-icon>
                                <v-icon
                                  v-else-if="channel.value=='email'"
                                  class="blue-icon"
                                  :disabled="!isPreferredServiceChannel(service.name, channel.value)"
                                >mdi-email</v-icon>
                                <v-icon
                                  v-else-if="channel.value=='sms'"
                                  class="blue-icon"
                                  :disabled="!isPreferredServiceChannel(service.name, channel.value)"
                                >mdi-message</v-icon>
                              </td>
                            </template>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-col>
              </v-container>
            </v-stepper-content>
          </div>
        </v-stepper-items>
        <v-card class="text-center" height="64px">
          <v-btn
            style="margin-top:14px;margin-right:2px"
            color="secondary"
            :disabled="!(actual_step>1)"
            @click="actual_step = actual_step - 1"
          >Indietro</v-btn>

          <v-btn
            v-if="actual_step<3"
            style="margin-top:14px;margin-left:2px"
            color="primary"
            :disabled="!is_step_ok(actual_step)"
            @click="actual_step = actual_step + 1"
          >Avanti</v-btn>
          <v-btn
            v-if="actual_step==3"
            style="margin-top:14px;margin-left:2px"
            color="primary"
            :disabled="!is_step_ok(actual_step)"
            @click="save"
          >Salva</v-btn>
        </v-card>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
const uuid = require("uuid/v4");
const cloneDeep = require("lodash/cloneDeep");
export default {
  name: "DialogEmailUpdate",
  components: {},
  data() {
    return {
      dialog: true,
      actual_step: 1,
      conditions: false,
      services_channels: ["push", "email", "sms"],
      preferences: {},
      services: []
    };
  },
  computed: {
    open() {
      this.init();
      return this.$store.state.generic.stepper_dialog;
    },
    email() {
      return this.$store.state.generic.new_email || "Inserisci email";
    },
    phone() {
      return this.$store.state.generic.new_phone || "Inserisci cellulare";
    },
    terms_text() {
      return this.$store.state.notifier.terms;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("stepper_dialog_hide");
    },
    save() {
      let contacts = {
        ...this.$store.state.notifier.contacts,
        user_id:this.$store.state.generic.user_id,
        sms: this.$store.state.generic.new_phone || null,
        email: this.$store.state.generic.new_email || null
      };
      let prefs = {};
      let push = {};
      for (let service in this.preferences) {
        if (service == undefined) continue;
        let service_configuration = this.preferences[service];
        prefs[service] = Object.keys(service_configuration)
          .filter(channel => service_configuration[channel])
          .join(",");
        if (this.$store.state.generic.push_token)
          push[service] = [this.$store.state.generic.push_token];
      }
      if (this.$store.state.generic.push_token) contacts["push"] = push;
      this.$store
        .dispatch("notifier/profile_init", { contacts, prefs })
        .then(bool => {
          if (bool) {
            this.$store.dispatch("notifier/get_terms_accepted");
            this.$store.dispatch("dispatch_message", {
              text: "Configurazione notifiche terminata"
            });
            this.$store.dispatch("stepper_dialog_hide");
            this.$store.dispatch('messages/get_to_read')
          }
        });
    },
    is_step_ok(actual_step) {
      switch (actual_step) {
        case 1:
          return this.conditions;
        case 2:
          return Boolean(
            this.$store.state.generic.new_email ||
              (this.$store.state.notifier.contacts
                ? this.$store.state.notifier.contacts.email
                : null)
          );
        case 3:
          return true;
        default:
          return false;
      }
    },
    isPreferredServiceChannel(service, channel) {
      if (this.preferences[service]) {
        return this.preferences[service][channel];
      } else {
        return false;
      }
    },
    togglePreferredServiceChannel(service, channel) {
      this.preferences = {
        ...this.preferences,
        [service]: {
          ...this.preferences[service],
          [channel]: this.preferences[service]
            ? !this.preferences[service][channel]
            : true
        }
      };
    },
    openEmailDialog() {
      this.$store.dispatch("email_dialog_show");
    },
    openPhoneDialog() {
      this.$store.dispatch("phone_dialog_show");
    },
    set_preferences(preferences) {
      this.preferences = {};
      preferences.forEach(p => {
        this.preferences[p.service_name] = {};
        this.services_channels.forEach(value => {
          let service_channels = p.channels.split(",");
          this.preferences[p.service_name][value] =
            service_channels.indexOf(value) != -1;
        });
      });
    },
    set_services(services) {
      this.services = services.map(s => {
        s.channels_array = this.services_channels.map(v => {
          let service_channels = s.channels.split(",");
          let object = { value: v };
          object.exists = service_channels.indexOf(v) != -1;
          return object;
        });
        return s;
      });
    },
    async init() {
      this.actual_step = 1;
      this.$store.commit("new_email", "");
      this.$store.commit("new_phone", "");
      this.conditions = false;
      this.$store.dispatch("notifier/get_contacts", true);
      this.$store.dispatch("notifier/get_terms");
      let [services, preferences] = await Promise.all([
        this.$store.dispatch("notifier/get_services"),
        this.$store.dispatch("notifier/get_preferences")
      ]);
      if (preferences) this.set_preferences(preferences); 
      else this.preferences={}
      if (services) this.set_services(services);
    }
  }
};
</script>