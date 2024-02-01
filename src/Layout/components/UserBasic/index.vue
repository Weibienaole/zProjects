<template>
	<div id="Layout_Components_UserBasic">
		<div class="utils">some icon</div>
		<div class="user">
			<img src="" alt="" class="face" />
			<span class="name">Monica</span>
		</div>
		<div class="logout">
			<el-popconfirm
				width="220"
				confirm-button-text="登出"
				cancel-button-text="取消"
				icon-color="#626AEF"
				title="确认要登出吗？"
				@confirm="logout"
			>
				<template #reference>
					<svg-icon name="logout" />
				</template>
			</el-popconfirm>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.ts'
const userStore = useUserStore()
const logout = () => {
	userStore.logout()
	//router.push({
	//	path: '/login'
	//})
}
</script>

<style scoped lang="scss">
#Layout_Components_UserBasic {
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 20px;
	.logout {
		font-size: 25px;
		.svg-icon {
			outline: none;
			cursor: pointer;
		}
	}
}
</style>
