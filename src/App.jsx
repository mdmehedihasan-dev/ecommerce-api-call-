import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import ProductDetail from "./pages/ProductDetail"
import ProductList from "./components/ProductList"
import Cart from "./pages/Cart"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import { store } from "./redux/store/store"
import Home from "./pages/Home"

function App() {
  return (
  <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </Provider>
  )
}

export default App
