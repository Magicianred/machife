<template>
  <v-snackbar :color="model?model.color||'blue darken-4':'blue darken-4'" :value="model" v-on="{input:inputControl}" :timeout="0">
    <v-img v-if="model?model.img:false" src="https://mio.torinofacile.it/app/assets/icons/icon-72x72.png"></v-img>
    <span v-if="model && (model.title || model.text)" v-html="(model && model.title?model.title+'<br/>':'')+(model && model.text?model.text:'')">
    </span>
    <v-btn v-if="model?model.link:false" :href="model.link" text>Vedi</v-btn>
    <v-btn text @click="close">Chiudi</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  components: {},
  data() {
    return {
      snackbar: true,
      timeout: null
    };
  },
  computed: {
    model() {
      return this.$store.state.generic.snackbar_message;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("dispatch_message", null);
    },
    inputControl(v) {
      if (v && this.model.timeout !== 0) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.close();
        }, this.model.timeout || 5000);
      } else if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }
};
</script>