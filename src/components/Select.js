import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SelectList = styled.select`
  margin: auto;
`;

const Select = ({ values, current, onSelect }) => {
  const selectValue = event => {
    onSelect(event.target.value);
  };

  const makeOptionList = values.map((element, index) => (
    <option
      key={index}
      value={element.value}
      defaultValue={element.value === current}
    >
      {element.name}
    </option>
  ));

  return (
    <SelectContainer className="Select">
      <SelectList onChange={selectValue}>
        <option value={-1}>Empty</option>
        {makeOptionList}
      </SelectList>
    </SelectContainer>
  );
};
Select.propTypes = {
  onSelect: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired
};

Select.defaultProps = {};

export default Select;
