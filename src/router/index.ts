import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import Home from '../views/Home/Home.vue';
import CreatePost from '../views/CreatePost/CreatePost.vue';
import Profile from '../views/Profile/Profile.vue';
import SinglePost from '../views/SinglePost/SinglePost.vue';
import store from '@/store';
import EditPost from '@/views/EditPost/EditPost.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'My App'
    },
    component: function () {
      if (store.getters['getLoggedIn']) {
        return Home
      } else {
        return Login
      }
    }
  },
  {
    path: '/create-post',
    name: 'createPost',
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true
    },
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'Profile Posts',
      requiresAuth: true
    },
  },
  {
    path: '/profile/:id/followers',
    name: 'profileFollowers',
    component: Profile,
    meta: {
      title: 'Profile Followers',
      requiresAuth: true
    },
  },
  {
    path: '/profile/:id/following',
    name: 'profileFollowing',
    component: Profile,
    meta: {
      title: 'Profile Following',
      requiresAuth: true
    },
  },
  {
    path: '/post/:id',
    name: 'singlePost',
    component: SinglePost,
    meta: {
      title: 'Post',
      requiresAuth: true
    },
  },
  {
    path: '/post/:id/edit',
    name: 'editPost',
    component: EditPost,
    meta: {
      title: 'Edit Post',
      requiresAuth: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.state.loggedIn) {
      next({
        name: 'home'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
