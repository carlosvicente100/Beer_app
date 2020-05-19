import { fetchSetDates, fetchResetDates } from "../actions";

export const initialState = {
  startDate: {
    year: -1,
    month: -1
  },
  endDate: {
    year: -1,
    month: -1
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchSetDates:
      return {
        ...state,
        startDate: action.data.startDate,
        endDate: action.data.endDate
      };
    case fetchResetDates:
      return {
        ...initialState
      };
    default:
      return {
        ...state
      };
  }
}
