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
						<router-link
							v-if="hasSuperAdminPermission || hasAdminPermission"
							to="/users/read"
							class="nav-link"
						>
							<font-awesome-icon icon="users" /> Usuarios
						</router-link>
					</li>
					<li v-if="hasSuperAdminPermission" class="nav-item">
						<router-link to="/super_admin" class="nav-link"
							>Super Admin Board</router-link
						>
					</li>
					<li v-if="hasAdminPermission" class="nav-item">
						<router-link to="/admin" class="nav-link"
							>Admin Board</router-link
						>
					</li>
					<li v-if="hasModeratorPermission" class="nav-item">
						<router-link to="/moderator" class="nav-link"
							>Moderator Board</router-link
						>
					</li>
					<li v-if="hasUserPermission" class="nav-item">
						<router-link to="/user" class="nav-link"
							>User Board</router-link
						>
					</li>
				</div>

				<div v-if="!currentDecodedToken" class="navbar-nav ml-auto">
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

				<div v-if="currentDecodedToken" class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="/profile" class="nav-link">
							<font-awesome-icon icon="user" /> Profile
						</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="" @click.prevent="handleLogOut">
							<font-awesome-icon icon="sign-out-alt" /> LogOut
						</a>
					</li>
				</div>
			</div>
		</nav>

		<div class="container">
			<router-view />
		</div>

		<div class="container footer">
			<footer
				class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
			>
				<div class="col-md-4 d-flex align-items-center">
					<span class="mb-3 mb-md-0 text-muted"
						>All rights reserved © 2024
						<a href="https://github.com/malki-cedheq">
							malki-cedheq
						</a></span
					>
				</div>
				<ul class="nav col-md-3 justify-content-end list-unstyled d-flex">
					<li class="ms-3">
						<a class="text-muted" href="#"
							><font-awesome-icon icon="camera-retro"
						/></a>
					</li>
					<li class="ms-3">
						<a class="text-muted" href="#"
							><font-awesome-icon icon="envelope"
						/></a>
					</li>
					<li class="ms-3">
						<a class="text-muted" href="#"
							><font-awesome-icon icon="comment"
						/></a>
					</li>
				</ul>
			</footer>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},
		currentDecodedToken() {
			if (this.loggedIn) {
				return this.$store.state.auth.decoded_token
			}
			return null
		},
		hasAdminPermission() {
			try {
				return this.currentDecodedToken &&
					this.currentDecodedToken.additional_claims.role == 'ADMIN'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		hasSuperAdminPermission() {
			try {
				return this.currentDecodedToken &&
					this.currentDecodedToken.additional_claims.role == 'SUPERADMIN'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		hasModeratorPermission() {
			try {
				return this.currentDecodedToken &&
					this.currentDecodedToken.additional_claims.role == 'MODERATOR'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
		hasUserPermission() {
			try {
				return this.currentDecodedToken &&
					this.currentDecodedToken.additional_claims.role == 'USER'
					? true
					: false
			} catch (error) {
				console.log(error)
			}
		},
	},
	methods: {
		async handleLogOut() {
			await this.$store.dispatch('auth/logout')
			this.$router.push('/login')
		},
	},
}
</script>
<style>
.footer {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100%;
	text-align: center;
}
</style>
