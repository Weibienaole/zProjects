import request from '../utils/request'

interface IReqObj {
	code : string
	invitationCode ?: string | null
	phone : string
}
// 手机号登陆
export const phoneLogin = (reqObj : IReqObj) => {
	return request.send('front/gw-user/loginByPhone', reqObj)
}

// 获取wx.login code
export const getMpWxCode = () : Promise<{ code : string }> => {
	return new Promise((res, rej) => {
		uni.login({
			// provider: 'weixin',
			onlyAuthorize: true,
			async success(r) {
				res(r)
			},
			fail() {
				rej()
			}
		})
	})
}

export interface IMpWxLoginReqParams {
	code : string
	headImgUrl ?: string
	nickname ?: string
	invitationCode ?: string
	phoneCode ?: string
}

// 小程序 快速登陆
export const mpWxLogin = (reqObj : IMpWxLoginReqParams) => {
	return request.send('front/WeChat/applet/login', reqObj)
}