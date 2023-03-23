//routerBefore.ts
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { checkRouterAuth } from './index'
import Layout from '@/layout'
const RouterBeforeEach = (props: { children: JSX.Element }) => {
	const location = useLocation()
	let obj = checkRouterAuth(location.pathname)
	let isLogin = sessionStorage.getItem('login') || false
	if (obj?.meta?.title) {
		document.title = obj.meta.title;
	}
	if (obj && obj?.meta?.auth && !isLogin) {
		return <Navigate to="/login" />;

	}
	if (obj && obj.meta?.withLayout) {
		return <Layout>{props.children}</Layout>
	}
	return props.children
}

export default RouterBeforeEach