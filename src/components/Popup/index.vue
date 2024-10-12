<template>
	<view v-show="isShow" class="Popup_Component_Container" :class="isUp && 'Popup_Component_Container_Up'">
		<view class="container" id="popupContainer" :style="{height, bottom, paddingBottom: `${coreStore.bottom}rpx`}">
			<slot />
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { toRefs, reactive } from 'vue';

	import useCoreStore from '../../store/core'

	const coreStore = useCoreStore()

	interface IPageState {
		isShow : boolean
		isUp : boolean
		popupHei : number
	}
	const state = reactive<IPageState>({
		isShow: false,
		isUp: false,
		popupHei: 0
	})
	const {
		isShow,
		isUp,
	} = toRefs<IPageState>(state)

	const height = computed(() => {
		return (state.popupHei || '') + 'px'
	})

	const bottom = computed(() => {
		if (state.isUp) {
			return '0'
		} else {
			if (height.value === 'px') {
				return '0'
			} else {
				return '-' + height.value
			}
		}
	})

	const open = () => {
		if (state.isShow) {
			return;
		}

		state.isShow = true
		const timer = setTimeout(() => {
			const query = uni.createSelectorQuery()
			query.select('#popupContainer').boundingClientRect(data => {
				const top = (data as { height : number })?.height || 0
				state.popupHei = top
			}).exec();
			state.isUp = true
			clearTimeout(timer)
		}, 0)
	}

	const close = () => {
		if (!state.isShow) {
			return;
		}

		state.isUp = false
		const timer = setTimeout(() => {
			state.isShow = false
			clearTimeout(timer)
		}, 300)
	}

	defineExpose({
		open,
		close
	})
</script>

<style lang="scss" scoped>
	.Popup_Component_Container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		transition: .3s all;
		opacity: 0;
		background-color: rgba(0, 0, 0, .5);

		.container {
			transition: .3s all;
			position: absolute;
			// bottom: -570rpx;
			left: 0;
			right: 0;
			// height: 570rpx;
			background-color: #fff;
			border-radius: 38rpx 38rpx 0rpx 0rpx;
		}
	}

	.Popup_Component_Container_Up {
		opacity: 1;
	}
</style>