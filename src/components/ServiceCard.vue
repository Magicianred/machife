<template>
  <v-card class height="344">
    <v-img class="white--text" height="150px" :src="img"></v-img>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{category}}
          <v-icon
            v-if="favorite"
            style="float:right; position:relative; top:-5px;right:-5px"
            class="mr-1"
            color="yellow"
            @click="toggleFavorite"
          >mdi-star</v-icon>
          <v-icon
            v-else
            style="float:right; position:relative; top:-5px;right:-5px"
            class="mr-1"
            color="yellow"
            @click="toggleFavorite"
          >mdi-star-outline</v-icon>
        </div>
        <v-list-item-title class="font-weight-medium mb-3">{{title}}</v-list-item-title>
        <v-list-item-subtitle
          style="-webkit-line-clamp:4;"
        >{{text}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions style="position:absolute;bottom:0">
      <a class="ml-2  font-weight-bold" :href="link" target="_blank" style="text-decoration:none">
        Vai al servizio
      </a>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ServiceCard",
  data: () => ({
    model: null
  }),
  props: {
    category: String,
    text: String,
    title: String,
    link: String,
    img: String,
    favorite: null,
    service_id: Number,
  },
  methods: {
    toggleFavorite() {
      this.$store.dispatch("toggle_favorite", this.service_id).then(() => {
        this.$store.dispatch("get_services");
      });
    }
  }
};
</script>