import Header from "./components/header/Header";
import Products from "./components/products/Products";
import {Routes, Route} from "react-router-dom";
import Basket from "./components/basket/Basket";

function App() {

  return (
    <div className="App">
        <Header/>
     

          <Routes>
            <Route path="basket" element={<Basket/>}></Route>
            <Route path="/" element={<Products/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
