const DEFAULT_VALUE = -1;

export const formatDate = value => {
  const date = value.split("/");
  return {
    month: parseInt(date[0]),
    year: parseInt(date[1])
  };
};

export const formatYears = yearList => {
  let newArray = yearList
    .filter(
      (element, index, self) =>
        index === self.findIndex(t => t.year === element.year)
    )
    .map(element => {
      return { name: element.year, value: element.year };
    })
    .sort(function(a, b) {
      return a.value - b.value;
    });

  return newArray;
};

export const filterByDate = (startDate, endDate, items) => {
  return items.filter(item => {
    const itemDate = formatDate(item.first_brewed);

    const validYear = itemDate =>
      (itemDate.year > startDate.year || itemDate.year === startDate.year) &&
      (itemDate.year < endDate.year || itemDate.year === endDate.year);

    const validMonth = itemDate =>
      itemDate.month >= startDate.month && itemDate.month <= endDate.month;

    const defaultValues = () =>
      startDate.year === DEFAULT_VALUE &&
      startDate.month === DEFAULT_VALUE &&
      endDate.year === DEFAULT_VALUE &&
      endDate.month === DEFAULT_VALUE;

    return (validYear(itemDate) && validMonth(itemDate)) || defaultValues();
  });
};

export const makePagination = itemsFiltered => {
  return itemsFiltered.reduce((result, value, index) => {
    if (index % 5 !== 0) {
      result[result.length - 1].push(value);
    } else {
      result.push([value]);
    }
    return result;
  }, []);
};
