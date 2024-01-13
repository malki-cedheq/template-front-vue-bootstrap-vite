/*
file: vite.config.js
description: 
  configura o projeto Vite com Vue, definindo plugins, aliases, 
  variáveis de ambiente e configurações do servidor
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		// vite config
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		server: {
			port: env.VITE_APP_FRONTEND_PORT,
			proxy: env.VITE_APP_BACKEND_BASE_URL,
		},
	}
})
