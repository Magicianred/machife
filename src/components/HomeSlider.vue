<template>
  <v-slide-y-transition leave-absolute>
    <v-carousel hide-delimiters v-if="show" height="100vh" width="100vw">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-img :src="slide.img">
          <v-container
            style="height:100vh;width:100vw;display:flex;flex-direction:column;justify-content:center"
          >
            <v-col class="mx-auto" cols="6" align="center" justify="center">
              <v-row style="padding:0px 0px 80px 0px" align="center" justify="center">
                <img :src="logo" width="300" />
              </v-row>
              <v-row align="center" justify="center" ref="page_title">
                <div class="display-3 white--text" v-html="slide.title"></div>
                <div class="headline white--text" v-html="slide.subtitle"></div>
              </v-row>
              <v-row class="my-3" align="center" justify="center">
                <div>
                  <v-btn x-large outlined class="white--text" @click="sliderOff">Accedi</v-btn>
                </div>
              </v-row>
              <!-- <v-row class="my-3" align="center" justify="center">
                <div>
                  <a class="white--text" href="javascript:void(0)">Non mostrare più</a>
                </div>
              </v-row> -->
            </v-col>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-slide-y-transition>
</template>

<script>
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import logo from "../assets/MACHI_LOGO_WEB_BIANCO.png";

export default {
  name: "HomeSlider",
  data: () => ({
    slides: [
      {
        img: slide1,
        title: "Un nuovo modo di <b>comunicare</b> i servizi",
        subtitle: "accedi ai servizi del tuo comune"
      },
      {
        img: slide2,
        title: "La semplicità della città al tuo servizio",
        subtitle: "Ricevi le notifiche e scarica i tuoi documenti"
      },
      {
        img: slide3,
        title: "Tutti i tuoi dati sempre con te",
        subtitle: "Consulta i tuoi dati personali"
      }
    ],
    logo
  }),
  props: {
    show: {
      type: Boolean,
      default: false
    },
    sliderOff: Function
  },
  methods: {
  },
  updated() {},
};
</script>
<style scoped>
.a {
  fill: #fff;
  fill-rule: evenodd;
}
</style>