import { combineReducers } from 'redux'
import { user } from './user.reducer'
import { supplier } from './supplier.reducer'
import { alert } from './alert.reducer'
import { error } from './error.reducer'
import { map } from './map.reducer'
import { admin } from './admin.reducer'
import { file } from './file.reducer'
import { category } from './category.reducer'
import { notification } from './notification.reducer'
import { web } from './web.reducer'

const rootReducer = combineReducers({
  user,
  supplier,
  alert,
  error,
  map,
  admin,
  file,
  category,
  notification,
  web
})

export default rootReducer
