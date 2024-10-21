//import Vue from 'vue'
import './scss/main.scss'
import { createApp } from 'vue'
import App from './App'
// 특정한 폴더의 index.js 파일을 가져올때는 생략할 수 있다.
// import router from './routes/index.js' 
// import store from './store/index.js'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router) // $route, $router
    .use(store) // $store
    .use(loadImage) // $loadImage
    .mount('#app')