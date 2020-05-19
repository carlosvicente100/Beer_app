import {
    fetchPendingItems,
    fetchSucceededItems,
    fetchFailedItems
  } from "../actions";
  
  export const initialState = {
    pending: false,
    error: null,
    items: []
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case fetchPendingItems:
        return {
          ...state,
          pending: true
        };
      case fetchSucceededItems:
        return {
          ...state,
          pending: false,
          items: action.data
        };
      case fetchFailedItems:
        return {
          ...state,
          pending: false,
          error: true
        };
      default:
        return {
          ...state
        };
    }
  }
  