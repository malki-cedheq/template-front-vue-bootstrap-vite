<!-- 
file: src.component.Users.vue
description: 
  Componente para listagem de dados
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div id="app" class="container">
		<p v-if="loading">Carregando dados...</p>
		<div v-else>
			<h3 class="heading">Users</h3>
			<table class="table table-bordered table-hover">
				<thead class="table-light">
					<tr>
						<th scope="col">id</th>
						<th scope="col">username</th>
						<th scope="col">email</th>
						<th scope="col">role</th>
						<th scope="col">is_active?</th>
						<th scope="col">items</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in all_users" v-bind:key="user">
						<td>{{ user.id }}</td>
						<td>{{ user.username }}</td>
						<td>{{ user.email }}</td>
						<td>{{ user.role }}</td>
						<td>{{ user.is_active }}</td>
						<td>{{ user.items }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import UserService from '../services/user.service'

export default {
	name: 'users',
	data() {
		return {
			loading: false,
			all_users: null,
		}
	},
	mounted() {
		UserService.getPublicContent()
			.then(
				(response) => {
					this.all_users = response.data
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
			.catch((error) => console.log(error))
			.finally(() => (this.loading = false))
	},
}
</script>
