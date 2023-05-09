
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
		path: '/language',
		component: () => import('@/pages/language'),
		meta: {
			title: "i18n语言切换",
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
	{
		path: '/xfy-page/map',
		component: () => import('@/pages/xfy-page/map'),
		meta: {
			title: "地图",
			auth:false
		}
	},
]

export default routes;