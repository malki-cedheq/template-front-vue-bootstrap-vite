/*
file: src.services.user.service.js
description: 
  Encapsulamento de requisições HTTP relacionadas a entidade User
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/
import authHeader from './auth-header'

import { http, handle_http_error } from '../http-common.js'

class UserService {
	getPublicContent() {
		return http.get('/users' + '?skip=0&limit=100')
	}

	getUserBoard() {
		return http.get('/users/user', { headers: authHeader() })
	}

	getModeratorBoard() {
		return http.get('/users/moderator', { headers: authHeader() })
	}

	getAdminBoard() {
		return http.get('/users/admin', { headers: authHeader() })
	}

	getSuperAdminBoard() {
		return http.get('/users/super_admin', { headers: authHeader() })
	}

	getAll() {
		return http.get('/users')
	}

	get(id) {
		return http.get(`/user/${id}`)
	}

	register(user) {
		return http.post('/user', user)
	}

	update(id, data) {
		return http.put(`/user/${id}`, data, { headers: authHeader() })
	}

	delete(id) {
		return http.delete(`/user/${id}`, { headers: authHeader() })
	}
}

export default new UserService()
