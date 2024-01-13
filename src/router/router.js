/*
file: src.router.index.js
description: Configura o roteamento da aplicação
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
criado em: 12/01/2024
*/

import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../components/Home.vue'
import UsersView from '../components/Users.vue'
import ProfileView from '../components/Profile.vue'
import LoginView from '../components/Login.vue'
import RegisterView from '../components/Register.vue'
import BoardUserView from '../components/BoardUser.vue'
import BoardModeratorView from '../components/BoardModerator.vue'
import BoardAdminView from '../components/BoardAdmin.vue'
import BoardSuperAdminView from '../components/BoardSuperAdmin.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/users',
			name: 'users',
			component: UsersView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView,
		},
		{
			path: '/profile',
			name: 'profile',
			component: ProfileView,
		},
		{
			path: '/user',
			name: 'user',
			component: BoardUserView,
		},
		{
			path: '/moderator',
			name: 'moderator',
			component: BoardModeratorView,
		},
		{
			path: '/admin',
			name: 'admin',
			component: BoardAdminView,
		},
		{
			path: '/super_admin',
			name: 'super_admin',
			component: BoardSuperAdminView,
		},
	],
})

// check Authorized status everytime a navigating action is trigger
router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/register', '/users']
	const authRequired = !publicPages.includes(to.path)
	const token = JSON.parse(localStorage.getItem('token'))

	// trying to access a restricted page + not logged in
	// redirect to login page
	if (authRequired && !token.access_token) {
		next('/login')
	} else {
		next()
	}
})

export default router
