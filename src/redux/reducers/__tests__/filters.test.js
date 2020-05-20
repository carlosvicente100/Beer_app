import reducer from "../filters";
import { fetchSetDates, fetchResetDates } from "./../../actions";

import itemList from "../../../fixtures/itemList";

describe("filters  reducer", () => {
  const initialState = {
    startDate: {
      year: -1,
      month: -1,
    },
    endDate: {
      year: -1,
      month: -1,
    },
  };

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  test("should set dates properly ( fetchSetDates )", async () => {
    const dummyAction = {
      type: fetchSetDates,
      data: {
        startDate: {
          year: 2000,
          month: 12,
        },
        endDate: {
          year: 2002,
          month: 3,
        },
      },
    };
    expect(reducer(undefined, dummyAction)).toEqual({
      startDate: dummyAction.data.startDate,
      endDate: dummyAction.data.endDate,
    });
  });

  test("should reset Filters ( fetchResetDates )", async () => {
    const dummyAction = {
      type: fetchResetDates,
    };
    expect(reducer(undefined, dummyAction)).toEqual({
      startDate: initialState.startDate,
      endDate: initialState.endDate,
    });
  });
});
