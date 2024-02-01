<template>
	<div id="Layout_Components_Sidebar">
		<div class="logo">
			<img
				src="https://pic1.zhimg.com/v2-d3f3bd28aa107880db5c3e38b8e74e20_b.jpg"
				alt=""
				class="pic"
			/>
			<span v-if="isFold" class="name">Monica</span>
		</div>
		<el-scrollbar class="menuContainer">
			<el-menu
				:default-active="activeMenu"
				class="elMenuContainer"
				mode="vertical"
				:collapse="!isFold"
				:collapse-transition="false"
			>
				<SidebarItem
					v-for="item in routes"
					:key="item.name"
					:item="item"
					:base-path="item.path"
				/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { usePermissionStore } from '@/store/permission'
import SidebarItem from './SidebarItem.vue'
import { useCoreStore } from '@/store/core'

const permissionStore = usePermissionStore()
const coreStore = useCoreStore()

const routes = computed(() => permissionStore.routes)

const route = useRoute()
const activeMenu = computed<string>(() => {
	const { meta, path } = route
	if (meta.activeMenu) {
		return meta.activeMenu.toString()
	}
	return path
})

const isFold = computed(() => coreStore.isFold)

const layoutWid = computed(() => (isFold.value ? '230px' : '65px'))
</script>

<style scoped lang="scss">
@import './index.scss';
#Layout_Components_Sidebar {
	width: v-bind(layoutWid);
}
</style>

<style lang="scss"></style>
