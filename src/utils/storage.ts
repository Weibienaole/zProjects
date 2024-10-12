class StorageClass {
	set(key : string, value : any) {
		value = JSON.stringify(value)
		uni.setStorageSync(key, value)
	}
	get(key : string, defaultVal ?: any) : any {
		const value = uni.getStorageSync(key)
		if (value === undefined || value === null || value === '') {
			return defaultVal
		}
		return JSON.parse(value)
	}
	remove(key : string) {
		uni.removeStorageSync(key)
	}
	clear() {
		uni.clearStorageSync()
	}
}

const storage = new StorageClass()

export default storage