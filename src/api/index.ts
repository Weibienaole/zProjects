import request from "../utils/request"

export const getBaseData = () : Promise<any> => {
	return request.send('front/home/imageText', {}, { method: 'get' })
}