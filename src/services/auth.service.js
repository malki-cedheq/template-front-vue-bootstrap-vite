/*
file: src.services.auth.service.js
description: 
  Encapsulamento de requisições HTTP de autenticação relacionadas a entidade User
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/
import authHeader from './auth-header'
import { http, handle_http_error } from '../http-common.js'

class AuthService {
	jwtrefresh() {
		return http.post(`/jwtrefresh`)
	}

	login(user) {
		return http.post(`/login`, user)
	}

	logout(token) {
		return http.post(`/logout`, token, { headers: authHeader() })
	}
}

export default new AuthService()
