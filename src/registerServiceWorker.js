/* eslint-disable no-console */
import * as firebase from "firebase/app";
import store from './store/index'
import 'firebase/messaging';
import { register } from 'register-service-worker'


var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = firebase.initializeApp(firebaseConfig)

const messaging = app.messaging();

messaging.onMessage((payload) => {
  let notification = payload.notification||payload.data
  store.dispatch('dispatch_message', {text:notification.body, title:notification.title, img:true, link:notification.click_action||null, timeout:0});
  store.dispatch('messages/get_to_read')
  store.dispatch('messages/get_messages')
}, err => console.log(err), () => console.log('completed'));

// document.addEventListener('push', event=>{
//   console.log('push event2:', event)
// })

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )

    },
    registered(registration) {
      console.log('Service worker has been registered.')
      messaging.useServiceWorker(registration)
      messaging.usePublicVapidKey('')

      messaging.requestPermission().then(() => {
        console.log('Notification permission granted.');
        messaging.getToken().then((token) => {
          store.dispatch('notifier/dispatch_token', token)
          console.log('Token: ' + token)
        })
        messaging.onTokenRefresh(() => {
          messaging.getToken().then((token) => {
            store.dispatch('notifier/dispatch_token', token)
            console.log('Token: ' + token)
          })
        })
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });



    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
