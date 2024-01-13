<!-- 
file: src.component.BoardAdmin.vue
description: 
  Componente para Dashboard para usuário ADMIN
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div class="container">
		<header class="jumbotron">
			<h3>{{ content }}</h3>
		</header>
	</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
	name: 'BoardAdmin',
	data() {
		return {
			content: '',
		}
	},
	mounted() {
		UserService.getAdminBoard().then(
			(response) => {
				this.content = response.data
			},
			(error) => {
				this.content =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString()
			},
		)
	},
}
</script>
