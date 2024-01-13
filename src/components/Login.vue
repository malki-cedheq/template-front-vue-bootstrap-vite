<!-- 
file: src.component.Login.vue
description: 
  Componente para realização de login do usuário
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div class="col-md-12">
		<div class="card card-container text-center modal-content animate">
			<div class="card-body">
				<h2 class="card-title">Login</h2>

				<div class="imgcontainer">
					<img
						id="profile-img"
						src="https://www.w3schools.com/howto/img_avatar2.png"
						class="avatar"
					/>
				</div>
				<Form @submit="handleLogin" :validation-schema="schema">
					<div class="form-group px-5">
						<label for="email">Email</label>
						<Field
							name="email"
							type="email"
							v-model="user.email"
							class="form-control"
							v-tooltip="'Informe o email (eg.abc@dominio.com)'"
						/>
						<span class="error-feedback-span">
							<ErrorMessage name="email" class="error-feedback" />
						</span>
					</div>
					<div class="form-group px-5">
						<label for="password">Password</label>
						<Field
							name="password"
							type="password"
							v-model="user.password"
							class="form-control"
							v-tooltip="'Informe a senha do usuário informado.'"
						/>
						<span class="error-feedback-span">
							<ErrorMessage name="password" class="error-feedback" />
						</span>
					</div>

					<div class="form-group px-5 py-5">
						<button
							class="btn btn-primary btn-block pxy-10"
							:disabled="loading"
						>
							<span
								v-show="loading"
								class="spinner-border spinner-border-sm"
							></span>
							<span>Login</span>
						</button>
					</div>

					<div class="form-group">
						<div
							v-if="message"
							class="alert"
							:class="successful ? 'alert-success' : 'alert-danger'"
						>
							{{ message }}
						</div>
					</div>
				</Form>
			</div>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
	name: 'Login',
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			email: yup
				.string()
				.required('Necessário fornecer um E-mail!')
				.email('E-mail inválido!'),
			password: yup.string().required('Necessário fornecer um Password!'),
		})

		return {
			user: { email: '', password: '' },
			loading: false,
			successful: false,
			message: '',
			schema,
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push('/profile')
		}
	},
	methods: {
		handleLogin(user) {
			this.message = ''
			this.successful = false
			this.loading = true

			this.$store
				.dispatch('auth/login', user)
				.then((response) => {
					if (response.data.access_token) {
						if (this.$store.state.auth.token) {
							this.successful = true
							this.message = 'Logado(a) com sucesso!'
							setTimeout(() => {
								this.$router.push('/profile')
							}, 1000)
						} else {
							this.successful = false
							this.message = 'Ocorreu um falha no servidor. Error 01'
						}
					} else {
						this.successful = false
						this.message = 'Ocorreu um falha no servidor. . Error 02'
					}
				})
				.catch((error) => {
					this.successful = false
					this.message =
						(error.response &&
							error.data &&
							error.data.message &&
							error.data.detail) ||
						error.message ||
						error.toString()
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
}
</script>

<style scoped>
.error-feedback {
	color: rgba(255, 0, 0, 0.75);
	text-shadow: 1px 1px #757575;
}

span.error-feedback-span {
	display: inline-block;
	-webkit-animation: tilt-n-move-shaking 0.5s infinite;
	animation: tilt-n-move-shaking 0.5s infinite;
}

span.error-feedback-span:hover {
	display: inline-block;
	-webkit-animation: tilt-n-move-shaking 0.5s infinite;
	animation: tilt-n-move-shaking 0.5s infinite;
}

@keyframes tilt-n-move-shaking {
	0% {
		transform: translate(0, 0) rotate(0deg);
	}

	25% {
		transform: translate(2px, 2px) rotate(2deg);
	}

	50% {
		transform: translate(0, 0) rotate(0eg);
	}

	75% {
		transform: translate(-2px, 2px) rotate(-2deg);
	}

	100% {
		transform: translate(0, 0) rotate(0deg);
	}
}

.imgcontainer {
	text-align: center;
	margin: 24px 0 12px 0;
	position: relative;
}

img.avatar {
	width: 200px;
	border-radius: 50%;
}

.animate {
	-webkit-animation: animatezoom 0.6s;
	animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
	from {
		-webkit-transform: scale(0);
	}

	to {
		-webkit-transform: scale(1);
	}
}

@keyframes animatezoom {
	from {
		transform: scale(0);
	}

	to {
		transform: scale(1);
	}
}

.modal-content {
	background-color: #fefefe;
	margin: 5% auto 15% auto;
	border: 0px none #757575;
	border-radius: 20px 20px 20px 20px;
	width: 60%;
	box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 300px) {
	span.psw {
		display: block;
		float: none;
	}

	.cancelbtn {
		width: 100%;
	}
}
</style>
