import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Customers from "../pages/Customers/Customers";
import Orders from "../pages/Orders/Orders";
import OrderHistory
    from "../pages/OrderHistory/OrderHistory";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order-history" element={<OrderHistory />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;