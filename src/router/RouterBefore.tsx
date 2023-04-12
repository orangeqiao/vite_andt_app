//routerBefore.ts
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { checkRouterAuth } from './index'
import Layout from '@/layout'
import { useEffect } from "react";
const RouterBeforeEach = (props: { children: JSX.Element }) => {
	const location = useLocation()
	const navigate=useNavigate()
	let obj = checkRouterAuth(location.pathname)
	let isLogin = sessionStorage.getItem('login') || false
	useEffect(()=>{
		console.log(obj)
		if (obj?.meta?.title) {
			document.title = obj.meta.title;
		}
		if (obj && obj?.meta?.auth && !isLogin) {
			// return <Navigate to="/login" />;
			navigate('/login')
	
		}
	},[obj])

	if (obj && obj.meta?.withLayout) {
		return <Layout>{props.children}</Layout>
	}
	return props.children
}

export default RouterBeforeEach