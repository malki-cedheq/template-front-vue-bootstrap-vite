<!-- 
file: src.App.vue
description: 
  Encapsulamento da aplicação
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div id="app">
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">Navbar</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="navbar-nav me-auto mb-2 mb-lg-0 collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<li class="nav-item">
						<router-link to="/" class="nav-link">
							<font-awesome-icon icon="home" /> Início
						</router-link>
					</li>
					<li class="nav-item">
						<router-link v-if="currentToken" to="/users" class="nav-link">
							<font-awesome-icon icon="users" /> Usuarios
						</router-link>
					</li>
					<li v-if="showDashboardSuperAdmin" class="nav-item">
						<router-link to="/super_admin" class="nav-link"
							>Super Admin Board</router-link
						>
					</li>
					<li v-if="showDashboardAdmin" class="nav-item">
						<router-link to="/admin" class="nav-link"
							>Admin Board</router-link
						>
					</li>
					<li v-if="showDashboardModerator" class="nav-item">
						<router-link to="/moderator" class="nav-link"
							>Moderator Board</router-link
						>
					</li>
					<li v-if="showDashboardUser" class="nav-item">
						<router-link to="/user" class="nav-link"
							>User Board</router-link
						>
					</li>
				</div>

				<div v-if="!currentToken" class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="/register" class="nav-link">
							<font-awesome-icon icon="user-plus" /> Sign Up
						</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/login" class="nav-link">
							<font-awesome-icon icon="sign-in-alt" /> LogIn
						</router-link>
					</li>
				</div>

				<div v-if="currentToken" class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="/profile" class="nav-link">
							<font-awesome-icon icon="user" /> Profile
						</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" @click.prevent="handleLogOut">
							<font-awesome-icon icon="sign-out-alt" /> LogOut
						</a>
					</li>
				</div>
			</div>
		</nav>

		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},
		currentToken() {
			if (this.loggedIn) {
				return this.$store.state.auth.decoded_token
			}
			return null
		},
		showDashboardAdmin() {
			try {
				return this.currentToken &&
					this.currentToken.additional_claims.role == 'ADMIN'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		showDashboardSuperAdmin() {
			try {
				return this.currentToken &&
					this.currentToken.additional_claims.role == 'SUPERADMIN'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		showDashboardModerator() {
			try {
				return this.currentToken &&
					this.currentToken.additional_claims.role == 'MODERATOR'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		showDashboardUser() {
			try {
				return this.currentToken &&
					this.currentToken.additional_claims.role == 'USER'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
	},
	methods: {
		handleLogOut() {
			this.$store
				.dispatch('auth/logout')
				.then((response) => {
					if (response.data.is_logged == 'false') {
						this.$router.push('/login')
					}
				})
				.catch(() => {
					this.successful = false
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
}
</script>
