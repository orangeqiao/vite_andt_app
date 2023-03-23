
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
		}
	},
	{
		path: '/user',
		component: () => import('@/pages/user'),
		meta: {
			title: "用户",
			auth:true
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