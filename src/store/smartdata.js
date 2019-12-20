import { StoreOptions, ActionTree, MutationTree } from 'vuex'
import axios from 'axios';
import {httpErrorHandling, browserStorage, getApiPath} from '../util'


let smartdataapi=axios.create({
    baseURL: getApiPath()+'/sm/'
})


const state = {
    catasto: null,
    famiglia: null,
    profilo: null,
    informa_casa: null,
    tari: null,
    semaforo: null,
    utenze_tari: null
}
/**
 * @type {MutationTree}
 */
let mutations={}
for(let key in state){
    mutations[key]=function(state, value){
        state[key]=value
    }
}
/**
 * @type {ActionTree}
 * formazione delle action con iterazione delle proprietà dello stato
 */
let actions={}
for(let key in state){
    let storevarname='sm_'+key
    actions[key]=function(ctx, params){
        let data=browserStorage.getItem(storevarname)
        if(data){
            ctx.commit(key, JSON.parse(data))
        }else{
            smartdataapi.get('/semaforo').then(res=>{
                let keyformatted=key.replace(/_/g, '-')
                ctx.dispatch('start_loading', null, {root:true})
                smartdataapi.get('utenti/'+keyformatted, {params})
                .then(data=>{
                    browserStorage.setItem(storevarname, JSON.stringify(data.data))
                    ctx.commit(key, data.data)
                    ctx.dispatch('end_loading', null, {root:true})
                })
                .catch(httpErrorHandling)
            }).catch(()=>{
                ctx.dispatch("dispatch_message", { text: 'Stiamo aggiornando i tuoi dati, per favore riprova più tardi' }, {root:true});
            })
        }
    }
}

/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
export default {
    state,
    mutations,
    actions,
    getters: {},
    namespaced:true
}