import request from '../utils/request'

export const getUserInfo = () => {
	return request.send('front/gw-user/selectById', {}, { method: 'get' })
}