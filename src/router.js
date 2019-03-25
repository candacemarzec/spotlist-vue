import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Signup from './views/users/Signup.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Profile from './views/users/Profile.vue';

import HouseLists from './views/households/HouseLists.vue';
import ListsHome from './views/lists/ListsHome.vue';



Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/users/new',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/users/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/household',
      name: 'house-lists',
      component: HouseLists
    },
    {
      path: '/lists',
      name: 'list-home',
      component: ListsHome
    }
  ]
});
