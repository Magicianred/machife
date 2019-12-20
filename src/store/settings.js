import { StoreOptions, ActionTree, MutationTree } from 'vuex'
import axios from 'axios';
import {httpErrorHandling, browserStorage, getApiPath} from '../util'


let pref_api=axios.create({
    baseURL: getApiPath()+'/settings/preferences'
})

/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
const settings = {
    state:{
        preferences:null
    },
    mutations:{
        set_prefs(state, pref){
            state.preferences=pref
        },
    },
    actions:{
        preferences(ctx){
            pref_api.get('').then(pref=>{
                ctx.commit('set_prefs', pref.data)
            }).catch(httpErrorHandling)
        }
    },
    getters: {},
    namespaced:true
}

export default settings