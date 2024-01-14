/*
file: src.services.auth-header.js
description: 
  Responsável por gerar o header de autorização utilizado em requisições HTTP.
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/

export default function authHeader() {
	const token = JSON.parse(localStorage.getItem('token'))

	if (token && token.access_token) {
		//console.log('Authorization: ' + token.token_type + ' ' + token.access_token)
		return { Authorization: token.token_type + ' ' + token.access_token }
	} else {
		return {}
	}
}
