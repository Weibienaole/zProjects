<template>
	<view class="TopBar_Components_Container" :class="props.fixed && 'TopBar_Components_Container_Fixed'"
		:style="{'border-top': top + 'px solid ' + props.bg}">
		<view v-if="coreStore.isMpWx" class="container"
			:style="{height, backgroundColor: props.bg, borderBottom: props.showBottomLine ? '1rpx solid #E6E6E6' : 0}">
			<view v-if="!props.noArrow" class="arrow">
				<image v-if="props.type === '1'" src="../../../static/backArrow.svg" alt="" class="icon" @click="handleBack" />
				<image v-else src="../../../static/whiteBackArrow.svg" alt="" class="icon" @click="handleBack" />
			</view>
			<text class="title" :style="{color: props.type === '1' ? '#181818' : '#fff'}">{{props.title}}</text>
			<!-- <text class="right"></text> -->
		</view>
	</view>
</template>

<script lang="ts" setup>
	/**
	 * @param {string} title 标题，可选
	 * @param {string} bg 背景颜色，可选
	 * @param {'1' | '2'} type 颜色类别 1-黑色系 2-白色系
	 * @param {boolean} showBottomLine 是否显示border-bottoml ine，可选
	 * @param {boolean} noArrow 是否隐藏arrow
	 * @param {boolean} fixed 顶部栏是否定位
	 * @param {function} back 点击arrow的触发事件 () => void
	 */
	import { onMounted, reactive, toRefs } from 'vue';
	import useCoreStore from '../../store/core'

	interface ITopBarProps {
		title ?: string
		noArrow ?: boolean
		bg ?: string
		type ?: '1' | '2'
		showBottomLine ?: boolean
		fixed ?: boolean
	}

	const props = withDefaults(defineProps<ITopBarProps>(), {
		title: '',
		noArrow: false,
		bg: '#fff',
		showBottomLine: true,
		type: '1',
		fixed: true
	})

	const emit = defineEmits(['back'])

	const coreStore = useCoreStore()

	const state = reactive({
		top: 0,
		height: '87rpx',
		isMpWx: true
	})
	onMounted(() => {
		// #ifndef H5
		const menuInfo = uni.getMenuButtonBoundingClientRect()
		state.top = menuInfo.top
		const systemInfo = uni.getSystemInfoSync()
		const proportion = 750 / systemInfo.windowWidth
		// 默认胶囊平齐，需要多出一点点，符合UI
		const height = menuInfo.height * proportion + 8
		state.height = height + 'rpx'
		// record
		coreStore.top = menuInfo.top * proportion
		coreStore.bottom = (systemInfo.safeAreaInsets as { bottom : number }).bottom * proportion
		coreStore.height = height
		// #endif
	})

	const handleBack = () => {
		emit('back')
	}

	const { top, height } = toRefs(state)
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>