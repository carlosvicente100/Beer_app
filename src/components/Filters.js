import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import { fetchSetDates, fetchResetDates } from "../redux/actions";

import { formatYears } from "../utils";

const FiltersContainer = styled.div`
  background-color: #227093;
  color: white;
  text-align: center;
`;
const Label = styled.label`
  width: 50%;
  display: inline-grid;
  grid-area: input;
  grid-template-areas:
    "span"
    "select";
  span {
    grid-area: span;
  }
  div.Select {
    width: 100%;
    grid-area: select;
  }
`;
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
`;

const MonthList = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 }
];
const Filters = () => {
  const dispatch = useDispatch();

  const formatDate = text => {
    const brewed = text.split("/");
    return {
      month: parseInt(brewed[0]),
      year: parseInt(brewed[1])
    };
  };

  const { items } = useSelector(state => state.itemsReducer);
  const yearList = formatYears(items.map(a => formatDate(a.first_brewed)));
  const { startDate, endDate } = useSelector(state => state.filtersReducer);
  const [monthInitial, setMonthInitial] = useState(startDate.month);
  const [yearInitial, setYearhInitial] = useState(startDate.year);
  const [monthFinal, setMonthFinal] = useState(endDate.month);
  const [yearFinal, setYearFinal] = useState(endDate.year);
  const resetValues = () => {
    dispatch({
      type: fetchResetDates
    });
  };

  const setFilter = () => {
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
    });
  };

  return (
    <FiltersContainer className="Filters">
      <Label>
        Start Month
        <Select
          values={MonthList}
          current={startDate.month}
          onSelect={setMonthInitial}
        />
      </Label>
      <Label>
        End Month
        <Select
          values={MonthList}
          current={endDate.month}
          onSelect={setMonthFinal}
        />
      </Label>

      <Label>
        Start year
        <Select
          values={yearList}
          current={startDate.year}
          onSelect={setYearhInitial}
        />
      </Label>
      <Label>
        End year
        <Select
          values={yearList}
          current={endDate.year}
          onSelect={setYearFinal}
        />
      </Label>
      <FilterButton onClick={setFilter}> Filter</FilterButton>
      <FilterButton onClick={resetValues}> Reset All</FilterButton>
    </FiltersContainer>
  );
};

Filters.propTypes = {};

Filters.defaultProps = {};

export default Filters;
