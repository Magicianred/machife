<template>
  <v-bottom-sheet v-model="visible" inset persistent scrollable no-click-animation>
    <v-card>
      <v-system-bar dark color="primary">
        <v-icon>mdi-message</v-icon>
        <span>{{limit}} nuovi messaggi</span>
        <v-spacer></v-spacer>
        <v-icon @click="hide">mdi-close</v-icon>
      </v-system-bar>
      <v-card-text style="height:300px" class="py-0 px-0">
        <v-list-item-group>
          <template v-for="index in limit">
            <v-list-item :key="'a_'+index">
              <template>
                <v-list-item-content>
                  <v-list-item-subtitle v-text="item.headline"></v-list-item-subtitle>
                  <v-list-item-title class="my-2 subtitle-2" v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle class="text--primary" v-text="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                  <!-- <div>
                  <v-btn text icon>
                    <v-icon>mdi-eye-outline</v-icon>
                  </v-btn>-->
                  <v-btn text icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                  <!-- </div> -->
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider v-if="index + 1 <= limit" :key="'b_'+index"></v-divider>
          </template>

          <div class="text-center py-3">
            <v-btn text>vedi tutti</v-btn>
          </div>
        </v-list-item-group>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "NewMessages",
  components: {},
  computed: {
    visible() {
      return this.$store.state.persistent.bottom_sheet;
    }
  },
  data: () => ({
    item: {
      action: new Date().toLocaleString(),
      headline: "Tipologia",
      title: "Oggetto della comunicazione",
      subtitle:
        "Testo della comunicazione in cui puoi leggere le comunicazioni dagli enti che aderiscono ai servizi"
    },
    limit: 5
  }),
  methods: {
    show() {
      this.$store.dispatch("persistent/bottom_sheet_show");
    },
    hide() {
      this.$store.dispatch("persistent/bottom_sheet_hide");
    }
  }
};
</script>