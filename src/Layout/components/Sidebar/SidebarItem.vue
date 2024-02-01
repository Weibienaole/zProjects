<template>
	<template v-if="!item.hidden">
		<template v-if="item.component">
			<app-link :to="resolvePath(item.path)">
				<el-menu-item :index="resolvePath(item.path)">
					<Icon v-if="item.meta?.icon" :icon="item.meta?.icon" />
					<template #title>{{ item.meta?.title }}</template>
				</el-menu-item>
			</app-link>
		</template>
		<el-sub-menu
			v-else
			:index="resolvePath(item.path)"
			:show-timeout="0"
			:hide-timeout="0"
		>
			<template v-if="item.meta" #title>
				<Icon :icon="item.meta?.icon" />
				<span> {{ item.meta.title }}</span>
			</template>
			<sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:item="child"
				:base-path="resolvePath(child.path)"
			/>
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts">
import path from 'path-browserify'
import { IRoute } from '@/types/type'
import { isExternal } from '@/utils/validate'
import Icon from './Icon.vue'
import AppLink from './Link.vue'

interface IProps {
	item: IRoute
	basePath?: string
}
const props = defineProps<IProps>()

/**
 * @method resolvePath 处理路径
 * @param {*} routePath
 */
const resolvePath = (routePath) => {
	if (isExternal(routePath)) {
		return routePath
	}
	if (isExternal(props.basePath)) {
		return props.basePath
	}

	if (props.basePath.endsWith(routePath)) {
		return props.basePath
	} else {
		return path.resolve(props.basePath, routePath)
	}
}
</script>

<style scoped lang="scss">
#pageContainer {
}
</style>
