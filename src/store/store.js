import { combineReducers } from 'redux-immutable'
import { reducer as indexReducer } from '../page/index/store'

const reducer = combineReducers({
  index: indexReducer,
})

export default reducer
