import { useEffect, useState } from "react";

import DashboardCard from "../../components/Card/DashboardCard";
import { showError } from "../../utils/toast";
import { getDashboard } from "../../api/dashboardApi";
import {

    FaBox,

    FaUsers,

    FaShoppingCart,

    FaExclamationTriangle

}

    from "react-icons/fa";
import "./Dashboard.css";
function Dashboard() {

    const [dashboard, setDashboard] = useState({
        total_products: 0,
        total_customers: 0,
        total_orders: 0,
        low_stock_products: 0
    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(
                response.data.data
            );

        } catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };
    return (

        <>

            <h1>Dashboard</h1>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Products"
                    subtitle="Total Products"
                    icon={<FaBox />}
                    value={dashboard.total_products}
                />

                <DashboardCard
                    title="Customers"
                    subtitle="Registered Customers"
                    icon={<FaUsers />}
                    value={dashboard.total_customers}
                />

                <DashboardCard
                    title="Orders"
                    subtitle="Orders Placed"
                    icon={<FaShoppingCart />}
                    value={dashboard.total_orders}
                />

                <DashboardCard
                    title="Low Stock"
                    subtitle="Needs Attention"
                    icon={<FaExclamationTriangle />}
                    value={dashboard.low_stock_products}
                />

            </div>

        </>

    );

}

export default Dashboard;