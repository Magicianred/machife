<template>
  <div>
    <Tabs title="Comunicazioni"/>
    <v-container class="padded-wb-25-80 hmin100vh-64">
      <v-row class="pa-6" justify="center" no-gutters>
        <v-col cols="12">
          <Messages :subtitle="to_read>0? to_read+' messaggio da leggere':''" loadmore />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Messages from "../components/Messages";
import Tabs from "../components/Tabs";

export default {
  name: "MessagesPage",
  components: {
    Messages,
    Tabs
  },
  computed: {
    tab_items() {
      return [
        {
          id: 1,
          text: "Generiche",
          active: true
        },
        {
          id: 2,
          text: "Appuntamenti",
          active: true
        }
      ].filter(x => x.active);
    },
    to_read(){
      return parseInt(this.$store.state.messages.total_to_read)
    }
  }
};
</script>
