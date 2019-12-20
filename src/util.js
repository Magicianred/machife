import store from './store/index'
import router from './router'
/**
 * 
 * @param {Error} err 
 */
export function httpErrorHandling(err){  
    if(err){
        if (err.response && err.response.status === 401) {
            store.commit('login', false)
            router.push({name:'access'})
            store.dispatch("dispatch_message", { text: 'sessione scaduta' });
        }else{
            store.dispatch("dispatch_message", { text: err.message });
        }
    }
}

export function DateFormatBasic(date){
    date=date.replace(/T.+/, '').split('-')
    if(date.length>2){
        date=date.reverse().join('-')
    }else{
        date=date.join('-')
    }
    return date
}

/**
 * 
 * @param {String} date format yyyy-mm-ddTHH:ii:ss.SSSZ
 */
export function TimestampFormatBasic(date){
    let datesplitted=date.replace(/\..+Z$/, '').split('T')
    date=datesplitted[0].split('-');
    date=date.reverse().join('-')
    return date+' '+datesplitted[1]
}

export function getApiPath() {
    if(location.hostname != 'localhost'){
        return '/api/v1'
    }else{
        return '/api/v1'
    }
}

export const browserStorage=sessionStorage