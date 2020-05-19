import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//import dummyList from "../fixtures/beerList";

import Card from "./Card";

const ItemListContainer = styled.div`
  // background-color: #9b59b6;
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
  column-gap: 20px;
  row-gap: 20px;
  margin-inline-start: 20px;
  margin-inline-end: 20px;
`;

const ItemList = ({ items }) => {
  return (
    <ItemListContainer className="ItemList">
      {items.length > 0 ? (
        items.map(item => <Card key={item.id} {...item} />)
      ) : (
        <div>no beers for you :(</div>
      )}
    </ItemListContainer>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired
};
ItemList.defaultProps = {};

export default ItemList;
