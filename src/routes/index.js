import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
    // hash, history 두가지 모드가 있다.
    // 여기서는 hash 모드로 간편히 사용한다.
    // ex) https://google.com/#/search
    history: createWebHashHistory(),

    // 스크롤이 항상 최상단을 유지한 상태에서 페이지 전환
    scrollBehavior() {
        return { top: 0 }
    },

    // pages
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        { // 그외 모든 페이지를 매칭하여 NotFound 페이지로 보낸다.
            path: '/:pathMatch(.*)',
            component: NotFound
        }
    ]
})