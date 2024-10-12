<script lang='ts'>
	// import useCoreStore from './src/store/core'
	// import storage from './src/utils/storage'
	export default {
		globalData: {},
		onLaunch: function() {
			// this.init()
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			init() {
				// const storeUser = storage.get('user', {})
				// coreStore.user = storeUser
			}
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';

	// 设置整个项目的背景色
	page {
		background-color: #F5F8FE;
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
	}

	/* 不显示滚动条 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar {
		display: none;
	}

	// #endif
</style>