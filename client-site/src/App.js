import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Auth from "./pages/auth/Auth";
import Reg from "./pages/reg/Reg";
import Slide from "./components/Slider/Slider";
import Gear from "./pages/gear/Gear";
import Account from "./pages/account/Account";
import Account_update from "./pages/account_update/Account_update";
import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import Admin_page from "./pages/admin_page/Admin_page";
import Admin_auth from "./pages/admin_auth/Admin_auth";
import Order_list from "./pages/order_list/Order_list";
import Product_list from "./pages/product_list/Product_list";
import Cart_list from "./pages/cart_list/Cart_list";
import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Navigate } from "react-router-dom";
import User_list from "./pages/user_list/User_list";
import NewUser from "./pages/newUser/newUser";
import UpdateUser from "./pages/updateUser/updateUser";
import Product_view from "./pages/product_view/Product_view";
import New_Product from "./pages/newProduct/NewProduct";
import Edit_Product from "./pages/editProduct/EditProduct";
import Cart_view from "./pages/cart_view/Cart_view";
import Order_view from "./pages/order_view/Order_view";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user || user.isAdmin === false) {
      return <Navigate to="/admin_auth"/>;
    }
    return children;
  };
  const RegRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user) {
      return <Navigate to="/"/>;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reg" element={<RegRoute><Reg/></RegRoute>} />
        <Route path="/product/:id" element={<Gear />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account_update" element={<Account_update />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/slide" element={<Slide/>}/>

        <Route path="/admin_auth" element={<Admin_auth />} />
        <Route path="/admin" element={<ProtectedRoute><Admin_page /></ProtectedRoute>}/>
        <Route path="/user_list" element={<ProtectedRoute><User_list/></ProtectedRoute>} />
        <Route path="/new_user" element={<ProtectedRoute><NewUser/></ProtectedRoute>} />
        <Route path="/update_user" element={<ProtectedRoute><UpdateUser/></ProtectedRoute>} />

        <Route path="/product_list" element={<ProtectedRoute><Product_list/></ProtectedRoute>} />
        <Route path="/product_view/:id" element={<ProtectedRoute><Product_view/></ProtectedRoute>} />
        <Route path="/new_product" element={<ProtectedRoute><New_Product/></ProtectedRoute>} />
        <Route path="/edit_product/:id" element={<ProtectedRoute><Edit_Product/></ProtectedRoute>} />

        <Route path="/cart_list" element={<ProtectedRoute><Cart_list/></ProtectedRoute>} />
        <Route path="/cart_view/:id" element={<ProtectedRoute><Cart_view/></ProtectedRoute>} />

        <Route path="/order_list" element={<ProtectedRoute><Order_list/></ProtectedRoute>} />
        <Route path="/order_view/:id" element={<ProtectedRoute><Order_view/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
