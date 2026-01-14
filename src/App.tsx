import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path="products" element={<ProductList/>}/>
                  <Route path="products/:id" element={<ProductDetail/>}/>
                  <Route path="cart" element={<Cart/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App
