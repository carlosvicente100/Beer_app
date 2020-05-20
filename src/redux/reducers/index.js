import { combineReducers } from 'redux'

import itemsReducer from './items'
import filtersReducer from './filters'

export default combineReducers({
  itemsReducer,
  filtersReducer
})
