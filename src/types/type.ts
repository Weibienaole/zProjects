import { RouteRecordRaw } from 'vue-router'

export interface IRoute {
	path: string
	redirect?: string
	name?: string
	hidden?: boolean
	component?: () => Promise<any>
	meta?: {
		title?: string
		icon?: any
		layout?: boolean // 是否显示layout 默认 true
		affix?: boolean // 是否固定在tags栏 默认 false
		noCache?: boolean // 是否拒绝keep-alive缓存 --- 弃用
	}
	children?: IRoutes
}

export type IRoutes = RouteRecordRaw[] & IRoute[]
