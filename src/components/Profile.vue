<!-- 
file: src.component.Profile.vue
description: 
  Componente para vizualição de dados do usuário
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div class="container">
		<header class="jumbotron">
			<h3>Profile</h3>
		</header>
		<table v-if="currentToken" class="table table-bordered table-hover">
			<thead class="table-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Username</th>
					<th scope="col">Email</th>
					<th scope="col">Role</th>
					<th scope="col">is_active?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{{ currentToken.sub }}
					</td>
					<td>{{ currentToken.additional_claims.username }}</td>
					<td>{{ currentToken.identity }}</td>
					<td>{{ currentToken.additional_claims.role }}</td>
					<td>{{ currentToken.additional_claims.is_active }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Profile',
	computed: {
		currentToken() {
			return this.$store.state.auth.decoded_token
		},
	},
	mounted() {
		if (!this.currentToken) {
			this.$router.push('/login')
		}
	},
}
</script>
