<!-- 
file: src.component.Register.vue
description: 
  Componente para cadastro de usuário
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div class="col-md-12">
		<div class="card card-container text-center modal-content animate">
			<div class="card-body">
				<h2 class="card-title">Register</h2>
				<div class="imgcontainer">
					<img
						id="profile-img"
						src="https://www.w3schools.com/howto/img_avatar2.png"
						class="avatar"
					/>
				</div>
				<Form @submit="handleRegister" :validation-schema="schema">
					<div v-if="!successful">
						<div class="form-group px-5">
							<label for="username">Username</label>
							<Field
								name="username"
								type="text"
								class="form-control"
								rules="name"
								v-tooltip="
									'Informe o nome do usuário, não deve conter números.'
								"
							/>
							<span class="error-feedback-span">
								<ErrorMessage name="username" class="error-feedback" />
							</span>
						</div>
						<div class="form-group px-5">
							<label for="role">Role</label>
							<Field
								name="role"
								as="select"
								class="form-control"
								v-tooltip="
									'Informe o nível de privilégio de acesso para o usuário.'
								"
							>
								<option value="">Escolha um...</option>
								<option value="USER">Usuário</option>
								<option value="MODERATOR">Moderador</option>
								<option value="ADMIN">Administrador</option>
							</Field>
							<span class="error-feedback-span">
								<ErrorMessage name="role" class="error-feedback" />
							</span>
						</div>
						<div class="form-group px-5">
							<label for="email">Email</label>
							<Field
								name="email"
								type="email"
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
								class="form-control"
								v-tooltip="
									'Informe uma senha difícil. Use letras maiúsculas, minúsculas e evite números sequenciais.'
								"
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
								Sign Up
							</button>
						</div>
					</div>
				</Form>

				<div
					v-if="message"
					class="alert"
					:class="successful ? 'alert-success' : 'alert-danger'"
				>
					{{ message }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from '../services/user.service'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import * as yup from 'yup'

defineRule('name', (value) => {
	if (!value || !value.length) {
		return true
	}

	if (!/^[a-z]+(-[a-z]+)*$/.test(value)) {
		return 'This field must be a valid name'
	}

	return true
})

export default {
	name: 'Register',
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			username: yup
				.string()
				.required('Necessário fornecer um Username!')
				.min(3, 'Não deve ter ao menos de 6 caracteres!')
				.max(20, 'Não deve ultrapassar 16 caracteres!'),
			email: yup
				.string()
				.required('Necessário fornecer um E-mail!')
				.email('E-mail inválido!')
				.max(50, 'Não deve ultrapassar 50 caracteres!'),
			password: yup
				.string()
				.required('Necessário fornecer um Password!')
				.min(6, 'Não deve ter ao menos de 6 caracteres!')
				.max(16, 'Não deve ultrapassar 16 caracteres!'),
			role: yup
				.string()
				.required('Necessário fornecer uma Role!')
				.oneOf(['USER', 'MODERATOR', 'ADMIN'])
				.label('Escolha um...'),
		})

		return {
			successful: false,
			loading: false,
			message: '',
			schema,
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},
	},
	mounted() {
		if (this.loggedIn) {
			this.$router.push('/profile')
		}
	},
	methods: {
		handleRegister(user) {
			this.message = ''
			this.successful = false
			this.loading = true

			UserService.register(user)
				.then((response) => {
					this.message = 'Cadastrado com sucesso!'
					this.successful = true
					setTimeout(() => {
						this.$router.push('/login')
					}, 1000)
					return response.data
				})
				.catch((error) => {
					if (error.response.status == 400) {
						this.message = error.response.data.detail
					} else {
						this.message = 'Ocorreu um erro no servidor.'
					}
					this.successful = false
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
