import { combineReducers } from 'redux'

import authReducer from './authReducer'
import getLocation from './Location'
import data from './Data'
export default combineReducers({
  authReducer, getLocation, data
})