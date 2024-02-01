<template>
	<div id="Layout_Components_Breadcrumb">
		<el-breadcrumb>
			<el-breadcrumb-item
				v-for="item in routes"
				:key="item.name"
				:to="item.components ? { path: item.path } : undefined"
			>
				{{ item.meta.title }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const state = reactive({
	routes: []
})

const filterRoutes = (routes) => {
	return routes.filter(
		(route) =>
			route.path &&
			route.path !== '/' &&
			route.path !== '/home' &&
			route?.meta?.title
	)
}

watchEffect(() => {
	state.routes = [
		{ name: 'Core', meta: { title: '首页' }, path: '/home', components: true },
		...filterRoutes(route.matched)
	]
})
const { routes } = toRefs(state)
</script>

<style scoped lang="scss">
#Layout_Components_Breadcrumb {
	margin-left: 10px;
}
</style>
