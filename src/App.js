import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Travels from "./components/Travels";
import Users from "./components/Users";
import Cities from "./components/Cities";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
         <BrowserRouter>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/travels" element={<Travels />} />
              <Route path="/cities" element={<Cities />} />
            </Routes>
        </BrowserRouter>
    );
  }
  
}

export default App;
