import Vue from 'vue';
import VueRouter from 'vue-router';

import Features from '../components/Features.vue';
import Firestore from '../components/firestore/Firestore.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Features },
  { path: '/firestore', component: Firestore }
];

const router = new VueRouter({
  routes
})

export default router
