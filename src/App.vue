<template>
	<router-view v-slot="{ Component }">
		<el-config-provider size="default" :z-index="2000" :locale="local">
			<Layout>
				<keep-alive :max="6">
					<component :is="Component" />
				</keep-alive>
			</Layout>
		</el-config-provider>
	</router-view>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { reactive, toRefs } from 'vue'

import Layout from '@/Layout/index.vue'

const state = reactive({
	// 国际化
	local: zhCn
})

const { local } = toRefs(state)
</script>

<style scoped lang="scss"></style>
