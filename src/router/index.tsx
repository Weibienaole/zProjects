import { RouteObject } from 'react-router-dom'

import rawRoutes from './asyncRoutes'
import NotFound from '@/views/404'
import { generateRouters } from './utils'
import Core from '@/views/core'
import ErrorBoundary from '@/components/ErrorBoundary'

const staticRoutes = generateRouters(rawRoutes)

export const baseRoute: RouteObject[] = [
	{
		path: '/',
		element: <Core />,
		errorElement: <ErrorBoundary />
	},
	// {
	//   path: '/login',
	//   element: <Login/>
	// }
	{
		path: '/*',
		element: <NotFound />
	}
]

export { staticRoutes }
