import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: "/home/main"
    },
    {
        path: '/about',
        name: 'about',
        redirect: "/home/about"
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
            {
                path: 'article/:id',
                name: 'article',
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/Article.vue')
                }
            },
            {
                path: 'main',
                name: 'main',
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/Main.vue')
                }
            },
            {
                path: 'article_save',
                name: 'article_save',
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/ArticleSave.vue')
                }
            },
            {
                path: 'about',
                name: 'about',
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/About.vue')
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/Login.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
