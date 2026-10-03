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

import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";


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

            <Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/return-policy"
  element={<ReturnPolicy />}
/>

<Route
  path="/refund-policy"
  element={<RefundPolicy />}
/>

<Route
  path="/shipping-policy"
  element={<ShippingPolicy />}
/>

<Route
  path="/cancellation-policy"
  element={<CancellationPolicy />}
/>

          </Routes>

        </div>


        <Footer />


        <LoginModal />

      </div>

    </BrowserRouter>
  );
}