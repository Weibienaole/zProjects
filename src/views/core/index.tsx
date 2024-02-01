import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'

import { CoreSty } from './style'
import { setThemeKeyDis } from './store/actionCreators'
import * as api from '@/api/core'
import { useEffect } from 'react'

interface IProps {
	themeKey: number
	setThemeKeyDispatch: any
}

const Core = (props: IProps) => {
	const { themeKey } = props
	console.log(themeKey, 'themeKey')

	useEffect(() => {
		api
			.testReq({
				wearUser: 32,
				wearDate: '0000-00-00'
			})
			.then((res) => {
				console.log(res)
			})
		//throw new Error('testErrpr')
	}, [])

	return (
		<CoreSty>
			<Outlet />
		</CoreSty>
	)
}

const mapStateToProps = (state) => ({
	themeKey: state.getIn(['core', 'themeKey'])
})

const mapDispatchToProps = (dispatch) => ({
	setThemeKeyDispatch(key) {
		dispatch(setThemeKeyDis(key))
	}
})

const RCore = connect(mapStateToProps, mapDispatchToProps)(Core)

export default RCore
