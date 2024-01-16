import AuthService from '../services/auth.service'
import * as jose from 'jose'

const token = JSON.parse(localStorage.getItem('token'))
const decoded_token = JSON.parse(localStorage.getItem('token'))
const initialState = token
	? { status: { loggedIn: true }, token, decoded_token }
	: { status: { loggedIn: false }, token: null, decoded_token: null }

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return AuthService.login(user)
				.then((response) => {
					commit('loginSuccess', response.data)
					return Promise.resolve(response)
				})
				.catch((error) => {
					commit('loginFailure')
					return Promise.reject(error)
				})
		},
		async logout({ commit }) {
			const token_data = JSON.parse(localStorage.getItem('token'))
			AuthService.logout(token_data)
				.then((response) => {
					commit('logout')
					return Promise.resolve(response)
				})
				.catch((error) => {
					commit('logout')
					return Promise.reject(error)
				})
		},
	},
	mutations: {
		loginSuccess(state, token) {
			localStorage.setItem('token', JSON.stringify(token))
			const token_data = JSON.parse(localStorage.getItem('token'))
			state.status.loggedIn = true
			state.token = token
			state.decoded_token = jose.decodeJwt(token_data.access_token)
		},
		loginFailure(state) {
			if (JSON.parse(localStorage.getItem('token'))) {
				localStorage.removeItem('token')
			}
			state.status.loggedIn = false
			state.token = null
			state.decoded_token = null
		},
		logout(state) {
			localStorage.removeItem('token')
			state.status.loggedIn = false
			state.token = null
			state.decoded_token = null
		},
	},
}
