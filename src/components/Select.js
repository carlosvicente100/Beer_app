import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { DEFAULT_VALUE } from '../utils'

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const SelectList = styled.select`
  margin: auto;
`

const Select = ({ values, current, onSelect }) => {
  const selectValue = (event) => {
    const value = parseInt(event.target.value)
    if (value !== current) {
      onSelect(parseInt(value))
    }
  }

  const makeOptionList = values.map((element, index) => (
    <option key={index} value={element.value} defaultValue={element.value === current}>
      {element.name}
    </option>
  ))

  return (
    <SelectContainer className="Select">
      <SelectList data-testid="select" value={current} onChange={selectValue}>
        <option value={DEFAULT_VALUE}>Empty</option>
        {makeOptionList}
      </SelectList>
    </SelectContainer>
  )
}
Select.propTypes = {
  onSelect: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired
}

Select.defaultProps = {}

export default Select
