import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
let router = new Router({
        routes: [{
                path: '/',
                name: 'home',
                component: Home
        },
        {
                path: '/search',
                name: 'Search',
                component: () => import( /* webpackChunkName: "about" */
                        './views/Search.vue')
        },
        {
                path: '/about',
                name: 'about',
                component: () => import( /* webpackChunkName: "about" */
                        './views/About.vue')
        }
        ]
})
//全局路由加载之前(正式)
router.beforeEach((to, from, next) => {
        return next();
})
export default router
