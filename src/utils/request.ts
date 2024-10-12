import { IResponseData } from "./types"
import storage from './storage'
import utils from "./index"

// 白名单
const whiteLs = ['index/index']

// 使之参数可选
type requestConfig = {
	[key in keyof UniApp.RequestOptions]?: any
}

class RequestClass {
	private BASE_URL : string
	constructor() {
		this.init()
	}
	private init() {
		// 拦截器
		uni.addInterceptor('request', {
			invoke(args : unknown) {
				// 拦截前
				// token ?
				// if (!args.header?.Authorization) {
				// uni.navigateTo({
				// 	url: ''
				// })
				// }
			},
			// 拦截后
			returnValue(args : unknown) {
				uni.hideLoading()
				return args
			}
		})
	}
	send(url : string, data : object = {}, config : requestConfig & { pureData ?: boolean } = {}) : Promise<any> {
		if (url === '') {
			throw new Error('请指定请求url！')
		}
		uni.hideToast()
		uni.showLoading({
			mask: true,
		})
		if (!this.BASE_URL) {
			this.BASE_URL = utils.returnEnvConstants('baseUrl')
		}
		url = `${this.BASE_URL}${url}`
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				method: 'POST',
				data,
				timeout: 5000,
				...config,
				header: {
					'Authorization': storage.get('token', ''),
					...(config.header || {})
				},
				success: res => {
					const data = res.data as IResponseData
					if ((res.statusCode === 200 && data.code === 200) || (config.pureData && res.statusCode === 200)) {
						resolve(data)
					} else if (data.code === 403 || data.code === 401) {
						utils.goTargetPage('login/index', {}, 'redirectTo')
					} else {
						this.reqError(res)
						reject(res)
					}
				},
				fail: (err) => {
					reject(err)
					this.reqError(err.errMsg || '请求错误！')
				},
				complete: () => {
					// uni.hideLoading()
				}
			})
		})
	}
	reqError(err : any) {
		let errMsg : string = ''
		if (typeof err === 'string') {
			errMsg = err
		} else if (err.statusCode === 500) {
			errMsg = '服务器错误！'
		} else {
			errMsg = err.data?.msg || ''
		}
		uni.showToast({
			icon: 'none',
			title: errMsg,
			mask: true,
			duration: 2000,
			position: 'bottom'
		})
	}
}

const request = new RequestClass()

export default request