import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchRequested,
  fetchPendingItems,
  fetchSucceededItems,
  fetchFailedItems
} from "./redux/actions";

import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();
  dispatch({
    type: fetchRequested,
    url: "https://api.punkapi.com/v2/beers",
    fetchSucceeded: fetchSucceededItems,
    fetchPending: fetchPendingItems,
    fetchFailed: fetchFailedItems
  });

  return (
      <Home />
  );
};

export default App;
