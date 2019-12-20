<template>
  <v-app :class="{'no-scrollable-application': no_scrollable}">
    <!-- <v-slide-y-transition> -->
    <template v-if="$store.state.generic.login">
      <v-navigation-drawer
        class="text-uppercase"
        v-if="$store.state.generic.login"
        app
        v-model="drawer_open"
      >
        <v-list dense nav>
          <v-list-item to="/home" link active-class="active-link">
            <v-list-item-icon>
              <HomeIcon class="icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/i-miei-dati" link active-class="active-link">
            <v-list-item-icon>
              <MyDataIcon class="icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>I miei dati</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/servizi" link v-if="show_servizi" active-class="active-link">
            <v-list-item-icon>
              <ServicesIcon />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Servizi</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/comunicazioni" link active-class="active-link">
            <v-list-item-icon>
              <MessagesIcon />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Comunicazioni</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-if="show_documenti" to="/documenti" active-class="active-link">
            <v-list-item-icon>
              <DocsIcon></DocsIcon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Documenti</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app elevate-on-scroll>
        <v-btn icon v-if="$store.state.generic.login" @click="toggle_drawer">
          <v-icon v-if="drawer_open">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
        <v-toolbar-title class="pt-3">
          <router-link to="/home">
            <img :src="AppBarLogo" height="50px" />
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn v-if="$store.state.generic.login" icon @click="showBottomSheet">
          <v-icon>mdi-bell</v-icon>
        </v-btn>-->
        <v-menu v-if="$store.state.generic.login" bottom left transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-badge color="info" overlap left :value="Number(total_messages)">
                <template v-slot:badge>{{total_messages}}</template>
                <v-icon class="blue-icon">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list width="300" class="pb-0">
            <v-list-item-group>
              <div class="caption px-2">Nuovi messaggi</div>
              <v-container v-if="total_messages<=0" class="py-10 text-center body-2">
                <v-col class="mx-auto">Nessun messaggio da leggere</v-col>
              </v-container>
              <template v-else v-for="(message,n) in message_menu_list">
                <v-divider v-if="n>0" :key="'divider_'+n"></v-divider>
                <v-list-item
                  two-line
                  :key="n"
                  @click="terms_and_condition?openMessage():activeMessages()"
                >
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-2">{{message.mex.title}}</v-list-item-title>
                    <v-list-item-subtitle
                      style="white-space:normal"
                    >{{ message.mex.body | stripHTML | truncateString }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-if="terms_and_condition">
                <v-divider></v-divider>
                <div class="py-2 text-center">
                  <router-link
                    :to="{name:'messages_page'}"
                    class="body-2"
                    style="text-decoration:none"
                  >vedi tutti</router-link>
                </div>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <!-- <v-btn  icon>
        <v-icon>mdi-account</v-icon>
        </v-btn>-->
        <v-menu v-if="$store.state.generic.login" bottom left transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon class="blue-icon">mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list class="py-0" width="200">
            <v-list-item-group>
              <template v-for="(item, i) in account_menu_items">
                <v-divider v-if="i>0" :key="'divider_'+i" />
                <v-list-item v-if="item.logout" :key="i" @click="logout">
                  <!-- <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>-->
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-else :key="i" :to="{name:item.route_name}">
                  <!-- <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>-->
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <!-- <v-btn v-else text @click="login">
          <span class="mr-2">ACCEDI</span>
        </v-btn>-->
      </v-app-bar>

      <v-content>
        <router-view></router-view>

        <v-footer dark class="mt-5 py-4">
          <v-container>
            <v-row>
              <v-col :cols="footers_lefts" class="headline text-uppercase">
                <img :src="AppBarLogoWhite" height="50px" />
              </v-col>
              <v-col :cols="footers_rights">
                <span>Seguici sui social</span>
                <span style="float:right">
                  <v-btn class="social-button" light fab x-small>
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn class="social-button" light fab x-small>
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                  <v-btn class="social-button" light fab x-small>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                  <v-btn class="social-button" light fab x-small>
                    <v-icon>mdi-instagram</v-icon>
                  </v-btn>
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="footers_lefts" class="headline text-uppercase"></v-col>
              <v-col :cols="footers_rights">
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="footers_lefts" class="headline text-uppercase"></v-col>
              <v-col :cols="footers_rights">
                <span class="footer-link">Accessibilità</span>
                <span class="footer-link">Condizioni d'usi, cookie e privacy</span>
                <span class="footer-link">Aiuto</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="footers_lefts" class="headline text-uppercase"></v-col>
              <v-col :cols="footers_rights">
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-content>
      <v-overlay :value="app_loader">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </template>
    <HomeSlider :show="slider" :sliderOff="slider_off" />
    <DialogNotifierActivation />
    <DialogEmailUpdate />
    <DialogPhoneUpdate />
    <DialogPrefUpdate />
    <DialogTermsView />
    <BottomSheet />
  </v-app>
</template>

<script>
import HomeSlider from "./components/HomeSlider";
import DialogNotifierActivation from "./components/DialogNotifierActivation";
import DialogEmailUpdate from "./components/DialogEmailUpdate";
import DialogPhoneUpdate from "./components/DialogPhoneUpdate";
import DialogPrefUpdate from "./components/DialogPrefUpdate";
import DialogTermsView from "./components/DialogTermsView";
import Snackbar from "./components/Snackbar";
import BottomSheet from "./components/BottomSheet";
import HomeIcon from "./components/HomeIcon";
import MyDataIcon from "./components/MyDataIcon";
import ServicesIcon from "./components/ServicesIcon";
import MessagesIcon from "./components/MessagesIcon";
import DocsIcon from "./components/DocsIcon";
import AppBarLogo from "./assets/MACHI_LOGO_WEB_NERO.png";
import AppBarLogoWhite from "./assets/MACHI_LOGO_WEB_BIANCO.png";
import { getApiPath } from "./util";

export default {
  name: "App",
  components: {
    HomeSlider,
    DialogNotifierActivation,
    DialogEmailUpdate,
    DialogPhoneUpdate,
    DialogPrefUpdate,
    DialogTermsView,
    Snackbar,
    BottomSheet,
    HomeIcon,
    MyDataIcon,
    ServicesIcon,
    MessagesIcon,
    DocsIcon
  },
  data: () => ({
    AppBarLogo,
    AppBarLogoWhite,
    ente: "Città",
    enteSubTitle: "Nome Utente",
    account_menu_items: [
      { title: "Profilo", icon: "mdi-settings", route_name: "settings" },
      { title: "Esci", icon: "mdi-settings", logout: true }
    ],
    drawer_open: false
  }),
  computed: {
    footers_rights() {
      let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
      if (xs) return 12;
      else return sm ? 12 : 8;
    },
    footers_lefts() {
      let { xs, sm, md, lg, xl } = this.$vuetify.breakpoint;
      if (xs) return 12;
      else return sm ? 12 : 4;
    },
    slider() {
      return this.$store.state.generic.login == false;
    },
    app_loader() {
      return this.$store.state.generic.loader > 0;
    },
    show_servizi() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.servizi
        : false;
    },
    show_documenti() {
      return this.$store.state.settings.preferences
        ? this.$store.state.settings.preferences.ente.documenti
        : false;
    },
    terms_and_condition() {
      return this.$store.state.notifier.terms_accepted;
    },
    message_menu_list() {
      return this.terms_and_condition
        ? this.messages
        : this.notification_message;
    },
    no_scrollable() {
      return this.$store.state.generic.stepper_dialog;
    },
    messages() {
      return this.$store.state.messages.to_read;
    },
    total_messages() {
      return this.terms_and_condition
        ? this.$store.state.messages.total_to_read
        : this.message_menu_list.length;
    },
    notification_message() {
      return this.$store.state.notifier.activation_message;
    }
  },
  methods: {
    slider_off() {
      window.location.href = getApiPath() + "/login?redirect=true";
    },
    openMessage() {
      this.$router.push({ name: "messages_page" });
    },
    activeMessages() {
      this.$store.dispatch("stepper_dialog_show");
    },
    toggle_drawer() {
      this.drawer_open = !this.drawer_open;
    },
    logout(){
      this.$store.dispatch('notifier/unset_token').then(()=>{
        this.$store.dispatch('get_logout_url').then(url=>{
            this.$store.commit('login', false)
            this.$router.replace({name:'access'}).then(()=>{
              window.location.href=url
            })
        })
      })
    }
  },
  created() {
    //commentare per visualizzare lo slider
    this.$store.dispatch("login");
    //decommentare per visualizzare lo slider
    // this.$store.commit("login", false);
  }
};
</script>
<style lang="scss">
@import "./scss/App.scss";

.no-scrollable-application {
  height: 100vh;
  overflow: hidden;
}
</style>