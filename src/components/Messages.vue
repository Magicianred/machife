<template>
  <div>
    <v-card class="mx-auto pa-5">
      <v-card-title class="pb-0">
        <div style="width:100%">
          {{title}}
          <div v-if="subtitle" class="body-1">{{subtitle}}</div>
          <router-link
            v-if="link"
            class="float-right"
            style="text-decoration:none"
            :to="link.route"
          >
            <span class="body-2 font-weight-bold">{{link.name}}</span>
          </router-link>
          <div v-if="title||subtitle" class="title-divider-5"></div>
        </div>
      </v-card-title>

      <v-list two-line>
        <!-- <v-list-item-group> -->
        <v-container v-if="messages.length==0" class="text-center pa-10">
          <v-row>
            <v-col class="ma-auto">Nessun messaggio presente</v-col>
          </v-row>
        </v-container>

        <template v-for="(message, index) in messages">
          <v-list-item

            :key="message.id"
            :class="[{'light-blue':!Boolean(message['read_at'])}, {' lighten-5':!Boolean(message['read_at'])}]"
          >
            <template>
              <v-list-item-content @click="expandMessage(message.id)" style="cursor:pointer">
                <!-- <v-list-item-subtitle
                v-text="message.tag"
                :class="[{'text--primary':!Boolean(message['read_at'])}]"
                ></v-list-item-subtitle>-->
                <v-list-item-title
                  :class="[{'my-2':true}, {'subtitle-2':true}, {'blue--text':!Boolean(message['read_at'])}]"
                  v-html="message.mex.title"
                ></v-list-item-title>
                <!-- <v-list-item-subtitle
                :style="{'white-space':isNormal(message.id)}"
                :class="[{'text--primary':true}, {'elevation-4':isOver(message.id)}, {'pa-2':isOver(message.id)}, {'font-weight-bold':!Boolean(message['read_at'])}]"
                @mouseout="messageOut(message.id)"
                @mouseover="messageOver(message.id)"
                v-text="message.mex.body"
                ></v-list-item-subtitle>-->
                <v-list-item-subtitle
                  :style="{'white-space':isNormal(message.id)}"
                  :class="[{'text--primary':true}]"
                  @mouseout="messageOut(message.id)"
                  @mouseover="messageOver(message.id)"
                  v-html="message.mex.body"
                ></v-list-item-subtitle>
                <div v-if="message.mex.call_to_action" class="text-right pr-3 pt-3">
                  <v-btn
                    color="primary"
                    class="text-capitalize white--text"
                    :href="message.mex.call_to_action"
                    target="_blank"
                    small
                  >vai</v-btn>
                </div>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="$options.filters.timestampFormat(message.timestamp)"
                ></v-list-item-action-text>
                <div>
                  <!-- <v-tooltip v-if="!Boolean(message['read_at'])" top open-delay="1000">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" text icon @click="read(message.id)">
                        <v-icon>mdi-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Segna come letto</span>
                  </v-tooltip>
                  <v-tooltip v-else top open-delay="1000">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" text icon @click="notread(message.id)">
                        <v-icon>mdi-eye-off-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Segna come non letto</span>
                  </v-tooltip>-->
                  <v-btn text icon @click="openDeleteConfirmationDialog(message.id)">
                    <v-icon class="blue-icon">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < messages.length-1" :key="'divider_'+message.id"></v-divider>
        </template>
        <!-- </v-list-item-group> -->
      </v-list>
      <v-card-actions v-if="messages.length>0 && loadmore" class="justify-center">
        <v-btn text icon @click="getMore">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog :value="message_id_to_delete" max-width="500">
      <v-card>
        <v-card-title class="headline">Desideri cancellare questo messaggio?</v-card-title>

        <v-card-text>Scegliendo questa opzione non visualizzarai più il messaggio selezionato</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="message_id_to_delete = null">Annulla</v-btn>

          <v-btn color="secondary" text @click="deleteMessage">Conferma</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data: () => ({
    whiteSpaces: {},
    hovers: {},
    message_id_to_delete: null
  }),
  props: {
    title: String,
    link: Object,
    loadmore: {
      type: Boolean,
      default: false
    },
    subtitle: String,
    useLimit: Boolean
  },
  computed: {
    messages() {
      return this.$store.state.messages.messages;
    },
    limit() {
      return this.$store.state.generic.homepage_communications;
    }
  },
  created() {
    this.$store.dispatch('messages/get_to_read');
    this.$store.dispatch(
      "messages/get_messages",
      this.useLimit ? this.limit : null
    );
  },
  methods: {
    getMore() {
      this.$store.dispatch("messages/get_more");
    },
    expandMessage(id) {
      if (!this.whiteSpaces[id]) this.read(id);
      this.whiteSpaces = {
        ...this.whiteSpaces,
        [id]: !this.whiteSpaces[id]
      };
      this.hovers = {
        ...this.hovers,
        [id]: false
      };
    },
    isNormal(id) {
      return this.whiteSpaces[id] ? "normal" : "nowrap";
    },
    linkable(id) {
      return this.whiteSpaces[id] ? true : false;
    },
    isOver(id) {
      return this.hovers[id];
    },
    messageOver(id) {
      if (!this.whiteSpaces[id])
        this.hovers = {
          ...this.hovers,
          [id]: true
        };
    },
    messageOut(id) {
      this.hovers = {
        ...this.hovers,
        [id]: false
      };
    },
    read(id) {
      this.$store.dispatch("messages/read_message", id);
    },
    notread(id) {
      this.$store.dispatch("messages/not_read_message", id);
    },
    deleteMessage() {
      this.$store
        .dispatch("messages/delete_message", this.message_id_to_delete)
        .then(bool => {
          if (bool) this.message_id_to_delete = false;
        });
    },
    openDeleteConfirmationDialog(id) {
      this.message_id_to_delete = id;
    }
  },
};
</script>

<style scoped>
</style>
