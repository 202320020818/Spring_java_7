import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import AddItem from "./Components/AddItem/AddItem";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
