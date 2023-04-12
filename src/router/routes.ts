
export interface routeType {
	path: string
	component?: any
	element?: any
	children?: Array<routeType>
	meta?: {
		title?: string
		auth?: boolean
		withLayout?: boolean
	}
	redirect?: string
}

const routes: Array<routeType> = [
	{
		path: '/',
		redirect: '/about',
	},
	{
		path: '/about',
		component: () => import('@/pages/about'),
		meta: {
			title: "关于",
			auth:true
		}
	},
	{
		path: '/user',
		component: () => import('@/pages/user'),
		meta: {
			title: "用户",
			auth:false
		}
	},
	{
		path: '/login',
		component: () => import('@/pages/login'),
		meta: {
			title: "登录",
			auth:false
		}
	},
]

export default routes;