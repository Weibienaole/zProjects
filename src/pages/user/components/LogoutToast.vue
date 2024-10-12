<template>
	<view v-if="show" class="LogoutToast_Component_Container">
		<view class="container">
			<text class="title">确定退出登录吗</text>
			<view class="btns">
				<view class="btn" @click="handleClickBtn('cancel')">取消</view>
				<view class="btn btn2" @click="handleClickBtn('confirm')">确定</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	/**
	 * 登出弹窗
	 */
	import { toRefs, reactive } from 'vue';
	import useCoreStore from '../../../store/core'

	interface IPageState {
		show : boolean
	}
	const state = reactive<IPageState>({
		show: false
	})
	const {
		show
	} = toRefs<IPageState>(state)

	const handleClickBtn = (t : 'cancel' | 'confirm') => {
		if (t === 'confirm') {
			// req logout
			const coreStore = useCoreStore()
			coreStore.logout()
		}
		close()
	}

	const open = () => {
		state.show = true
	}

	const close = () => {
		state.show = false
	}

	defineExpose({
		open,
		close
	})
</script>

<style lang="scss" scoped>
	.LogoutToast_Component_Container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, .4);
		z-index: 10;

		.container {
			width: 460rpx;
			height: 201rpx;
			padding: 40rpx 50rpx;
			background: linear-gradient(180deg, #FFE1E1 0%, #FFFFFF 100%);
			border-radius: 64rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 38rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				color: #231815;
			}

			.input {
				width: 100%;
				height: 88rpx;
				border-radius: 16rpx;
				border: 1rpx solid #AFAFAF;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #181818;
			}

			.btns {
				width: 100%;
				height: 88rpx;
				display: flex;
				justify-content: space-between;

				.btn {
					width: 210rpx;
					height: 100%;
					border-radius: 44rpx;
					border: 1rpx solid #AFAFAF;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 30rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.btn2 {
					color: #FFFFFF;
					background: #BF1A1E;
				}
			}
		}
	}
</style>