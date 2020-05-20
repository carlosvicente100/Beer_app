export const DEFAULT_VALUE = -1

export const formatDate = (value) => {
  const date = value.split('/')
  return {
    month: parseInt(date[0]),
    year: parseInt(date[1])
  }
}

export const formatOrderYears = (yearList) => {
  let newArray = yearList
    .filter((element, index, self) => index === self.findIndex((t) => t.year === element.year))
    .map((element) => {
      return { name: element.year, value: element.year }
    })
    .sort(function (a, b) {
      return a.value - b.value
    })

  return newArray
}

export const filterByDate = (startDate, endDate, items) => {
  return items.filter((item) => {
    const itemDate = formatDate(item.first_brewed)

    const validYear = (itemDate) =>
      (itemDate.year > startDate.year || (itemDate.year === startDate.year && itemDate.month >= startDate.month)) &&
      (itemDate.year < endDate.year || (itemDate.year === endDate.year && itemDate.month <= endDate.month))

    const defaultValues = () =>
      startDate.year === DEFAULT_VALUE &&
      startDate.month === DEFAULT_VALUE &&
      endDate.year === DEFAULT_VALUE &&
      endDate.month === DEFAULT_VALUE
    return validYear(itemDate) || defaultValues()
  })
}

export const makePagination = (itemsFiltered) => {
  return itemsFiltered.reduce((result, value, index) => {
    if (index % 5 !== 0) {
      result[result.length - 1].push(value)
    } else {
      result.push([value])
    }
    return result
  }, [])
}

export const MonthList = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 }
]
