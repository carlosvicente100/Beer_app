import reducer from "../items";
import { fetchSuccessItems, fetchErrorItems } from "./../../actions";

import itemList from "../../../fixtures/itemList";

describe("items reducer", () => {
  const initialState = {
    error: null,
    items: [],
  };
  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  test("should set items properly ( fetchSuccessItems )", async () => {
    const dummyAction = {
      type: fetchSuccessItems,
      data: itemList,
    };
    expect(reducer(undefined, dummyAction)).toEqual({
      error: null,
      items: itemList,
    });
  });

  test("should set error ( fetchErrorItems )", async () => {
    const dummyAction = {
      type: fetchErrorItems,
    };
    expect(reducer(undefined, dummyAction)).toEqual({
      error: true,
      items: [],
    });
  });
});
