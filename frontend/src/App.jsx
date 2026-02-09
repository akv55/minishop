import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </Router>
    </CartProvider>
  )
}

export default App;