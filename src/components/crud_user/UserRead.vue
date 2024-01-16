<!-- 
file: src.component.UserRead.vue
description: 
  Componente para listagem de dados
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
    <div id="app" class="container">
        <div id="excluir_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="excluir_modalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header card-header">
                        <h5 class="modal-title" id="excluir_modalLabel">Confirmação de exclusão</h5>
                    </div>
                    <div class="modal-body">
                        <p>Você tem certeza que deseja excluir este registro?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                        <button type="button" @click="deleteUser(selectedUserId)" class="btn btn-danger"
                            data-bs-dismiss="modal">Sim</button>
                    </div>
                </div>
            </div>
        </div>

        <p v-if="loading">Carregando dados...</p>
        <div v-else>
            <h3 class="heading">UserRead</h3>
            <router-link to="/user/create" class="btn btn-outline-primary float-start my-3"><font-awesome-icon
                    icon="user-plus" /> Add
                User</router-link>
            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">username</th>
                        <th scope="col">email</th>
                        <th scope="col">role</th>
                        <th scope="col">is_active?</th>
                        <th scope="col">items</th>
                        <th scope="col">actions</th>
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
                        <td class="text-center">
                            <router-link :to="{ path: '/user/' + user.id + '/edit' }" class="btn btn-outline-success me-3">
                                <font-awesome-icon icon="user-pen" />
                            </router-link>
                            <button type="button" @click="modalDeleteUser(user.id)" class="btn btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#excluir_modal">
                                <font-awesome-icon icon="user-minus" />
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
        </div>
    </div>
</template>
<script>
import UserService from '../../services/user.service'

export default {
    name: 'users',
    data() {
        return {
            loading: false,
            all_users: null,
            successful: false,
            message: '',
            selectedUserId: null,
        }
    },
    methods: {
        getUsers() {
            UserService.getPublicContent()
                .then(
                    (response) => {
                        this.all_users = response.data
                        this.successful = true
                        this.message = 'Dados de usuários carregados com sucesso.'
                    },
                )
                .catch((error) => {
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    this.successful = false
                    this.message = 'Não foi possivel carregar os dados de usuários.'
                    console.log(error)
                })
                .finally(() => (this.loading = false))
        },
        modalDeleteUser(userId) { this.selectedUserId = userId },
        deleteUser(userId) {
            UserService.delete(userId)
                .then(
                    (response) => {
                        this.successful = true
                        this.message = 'Usuário removido com sucesso.'
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
                .catch((error) => {
                    this.successful = false
                    this.message = 'Não foi possivel remover o usuário.'
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false
                    this.getUsers()
                })

        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
