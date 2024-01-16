/*
file: src.router.index.js
description: Configura o roteamento da aplicação
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
criado em: 12/01/2024
*/

import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import BoardUserView from '../views/BoardUserView.vue'
import BoardModeratorView from '../views/BoardModeratorView.vue'
import BoardAdminView from '../views/BoardAdminView.vue'
import BoardSuperAdminView from '../views/BoardSuperAdminView.vue'
import UserView from '../views/crud_user/UserView.vue'
import UserCreateView from '../views/crud_user/UserCreateView .vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
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
		{
			path: '/users/read',
			name: 'user-view',
			component: UserView,
		},
		{
			path: '/user/create',
			name: 'user-create',
			component: UserCreateView,
		},
	],
})

// check Authorized status everytime a navigating action is trigger
router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/register', '/']
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
