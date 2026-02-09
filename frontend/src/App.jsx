import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
function App(){
  return(
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<ProductList />} />
            </Routes>
      </Router>
    </CartProvider>
  )
}

export default App;