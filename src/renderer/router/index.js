import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* eslint-disable */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: () => import('@/views/LandingPage.vue'),
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
        }, {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
            redirect: '/home/index',
            children: [
                {
                    path: 'index',
                    name: 'Index',
                    component: () => import('@/views/main/index.vue'),
                }, {
                    path: 'calendar',
                    name: 'Calendar',
                    component: () => import('@/views/main/Calendar.vue'),
                }, {
                    path: 'send-message',
                    name: 'SendMessage',
                    component: () => import('@/views/main/SendMessage.vue'),
                }
            ],
        },
    // {
    //   path: '*',
    //   redirect: '/',
    // },
    ],
});
