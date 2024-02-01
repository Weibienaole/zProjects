<template>
	<div id="LayoutComponents_Fold_Container">
		<svg-icon
			v-if="isFold"
			name="hamburgerClose"
			@click="coreStore.handleSetFold(false)"
		/>
		<svg-icon
			v-else
			name="hamburgerOpen"
			@click="coreStore.handleSetFold(true)"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { useCoreStore } from '@/store/core'
import { throttle } from '@/utils/index'

const coreStore = useCoreStore()

const isFold = computed(() => coreStore.isFold)

// 屏幕变化
const handleWindowResize = ({ target }) => {
	if (target.innerWidth < 880) {
		coreStore.isFold = false
	} else if (target.innerWidth > 1400) {
		coreStore.isFold = true
	}
}
const throttleWindowResize = throttle(handleWindowResize, 300)

const watchStop = watchEffect(() => {
	handleWindowResize({ target: window })
	window.addEventListener('resize', throttleWindowResize)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', throttleWindowResize)
	watchStop()
})
</script>

<style scoped lang="scss">
#LayoutComponents_Fold_Container {
	display: flex;
	cursor: pointer;
	.svg-icon {
		font-size: 22px;
	}
}
</style>
