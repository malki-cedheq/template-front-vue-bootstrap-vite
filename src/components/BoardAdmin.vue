<!-- 
file: src.component.BoardAdmin.vue
description: 
  Componente para Dashboard para usuário ADMIN
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div id="app" class="container">
		<p v-if="loading">Carregando dados...</p>
		<div v-else>
			<h3 class="heading">Users - Admin View</h3>
			<table class="table table-bordered table-hover table-responsive-sm">
				<thead class="table-light">
					<tr>
						<th scope="col">id</th>
						<th scope="col">username</th>
						<th scope="col">email</th>
						<th scope="col">role</th>
						<th scope="col">is_active?</th>
						<th scope="col">items</th>
						<th scope="col">create_at</th>
						<th scope="col">last_change</th>
						<th scope="col">hashed_password</th>
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
						<td>{{ user.criado_em }}</td>
						<td>{{ user.modificado_em }}</td>
						<td>{{ user.hashed_password }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
	name: 'user',
	data() {
		return {
			loading: false,
			all_users: null,
		}
	},
	mounted() {
		UserService.getAdminBoard()
			.then(
				(response) => {
					this.all_users = [response.data]
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
