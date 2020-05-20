import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Select from './Select'
import { fetchSetDates, fetchResetDates } from '../redux/actions'

import { formatOrderYears, formatDate, DEFAULT_VALUE, MonthList } from '../utils'

const FiltersContainer = styled.div`
  background-color: #227093;
  color: white;
  text-align: center;
`
const Label = styled.label`
  width: 50%;
  display: inline-grid;
  grid-area: input;
  grid-template-areas:
    'span'
    'select';
  span {
    grid-area: span;
  }
  div.Select {
    width: 100%;
    grid-area: select;
  }
`
const FilterButton = styled.button`
  background-color: #2980b9;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
  &:disabled {
    background-color: #7f8c8d;
  }
`

const Filters = ({ updateFilters }) => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.itemsReducer)
  const yearList = formatOrderYears(items.map((a) => formatDate(a.first_brewed)))
  const { startDate, endDate } = useSelector((state) => state.filtersReducer)
  const [monthInitial, setMonthInitial] = useState(startDate.month)
  const [yearInitial, setYearhInitial] = useState(startDate.year)
  const [monthFinal, setMonthFinal] = useState(endDate.month)
  const [yearFinal, setYearFinal] = useState(endDate.year)

  const FiltersSetted = () =>
    monthInitial !== DEFAULT_VALUE &&
    yearInitial !== DEFAULT_VALUE &&
    monthFinal !== DEFAULT_VALUE &&
    yearFinal !== DEFAULT_VALUE

  const resetValues = () => {
    updateFilters()
    setMonthInitial(DEFAULT_VALUE)
    setYearhInitial(DEFAULT_VALUE)
    setMonthFinal(DEFAULT_VALUE)
    setYearFinal(DEFAULT_VALUE)
    dispatch({
      type: fetchResetDates
    })
  }
  const setFilter = () => {
    updateFilters()
    dispatch({
      type: fetchSetDates,
      data: {
        startDate: {
          year: parseInt(yearInitial),
          month: parseInt(monthInitial)
        },
        endDate: {
          year: parseInt(yearFinal),
          month: parseInt(monthFinal)
        }
      }
    })
  }
  return (
    <FiltersContainer className="Filters">
      <Label>
        Start Month
        <Select values={MonthList} current={monthInitial} onSelect={setMonthInitial} />
      </Label>
      <Label>
        End Month
        <Select values={MonthList} current={monthFinal} onSelect={setMonthFinal} />
      </Label>

      <Label>
        Start year
        <Select values={yearList} current={yearInitial} onSelect={setYearhInitial} />
      </Label>
      <Label>
        End year
        <Select values={yearList} current={yearFinal} onSelect={setYearFinal} />
      </Label>
      <FilterButton disabled={!FiltersSetted()} onClick={setFilter}>
        Filter
      </FilterButton>
      <FilterButton disabled={!FiltersSetted()} onClick={resetValues}>
        Reset All
      </FilterButton>
    </FiltersContainer>
  )
}

Filters.propTypes = {
  updateFilters: PropTypes.func.isRequired
}

Filters.defaultProps = {}

export default Filters
