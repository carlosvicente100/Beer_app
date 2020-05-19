import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { filterByDate, makePagination } from "../utils";

import Filters from "./Filters";
import ItemList from "./ItemList";
import Pagination from "./Pagination";

const HomeContainer = styled.div`
  font-family: verdana;
  height: -webkit-fill-available;
  background-color: #2c2c54;
  display: grid;
  grid-template-columns: auto 500px auto;
  row-gap: 20px;
  grid-template-areas:
    ". Filters ."
    "ItemList ItemList ItemList"
    "NoResults NoResults NoResults"
    ". Pagination .";

  div.Filters {
    grid-area: Filters;
  }
  div.ItemList {
    grid-area: ItemList;
  }
  div.NoResults {
    background:#2980b9;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    width 100%;
    height:300px;
    grid-area: NoResults;
  }
  div.Pagination {
    grid-area: Pagination;
  }
`;
const Home = () => {
   const [currentPage, setCurrentPage] = useState(0);
   const { items } = useSelector(state => state.itemsReducer);
   const { startDate, endDate } = useSelector(state => state.filtersReducer);
   let itemsFiltered = [];
   if (items.length > 0) {
     itemsFiltered = filterByDate(startDate, endDate, items);
   }
   const paginatedItems = makePagination(itemsFiltered);

  return (
    <HomeContainer className="homecontainer">
      <Filters></Filters>
      {paginatedItems.length > 0 ? (
        <>
           <ItemList items={paginatedItems[currentPage]}></ItemList>
          <Pagination
            setCurrentPage={setCurrentPage}
            totalPagination={paginatedItems} //paginatedItems.length
            current={currentPage}
          ></Pagination>
        </>
       ) : ( 
        <div className="NoResults">
          <p>no beer for you :( </p>
        </div>
       )} 
    </HomeContainer>
  );
};

export default Home;
