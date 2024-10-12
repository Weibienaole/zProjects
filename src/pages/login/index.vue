<template>
	<view id="Login_Page_Container">
		<TopBar title="登录" @back='handleBack' bg="transparent" :showBottomLine="false" fixed />
		login
	</view>
</template>


<script setup lang="ts">
	import { reactive, toRefs, computed, Ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import useCoreStore from '../../store/core'
	import utils from '../../utils';
	import * as api from '../../api/login'
	import * as userApi from '../../api/user'

	interface IPageState {
	}
	const coreStore = useCoreStore()
	const state = reactive<IPageState>({
	})
	const { } = toRefs<IPageState>(state)

	onLoad(() => {

		// uni.authorize({
		// 	scope: 'scope.userInfo'
		// })

		// api.isNewUser().then(r => {
		// 	state.isNewUser = r.data
		// })
	})
	const handleBack = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>