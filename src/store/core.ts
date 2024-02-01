import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', {
	state: () => {
		return {
			isFold: true
		}
	},
	getters: {},
	actions: {
		handleSetFold(bol) {
			this.isFold = bol
		}
	}
})
