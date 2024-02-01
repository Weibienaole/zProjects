<template>
	<el-icon v-if="props.icon">
		<img
			v-if="isExternal(props.icon)"
			:src="props.icon"
			alt=""
			class="svg-icon"
		/>
		<svg-icon v-else :name="props.icon" />
	</el-icon>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'

const props = defineProps({
	icon: {
		type: String,
		default: ''
	}
})
</script>
