import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchRequested
} from "./redux/actions";

import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();
  dispatch({
    type: fetchRequested,
    url: "https://api.punkapi.com/v2/beers"
  });

  return (
      <Home />
  );
};

export default App;
