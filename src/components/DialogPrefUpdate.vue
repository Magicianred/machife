<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Modifica le preferenze</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
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
                            style="cursor:pointer"
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
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="close">Chiudi</v-btn>
        <v-btn color="primary" text @click="save" :disabled="false">Salva</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogPrefUpdate",
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
      return this.$store.state.generic.pref_dialog;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("pref_dialog_hide");
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
      let [services, preferences] = await Promise.all([
        this.$store.dispatch("notifier/get_services"),
        this.$store.dispatch("notifier/get_preferences")
      ]);
      if (preferences) this.set_preferences(preferences);
      if (services) this.set_services(services);
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
    save() {
      let prefs = {};
      for (let service in this.preferences) {
        if (service == undefined) continue;
        let service_configuration = this.preferences[service];
        prefs[service] = Object.keys(service_configuration)
          .filter(channel => service_configuration[channel])
          .join(",");
      }
      this.$store.dispatch("notifier/update_preferences", prefs).then(OK => {
        this.$store.dispatch('dispatch_message', {text:'Preferenze modificate'})
        this.$store.dispatch("pref_dialog_hide");
      });
    }
  }
};
</script>