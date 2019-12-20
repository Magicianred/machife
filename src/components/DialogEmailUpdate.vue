<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card v-if="!pinStep">
      <v-card-title>
        <span class="headline">Inserisci una nuova email</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="emailValidation"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="close">Chiudi</v-btn>
        <v-btn
          color="primary"
          text
          @click="confirm"
          :disabled="!this.emailRegex.test(email)"
        >Conferma</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <span class="headline">Inserisci il pin ricevuto all'indirizzo indicato</span>
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
  name: "DialogEmailUpdate",
  components: {},
  data() {
    return {
      dialog: true,
      email: "",
      pin: "",
      emailRegex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      emailValidation: [
        v => this.emailRegex.test(v) || "Inserisci un indirizzo valido"
      ],
      pinStep: null
    };
  },
  computed: {
    open() {
      return this.$store.state.generic.email_dialog;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("email_dialog_hide");
    },
    back() {
      this.pin = "";
      this.pinStep = false;
    },
    confirm() {
      this.$store.dispatch("notifier/get_pin_email", this.email);
      this.pinStep = true;
    },
    async verify() {
      let response = await this.$store.dispatch("notifier/verify_pin_email", {
        pin: this.pin,
        email: this.email
      });
      if (response.verified) {
        if (this.$store.state.notifier.terms_accepted) {
          this.$store.dispatch("notifier/renew_contact", {email:this.email}).then(response=>{
            this.pinStep = false;
            this.pin = "";
            this.email = "";
            this.close();
          })
        } else {
          this.$store.commit("new_email", this.email);
          this.pin = "";
          this.email = "";
          this.pinStep = false;
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