import Vue from 'vue'
import VueRouter from 'vue-router'

//引入 tabbar 组件
const Home = () =>
    import ("views/home/Home")
const Cart = () =>
    import ("views/cart/Cart")
const Profile = () =>
    import ("views/profile/Profile")
const Category = () =>
    import ("views/category/Category")

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router