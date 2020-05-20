import {
  formatDate,
  formatOrderYears,
  filterByDate,
  makePagination,
} from "../utils";

import itemList from "../fixtures/itemList";

describe("Utils Functions Test", () => {
  test("formatDate", () => {
    expect(formatDate("5/2020")).toEqual({
      month: 5,
      year: 2020,
    });
  });

  test("formatOrderYears", () => {
    expect(
      formatOrderYears([
        { month: 9, year: 2013 },
        { month: 4, year: 2008 },
        { month: 11, year: 2015 },
      ])
    ).toEqual([
      { name: 2008, value: 2008 },
      { name: 2013, value: 2013 },
      { name: 2015, value: 2015 },
    ]);
  });
  describe("filterByDate Suite Test", () => {
    test("filterByDate - returning one element", () => {
      expect(
        filterByDate(
          { month: 6, year: 2007 },
          { month: 9, year: 2007 },
          itemList
        )
      ).toEqual([itemList[0]]);
    });

    test("filterByDate - returning multiple elements", () => {
      expect(
        filterByDate(
          { month: 6, year: 2007 },
          { month: 12, year: 2012 },
          itemList
        )
      ).toEqual([itemList[0], itemList[1]]);
    });

    test("filterByDate - returning zero elements", () => {
      expect(
        filterByDate(
          { month: 1, year: 2007 },
          { month: 2, year: 2007 },
          itemList
        )
      ).toEqual([]);
    });
  });
  describe("makePagination Suite Test", () => {
    test("makePagination - One Page", () => {
      expect(makePagination(itemList)).toEqual([itemList]);
    });
    test("makePagination - Multiple Pages ", () => {
      const LargeItemList = [...itemList, ...itemList];
      expect(makePagination(LargeItemList)).toEqual([
        [...itemList, itemList[0], itemList[1]],
        [itemList[2]],
      ]);
    });
  });
});
