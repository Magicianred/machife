import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Access from './views/Access.vue'
import store from './store/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'access',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/i-miei-dati',
      children: [
        {
          path: '/',
          name: "personal",
          component: () => import('./views/body/MDPersonal.vue'),
        },
        {
          path: '/i-miei-dati/famiglia',
          name: "my_family_data",
          component: () => import('./views/body/Family.vue'),
        },
        {
          path: '/i-miei-dati/tasse',
          name: "tax",
          component: () => import('./views/body/Tax.vue'),
        },
        {
          path: '/i-miei-dati/catasto',
          name: "catasto",
          component: () => import('./views/body/Catasto.vue'),
        },
        {
          path: '/i-miei-dati/curiosita',
          name: "curiosity",
          component: () => import('./views/body/Curiosity.vue'),
        },
      ],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/MyData.vue'),
    },
    {
      path: '/servizi',
      name: 'services',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Services.vue')
    },
    {
      path: '/comunicazioni',
      name: 'messages_page',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/MessagesPage.vue')
    },
    {
      path: '/documenti',
      name: 'docs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Docs.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Settings.vue')
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (store.state.generic.login || to.fullPath==="/")
    next()
  else 
    next('/');
});

export default router;