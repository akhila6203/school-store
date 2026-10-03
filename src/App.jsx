import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import KitDetails from "./pages/KitDetails";
import ProductDetails from "./pages/ProductDetails";
import ClassProducts from "./pages/ClassProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";


export default function App() {

  return (
    <BrowserRouter>

      <div
        className="
          flex
          min-h-screen
          flex-col
        "
      >

        <Header />


        <div className="flex-1">

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* KIT */}

            <Route
              path="/kit"
              element={
                <ProtectedRoute>
                  <KitDetails />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                CLASS PRODUCTS

                NEW PAGE

                Home class card
                -> /class-products
                -> logged-in student's class products only
            ================================================== */}

            <Route
              path="/class-products"
              element={
                <ProtectedRoute>
                  <ClassProducts />
                </ProtectedRoute>
              }
            />


            {/* PRODUCT DETAILS */}

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />


            {/* CART */}

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />


            {/* CHECKOUT */}

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />


            {/* SUCCESS */}

            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />


            {/* PROFILE */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

          </Routes>

        </div>


        <Footer />


        <LoginModal />

      </div>

    </BrowserRouter>
  );
}