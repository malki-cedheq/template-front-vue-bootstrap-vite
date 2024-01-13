/*
file: main.js
description: 
	ponto de partida para o desenvolvimento de uma aplicação Vue.js com suporte a:
	roteamento, estado global, estilos Bootstrap, e ícones personalizados do Font Awesome.
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { FontAwesomeIcon } from './plugins/font-awesome'
import FloatingVue from 'floating-vue'
import 'bootstrap'

// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/sass/style.scss'
import 'floating-vue/dist/style.css'

createApp(App)
	.use(router)
	.use(store)
	.use(FloatingVue)
	.component('font-awesome-icon', FontAwesomeIcon)
	.mount('#app')
