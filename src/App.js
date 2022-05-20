import React from "react";
import "./App.css";
import AppComponent from "./app/components";
import Favorites from "./app/components/Favorites";
import NavBar from "./app/components/navbar";

import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route exact path="/" element={<AppComponent />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
