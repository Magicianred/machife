<template>
  <v-bottom-sheet inset :value="model" persistent>
    <v-sheet class="white--text" :color="color||'blue darken-4'">
      <v-container>
        <v-row>
          <v-col class="text-center" :cols="image_cols" v-if="img">
            <v-avatar size="72">
              <img :src="logo" />
            </v-avatar>
          </v-col>
          <v-col :cols="text_cols" class="my-auto py-5">
            <div class="title" v-if="title" v-html="title"></div>
            <div
              v-if="text"
              class="body-1"
              v-html="text"
            ></div>
          </v-col>
          <v-col :cols="button_cols" class="my-auto text-right pr-5">
            <v-btn v-if="link" class="mr-2 white--text" outlined :href="link" target="_blank">vedi</v-btn>
            <v-btn @click="close" :outlined="!link" :text="link" class="white--text">chiudi</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <!-- <v-card tile>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="'https://mio.torinofacile.it/app/assets/icons/icon-72x72.png'"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>The Walker</v-list-item-title>
            <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon>
            <v-btn outlined>vedi</v-btn>
          </v-list-item-icon>
          <v-list-item-icon class="ml-2">
            <v-btn outlined>chiudi</v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>-->
  </v-bottom-sheet>
</template>

<script>
import logo from '../assets/machi_logo.png'

export default {
  name: "BottomSheet",
  components: {},
  data() {
    return {
      timeout: null,
      logo
    };
  },
  computed: {
    image_cols() {
      let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
      if (xs) return 3;
      else return sm || md ? 2 : 1;
    },
    text_cols() {
      if (this.img) {
        let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
        if (xs) return 9;
        else return sm || md ? 10 : 8;
      } else {
        let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
        if (xs) return 12;
        else return sm || md ? 12 : 9;
      }
    },
    button_cols() {
      let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
      return xs || sm || md ? 12 : 3;
    },
    model() {
      this.inputControl(this.$store.state.generic.snackbar_message);
      return this.$store.state.generic.snackbar_message;
    },
    title() {
      return this.model ? this.model.title : null;
    },
    text() {
      return this.model ? this.model.text : null;
    },
    img() {
      return this.model ? this.model.img : null;
    },
    link() {
      return this.model ? this.model.link : null;
    },
    color() {
      return this.model ? this.model.color : null;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("dispatch_message", null);
    },
    inputControl(model) {
      if (model && model.timeout !== 0) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.close();
        }, model.timeout || 5000);
      } else if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }
};
</script>