<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card v-if="!pinStep">
      <v-card-title>
        <span class="headline">Inserisci un nuovo numero di cellulare</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="phone"
                label="Cellulare"
                prepend-inner-icon="mdi-cellphone"
                :rules="phoneValidation"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="close">Chiudi</v-btn>
        <v-btn color="primary" text @click="confirm" :disabled="false">Conferma</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <span class="headline">Inserisci il pin ricevuto al numero indicato</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="pin" label="Pin" prepend-inner-icon="mdi-lock-question"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="back">Indietro</v-btn>
        <v-btn color="primary" text @click="verify">Salva</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogPhoneUpdate",
  components: {},
  data() {
    return {
      dialog: true,
      phone: "",
      pin: "",
      phoneValidation: [v => /^0039\d+/.test(v) || "Example 0039..."],
      pinStep: null
    };
  },
  computed: {
    open() {
      return this.$store.state.generic.phone_dialog;
    },
    pinConfirmation() {
      return this.$store.state.notifier.phone_pin;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("phone_dialog_hide");
    },
    back() {
      this.pin = "";
      this.pinStep = false;
    },
    confirm() {
      this.$store.dispatch("notifier/get_pin_sms", this.phone);
      this.pinStep = true;
    },
    async verify() {
      let response = await this.$store.dispatch("notifier/verify_pin_sms", {
        pin: this.pin,
        phone: this.phone
      });
      if (response.verified) {
        if (this.$store.state.notifier.terms_accepted) {
          this.$store
            .dispatch("notifier/renew_contact", { sms: this.phone })
            .then(response => {
              this.pinStep = false;
              this.phone = "";
              this.pin = "";
              this.close();
            });
        } else {
          this.$store.commit("new_phone", this.phone);
          this.pinStep = false;
          this.phone = "";
          this.pin = "";
          this.close();
        }
      } else {
        this.pin = "";
        this.$store.dispatch("dispatch_message", { text: "Pin errato" });
      }
    }
  }
};
</script>