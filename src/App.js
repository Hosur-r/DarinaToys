import {Routes, Route} from "react-router-dom";
// компоненты страницы
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Basket from "./components/basket/Basket";
import Profile from "./components/profile/Profile";
import { useState } from "react";




function App() {

  return (
    <div className="App">
        <Header/>
          <Routes>
            <Route path="basket" element={<Basket/>}></Route>
            <Route path="/" element={<Products />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
