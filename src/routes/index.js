import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
    // hash, history 두가지 모드가 있다.
    // 여기서는 hash 모드로 간편히 사용한다.
    // ex) https://google.com/#/search
    history: createWebHashHistory(),

    // pages
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie',
            component: Movie
        },
        {
            path: '/about',
            component: About
        }
    ]
})