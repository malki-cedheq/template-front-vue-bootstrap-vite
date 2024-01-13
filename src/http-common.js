/*
file: src.http-common.js
description: 
  Implementa o objeto axios para requisições HTTP
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL

export const http = axios.create({
	baseURL: `${API_BASE_URL}/api`,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
	},
})

export function handle_http_error(error) {
	if (error.response) {
		console.log(error.response.data)
		console.log(error.response.status)
		console.log(error.response.headers)
	} else if (error.request) {
		console.log(error.request)
	} else {
		console.log('Error', error.message)
	}
	console.log(error.config)
}

export default {
	http,
	handle_http_error,
}
