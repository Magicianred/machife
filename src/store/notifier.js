import { StoreOptions, ActionTree, MutationTree } from 'vuex'
import axios from 'axios';
import { httpErrorHandling, browserStorage, getApiPath } from '../util'
import crypto from 'crypto'


let notifier_api = axios.create({
    baseURL: getApiPath(),
})

/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
const notifier = {
    state: {
        terms: '',
        terms_accepted: null,
        contacts: null,
        services: [],
        preferences: [],
        email_pin: null,
        phone_pin: null,
        activation_message: [],
    },
    mutations: {
        set_terms(state, terms) {
            state.terms = terms
        },
        set_contacts(state, contacts) {
            state.contacts = contacts
        },
        set_services(state, services) {
            state.services = services
        },
        set_preferences(state, preferences) {
            state.preferences = preferences
        },
        set_email_pin(state, email_pin) {
            state.email_pin = email_pin
        },
        set_phone_pin(state, phone_pin) {
            state.phone_pin = phone_pin
        },
        set_terms_accepted(state, terms_accepted) {
            state.terms_accepted = terms_accepted
        },
        activation_message(state, object) {
            state.activation_message = object
        }
    },
    actions: {
        get_terms(ctx) {
            if (ctx.rootState.generic.login)
                notifier_api.get('/prefs/terms').then(terms => {
                    ctx.commit('set_terms', terms.data)
                }).catch(httpErrorHandling)
        },
        get_terms_accepted(ctx, callback) {
            // activation message viene settato come messaggio di default nel caso in cui i termini e
            // le condizioni non siano state accettate. Come si può vedere di seguito il dato viene
            // settato anche in caso di termini accettati, pronto nel caso in cui venga cancellato
            // l'utente dal contesto del notificatore. La logica di visualizzazione invece si trova in App.vue.
            // Il settaggio avviene in questo punto onde evitare che il messaggio di attivazione venga
            // visualizzato prima di sapere effettivamente se i termini e le condizioni siano state
            // accettate.
            let activation_message = [
                {
                    mex: {
                        title: "Attiva le notifiche via mail, SMS e push",
                        body: `Clicca qui per inserire i contatti nel tuo profilo personale e attivare il servizio di notifiche`
                    },
                    id: null
                }
            ]
            if (ctx.rootState.generic.user_id)
                notifier_api.get('/prefs/users/' + ctx.rootState.generic.user_id + '/terms').then(({ data }) => {
                    ctx.commit('set_terms_accepted', data.result)
                    if (callback)
                        callback(data.result)
                    ctx.commit('activation_message', activation_message)
                }).catch(err => {
                    if (err && err.response && err.response.data != 'User not found') {
                        httpErrorHandling(err)
                    }
                    ctx.commit('activation_message', activation_message)
                })
        },
        get_contacts(ctx, commit) {
            return new Promise(resolve => {
                if (ctx.rootState.generic.user_id && ctx.state.terms_accepted)
                    notifier_api.get('/prefs/users/' + ctx.rootState.generic.user_id + '/contacts').then(contacts => {
                        if (commit) ctx.commit('set_contacts', contacts.data)
                        resolve(contacts.data)
                    }).catch(err => {
                        if (err.response.data.indexOf('no contacts for') == -1)
                            httpErrorHandling(err)
                        resolve(false)
                    })
                else resolve(false)
            })

        },
        get_services(ctx, commit) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.generic.login)
                    notifier_api.get('/prefs/services').then(services => {
                        if (commit) ctx.commit('set_services', services.data);
                        resolve(services.data)
                    })
                        .catch(httpErrorHandling)
                        .then(resolve)
                else resolve()
            })
        },
        get_preferences(ctx, commit) {
            return new Promise((resolve) => {
                if (ctx.rootState.generic.user_id && ctx.state.terms_accepted)
                    notifier_api.get('/prefs/users/' + ctx.rootState.generic.user_id + '/preferences').then(preferences => {
                        if (commit) ctx.commit('set_preferences', preferences.data)
                        resolve(preferences.data)
                    }).catch(err => {
                        if (err.response.data != 'user doesn\'t exist')
                            httpErrorHandling(err)
                        resolve()
                    })
                else resolve()
            })
        },
        profile_init(ctx, data) {
            return new Promise((resolve) => {
                let { contacts, prefs } = data
                let hash = crypto.createHash('md5').update(ctx.state.terms).digest('hex')
                notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/terms', { hash }).then(terms_result => {
                    Promise.all([
                        notifier_api.put('/prefs/verify/users/' + ctx.rootState.generic.user_id + '/contacts', contacts),
                        notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/preferences', prefs)
                    ]).then(([contacts_result, prefs_result]) => {
                        notifier_api.get('/prefs/cleansteps').then(response => {
                            resolve(true)
                        }).catch(err => {
                            httpErrorHandling(err)
                            resolve(false)
                        })
                    }).catch(err => {
                        httpErrorHandling(err)
                        resolve(false)
                    })
                }).catch(err => {
                    httpErrorHandling(err)
                    resolve(false)
                })
            })
        },
        get_pin_email(ctx, email) {
            notifier_api.get('/msg/sendpin/email', { params: { email } }).then(response => {
                let { data } = response
                ctx.commit('set_email_pin', data.pin)
            }).catch(httpErrorHandling)
        },
        get_pin_sms(ctx, phone) {
            notifier_api.get('/msg/sendpin/sms', { params: { phone } }).then(response => {
                let { data } = response
                ctx.commit('set_phone_pin', data.pin)
            }).catch(httpErrorHandling)
        },
        verify_pin_email(ctx, params) {
            return notifier_api.get('/verifypin/email', { params }).then(r => r.data).catch(httpErrorHandling)
        },
        verify_pin_sms(ctx, params) {
            return notifier_api.get('/verifypin/sms', { params }).then(r => r.data).catch(httpErrorHandling)
        },
        async dispatch_token(ctx, token) {
            if (token)
                ctx.commit('set_push_token', token, { root: true })
            else
                token = ctx.rootState.generic.push_token
            if (ctx.rootState.generic.login && token !== ctx.rootState.persistent.push_token && ctx.state.terms_accepted && token) {
                let [contacts, preferences] = await Promise.all([
                    ctx.dispatch('get_contacts'),
                    ctx.dispatch('get_preferences')
                ])
                for (let pref of preferences) {
                    if (contacts.push[pref.service_name]) {
                        let cleaned_tokens = contacts.push[pref.service_name].filter(x => x != token)
                        cleaned_tokens.push(token)
                        contacts.push[pref.service_name] = cleaned_tokens
                    } else {
                        contacts.push[pref.service_name] = [token]
                    }
                }
                let res = await notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/contacts', contacts).catch(httpErrorHandling)
                if (res) {
                    ctx.commit('set_contacts', res.data)
                    ctx.commit('persistent/set_push_token', token, { root: true })
                    console.log('settata token:', token)
                }
            }else if(token == ctx.rootState.persistent.push_token && token){
                console.log('la token non ha subito modifiche durante la sessione attuale')
            }
        },
        async unset_token(ctx) {
            let token = ctx.rootState.generic.push_token
            if (ctx.rootState.generic.login && ctx.state.terms_accepted && token) {
                let [contacts, preferences] = await Promise.all([
                    ctx.dispatch('get_contacts'),
                    ctx.dispatch('get_preferences')
                ])
                for (let pref of preferences) {
                    if (contacts.push[pref.service_name]) {
                        let cleaned_tokens = contacts.push[pref.service_name].filter(x => x != token)
                        contacts.push[pref.service_name] = cleaned_tokens
                    }
                }
                let res = await notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/contacts', contacts).catch(httpErrorHandling)
                if (res) {
                    ctx.commit('set_contacts', res.data)
                    ctx.commit('set_push_token', null, { root: true })
                    ctx.commit('persistent/set_push_token', null, { root: true })
                    console.log('cancellata token:', token)
                    return true
                }
                return false
            }
            return false
        },
        renew_contact(ctx, data) {
            return ctx.dispatch('get_contacts').then(contacts => {
                for (let prop in data) {
                    contacts[prop] = data[prop]
                }
                return notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/contacts', contacts).then(result => {
                    return notifier_api.get('/prefs/cleansteps').then(() => {
                        ctx.commit('set_contacts', result.data)
                        return result.data
                    }).catch(httpErrorHandling)
                }).catch(httpErrorHandling)
            })
        },
        update_preferences(ctx, prefs) {
            return notifier_api.put('/prefs/users/' + ctx.rootState.generic.user_id + '/preferences', prefs)
                .then(res => {
                    return res.data
                })
                .catch(httpErrorHandling)
        },
        delete_user(ctx, callback) {
            notifier_api.get('/prefs/deluser').then(() => {
                ctx.commit('set_contacts', null)
                ctx.commit('set_preferences', [])
                ctx.commit('set_terms_accepted', null)
                callback('Utente eliminato')
            }).catch(httpErrorHandling)
        }
    },
    getters: {},
    namespaced: true
}

export default notifier