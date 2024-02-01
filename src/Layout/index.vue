<template>
	<div v-if="layoutShow" id="Layout_Container">
		<Sidebar />
		<div class="flexContainer">
			<header id="fixedHead">
				<div class="navBar">
					<div class="leftView">
						<Fold />
						<Breadcrumb />
					</div>
					<UserBasic />
				</div>
				<TagsView />
			</header>
			<el-scrollbar>
				<transition name="fade-transform" mode="out-in">
					<slot></slot>
				</transition>
			</el-scrollbar>
		</div>
	</div>
	<slot v-else></slot>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import Breadcrumb from './components/Breadcrumb/index.vue'
import UserBasic from './components/UserBasic/index.vue'
import TagsView from './components/TagsView/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Fold from './components/Fold/index.vue'

const router = useRouter()

const state = reactive({
	layoutShow: true
})

router.beforeEach((to, _, next) => {
	if (to.meta.layout === false) {
		state.layoutShow = false
	} else {
		state.layoutShow = true
	}
	next()
})

const { layoutShow } = toRefs(state)
</script>

<style scoped lang="scss">
#Layout_Container {
	width: 100%;
	height: 100%;
	display: flex;
	.flexContainer {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		#fixedHead {
			height: auto;
			width: 100%;
			.navBar {
				height: 55px;
				width: 100%;
				box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
				display: flex;
				align-items: center;
				justify-content: space-between;
				.leftView {
					height: 100%;
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
</style>
