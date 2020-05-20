import { fetchSuccessItems, fetchErrorItems } from '../actions'

export const initialState = {
  error: null,
  items: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchSuccessItems:
      return {
        ...state,
        items: action.data
      }
    case fetchErrorItems:
      return {
        ...state,
        error: true
      }
    default:
      return {
        ...state
      }
  }
}
