//index.tsx
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import routes, { routeType } from './routes';
import _ from 'lodash';

export default function Routes() {
	const element = useRoutes(renderRoutes(routes));
	return element;
}

function renderRoutes(routes: Array<routeType>) {
	return _.map(routes, (item: routeType) => {
		if (item?.component) {
			const Component = React.lazy(item.component);
			item.element = (<React.Suspense fallback={'loading...'}>
				<Component />

			</React.Suspense>);
		}
		if (item?.children) {
			item.children = renderRoutes(item.children);
		}

		if (item?.redirect) {
			item.element = (
				<Navigate to={item.redirect} replace />
			)
		}

		return item;
	})
}
export const checkRouterAuth = (path: String) => {
	let auth = null
	auth = checkAuth(routes, path)
	return auth
}

//根据路径获取路由
const checkAuth = (routers: routeType[], path: String) => {
	for (const data of routers) {
		if (data.path == path) return data
		if (data.children) {
			const res: any = checkAuth(data.children, path)
			if (res) return res
		}
	}
	return null
}