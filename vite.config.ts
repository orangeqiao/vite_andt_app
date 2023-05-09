import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
	const env=loadEnv(mode,process.cwd())
	
	return ({
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@utils': path.resolve(__dirname, './src/utils'),
				'@hooks': path.resolve(__dirname, './src/hooks/index')
			}
		},
		css: {
			// css预处理器
			preprocessorOptions: {
				less: {
					charset: false,
					additionalData: '@import "./src/assets/css/variables.less";',
				},
			},
		},
		server:{
			port:3000,
			proxy:{
				'/api':{
					target:env.VITE_APP_PROXY_URL,
					changeOrigin:true,
					rewrite:(path)=>path.replace(/^\/api/,'')
	
				}
			},
		}

	})
 

})
