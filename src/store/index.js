import Vue from 'vue'
import Vuex from 'vuex'
import { StoreOptions } from 'vuex'
import router from '../router'
import smartdata from './smartdata'
import settings from './settings'
import notifier from './notifier'
import messages from './messages'
import axios from 'axios';
import { httpErrorHandling, getApiPath } from '../util'

let generic_api = axios.create({
  baseURL: getApiPath()
})

Vue.use(Vuex)

/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
const persistent = {
  state: {
    drawer_open: true,
    push_token: null,
    slider_viewed: false
  },
  namespaced: true,
  mutations: {
    initializeStore(state) {
      // Check if the ID exists
      let content = localStorage.getItem('persistent_store')
      if (content) {
        // Replace the state object with the stored item
        let parsed = JSON.parse(content)
        state = Object.assign(state, parsed)
      }
    },
    toggle_drawer(state) {
      state.drawer_open = !state.drawer_open
    },
    set_push_token(state, push_token) {
      state.push_token = push_token
    },
    set_slider_viewed(state) {
      state.slider_viewed = true
    }
  },
  actions: {
  }
}
/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
const generic = {
  state: {
    login: null,
    user_id: null,
    loader: 0,
    slider: true,
    stepper_dialog: false,
    email_dialog: false,
    new_email: "",
    phone_dialog: false,
    new_phone: "",
    snackbar_message: null,
    push_token: null,
    pref_dialog: false,
    terms_dialog: false,
    homepage_services: '3',
    homepage_communications:'5',
    services: []
  },
  mutations: {
    login(state, bool) {
      state.login = bool
    },
    set_user_id(state, id) {
      state.user_id = id
    },
    loading(state, delta) {
      state.loader += delta
    },
    slider(state, bool) {
      state.slider = bool
    },
    new_email(state, email) {
      state.new_email = email
    },
    new_phone(state, phone) {
      state.new_phone = phone
    },
    set_stepper_dialog(state, bool) {
      state.stepper_dialog = bool
    },
    set_email_dialog(state, bool) {
      state.email_dialog = bool
    },
    set_phone_dialog(state, bool) {
      state.phone_dialog = bool
    },
    set_pref_dialog(state, bool) {
      state.pref_dialog = bool
    },
    set_terms_dialog(state, bool) {
      state.terms_dialog = bool
    },
    set_snackbar_message(state, snackbar_message) {
      state.snackbar_message = snackbar_message
    },
    set_push_token(state, push_token) {
      state.push_token = push_token
    },
    set_services(state, services) {
      state.services = services
    },
    set_homepage_services(state, homepage_services) {
      state.homepage_services = homepage_services
    },
    set_homepage_communications(state, homepage_communications) {
      state.homepage_communications = homepage_communications
    }
  },
  actions: {
    login(context) {
        context.dispatch('start_loading')
        generic_api.get('/login/').then(user => {
          context.commit('login', true)
          context.commit('set_user_id', user.data.id)
          context.dispatch("settings/preferences", null, { root: true });
          context.dispatch("notifier/get_terms_accepted", () => {
            context.dispatch('notifier/dispatch_token', null, { root: true })
            context.dispatch('messages/get_to_read', null, { root: true })
          })
          router.push('home')
          return
        }).then(() => {
          context.dispatch('end_loading')
        }).catch(e => {
          console.log('Accesso non autorizzato')
          context.commit('login', false)
          context.dispatch('end_loading')
        })
    },
    start_loading(ctx) {
      ctx.commit('loading', +1)
    },
    end_loading(ctx) {
      ctx.commit('loading', -1)
    },
    slider_off(ctx, callback) {
      ctx.commit('persistent/set_slider_viewed', null, { root: true })
      ctx.commit('slider', false)
      if (callback)
        callback()
    },
    slider_on(ctx) {
      ctx.commit('slider', true)
    },
    stepper_dialog_show(ctx) {
      ctx.commit('set_stepper_dialog', true)
    },
    stepper_dialog_hide(ctx) {
      ctx.commit('set_stepper_dialog', false)
    },
    email_dialog_show(ctx) {
      ctx.commit('set_email_dialog', true)
    },
    email_dialog_hide(ctx) {
      ctx.commit('set_email_dialog', false)
    },
    phone_dialog_show(ctx) {
      ctx.commit('set_phone_dialog', true)
    },
    phone_dialog_hide(ctx) {
      ctx.commit('set_phone_dialog', false)
    },
    pref_dialog_show(ctx) {
      ctx.commit('set_pref_dialog', true)
    },
    pref_dialog_hide(ctx) {
      ctx.commit('set_pref_dialog', false)
    },
    terms_dialog_show(ctx) {
      ctx.commit('set_terms_dialog', true)
    },
    terms_dialog_hide(ctx) {
      ctx.commit('set_terms_dialog', false)
    },
    dispatch_message(ctx, message) {
      ctx.commit('set_snackbar_message', message)
    },
    snackbar_close(ctx) {
      ctx.commit('set_snackbar_message', null)
    },
    get_services(ctx) {
      return generic_api.get('/services').then(({ data }) => {
        ctx.commit('set_services', data)
        return data
      }).catch(httpErrorHandling)
    },
    toggle_favorite(ctx, id) {
      return new Promise((resolve)=>{
        if (ctx.state.user_id)
        return generic_api.get('/services/' + ctx.state.user_id + '/favorite/' + id).then(({ data }) => {
          resolve(data)
        }).catch(httpErrorHandling)
        else resolve(false)
      })
    },
    get_logout_url(ctx) {
      return new Promise((resolve)=>{
        if (ctx.state.user_id)
        return generic_api.get('/getLogoutUrl').then(({ data }) => {
          resolve(data)
        }).catch(httpErrorHandling)
        else resolve(false)
      })
    }
  },
  getters: {

  }
}

const store = new Vuex.Store({
  modules: {
    persistent, generic, smartdata, settings, notifier, messages
  }
})

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  // console.log(mutation);
  localStorage.setItem('persistent_store', JSON.stringify(state.persistent));
});

export default store