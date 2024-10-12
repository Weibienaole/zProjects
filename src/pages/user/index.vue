<template>
	<view id="User_Page_Container">
		<TopBar title="个人中心" @back="handleBack" bg="transparent" :showBottomLine="false" fixed />
		个人中心
		<LogoutToast ref="logoutToastComRef" />
	</view>
</template>

<script setup lang="ts">
	import { computed, onMounted, reactive, Ref, toRefs } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import LogoutToast from './components/LogoutToast.vue'
	import useCoreStore from '../../store/core'
	import { IFnEnreyItem } from './types';
	import * as api from '../../api/user'

	import utils from '../../utils';
	import storage from '../../utils/storage'

	const coreStore = useCoreStore()
	interface IPageState { }

	const state = reactive<IPageState>({})

	const { } = toRefs<IPageState>(state)



	onShow(() => {
		// api.getUserInfo().then(res => {
		// 	state.info = res.data
		// 	coreStore.user = res.data
		// })
	})

	const handleBack = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>