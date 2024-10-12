import { defineStore } from 'pinia'
import storage from '../utils/storage'

interface IState {
	top : number
	height : number
	bottom : number
	isMpWx : boolean
	user : {
		avatar ?: string
		id ?: string
		[key : string] : any
	}
}

const useCoreStore = () => defineStore('core', {
	state: () : IState => {
		return {
			top: 0, // 安全区域top位置 rpx
			height: 87, // topbar hei rpx
			bottom: 0, // 安全区域bottom rpx
			isMpWx: true, // 是否为小程序
			user: {}
		}
	},
	actions: {
		logout() {
			// state.
			this.user = {}
			storage.clear()
			// 重置
			uni.reLaunch({
				url: '/src/pages/index/index'
			})
		}
	},
	getters: {
		topMargin: (state) => {
			if (state.isMpWx) {
				return ((state.height + state.top) || 1) + 'rpx'
			} else {
				return '1rpx'
			}
		}
	}
})

export default useCoreStore()