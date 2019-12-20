import { StoreOptions, ActionTree, MutationTree } from 'vuex'
import axios from 'axios';
import { httpErrorHandling, browserStorage, getApiPath } from '../util'
import crypto from 'crypto'


let messages_api = axios.create({
    baseURL: getApiPath()+'/store'
})

/**
 * @constant
 * @type {StoreOptions}
 * @default
 */
const messages = {
    state: {
        to_read:[],
        total_to_read:0,
        messages:[],
        total:0
    },
    mutations: {
        to_read(state, messages){
            state.to_read=messages
        },
        total_to_read(state, number){
            state.total_to_read=number
        },
        messages(state, messages){
            state.messages=messages
        },
        total(state, number){
            state.total=number
        },
        readed(state, payload){
            let {id, read_at} = payload
            state.messages=state.messages.map(m=>{
                if(m.id==id){
                    m.read_at=read_at
                }
                return m
            })
        }
    },
    actions: {
        get_to_read(ctx){
            if(ctx.rootState.generic.user_id)
            messages_api.get('/users/'+ctx.rootState.generic.user_id+'/messages', {params:{
                filter:{"read_at":{"null":true}}, limit:5
            }}).then(({data, headers})=>{
                ctx.commit('total_to_read', headers['total-elements-not-read'])
                ctx.commit('to_read', data)
            }).catch(httpErrorHandling)
        },
        get_messages(ctx, limit){
            if(ctx.rootState.generic.user_id)
            messages_api.get('/users/'+ctx.rootState.generic.user_id+'/messages', {params:{
                limit:limit||5
            }}).then(({data, headers})=>{
                ctx.commit('total', headers['total-elements'])
                ctx.commit('total_to_read', headers['total-elements-not-read'])
                ctx.commit('messages', data)
            }).catch(httpErrorHandling)
        },
        get_more(ctx, limit){
            if(ctx.rootState.generic.user_id){
                if(ctx.state.messages.length>=ctx.state.total){
                    ctx.dispatch('dispatch_message', {text:'Non ci sono altri messaggi da visualizzare'}, {root:true})
                }else{
                    messages_api.get('/users/'+ctx.rootState.generic.user_id+'/messages', {params:{
                        limit:limit||5, offset:ctx.state.messages.length
                    }}).then(({data, headers})=>{
                        ctx.commit('total', headers['total-elements'])
                        ctx.commit('total_to_read', headers['total-elements-not-read'])
                        ctx.commit('messages', [...ctx.state.messages, ...data])
                    }).catch(httpErrorHandling)
                }
            }
        },
        read_message(ctx, id){
            if(ctx.rootState.generic.user_id)
            messages_api.put('/users/'+ctx.rootState.generic.user_id+'/messages/status', [{
                id,
                read_at:true
            }]).then(({data})=>{
                for(let message of data){
                    ctx.commit('readed', {id, read_at:message['read_at']})
                }
                ctx.dispatch('get_to_read')
            }).catch(httpErrorHandling)
        },
        not_read_message(ctx, id){
            if(ctx.rootState.generic.user_id)
            messages_api.put('/users/'+ctx.rootState.generic.user_id+'/messages/status', [{
                id,
                read_at:null
            }]).then(({data})=>{
                for(let message of data){
                    ctx.commit('readed', {id, read_at:message['read_at']})
                }
                ctx.dispatch('get_to_read')
            }).catch(httpErrorHandling)
        },
        delete_message(ctx, id){
            return new Promise((resolve)=>{
                if(ctx.rootState.generic.user_id)
                messages_api.delete('/users/'+ctx.rootState.generic.user_id+'/messages/'+id).then(()=>{
                    ctx.dispatch('get_to_read')
                    ctx.dispatch('get_messages', ctx.state.messages.length)
                    resolve(true)
                }).catch(e=>{
                    httpErrorHandling(e)
                    resolve(false)
                })
                else resolve(false)
            })
        }
    },
    getters: {

    },
    namespaced: true
}

export default messages