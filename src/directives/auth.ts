import router from '@/router'
import { usePermissionStore } from '@/store/permission'
/**
 * 权限指令
 * @params :args
 * example v-auth:[按钮权限名称]
 */
const auth = {
	beforeMount(el, binding) {
		const permissionStore = usePermissionStore()
		const { arg: value } = binding
		//const nowPath = router.currentRoute._value.path
		const nowPath = router.currentRoute.value.path
		// userInfo 用户信息，从这里获取路由权限,根据 nowPath 找到对应权限，根据按钮权限内是否拥有value 决定是否展示
		const pathArrs = nowPath.split('/').filter((it) => !!it)
		const targetRoute = getTargetRoute([...pathArrs], permissionStore.routes)
		if (!targetRoute.permissionBtns?.some((it) => it.key === value)) {
			el.style.display = 'none'
		}
	}
}

const getTargetRoute = (paths, routes) => {
	const nowLevelPath = paths[0]
	const targetNowLevelRoute = routes.find(
		(item) =>
			item.path ===
			(item.path.startsWith('/') ? '/' + nowLevelPath : nowLevelPath)
	)
	paths.shift()
	if (targetNowLevelRoute?.children && paths[0]) {
		return getTargetRoute(paths, targetNowLevelRoute.children)
	} else {
		return targetNowLevelRoute
	}
}
export default auth
