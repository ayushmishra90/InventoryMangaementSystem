import { useEffect, useState } from "react";

import OrderCard from "../../components/Card/OrderCard/OrderCard";

import {
    getOrders,
    updateOrderStatus
} from "../../api/orderApi";

import {
    getCustomers
} from "../../api/customerApi";

import {
    showSuccess,
    showError
} from "../../utils/toast";

import "./OrderHistory.css";

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        fetchOrders();

        fetchCustomers();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await getOrders();

            setOrders(response.data.data);

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };

    const fetchCustomers = async () => {

        try {

            const response = await getCustomers();

            setCustomers(response.data.data);

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };

    const handleStatusChange = async (

        orderId,

        status

    ) => {

        try {

            await updateOrderStatus(

                orderId,

                {

                    status

                }

            );

            showSuccess(

                "Order status updated."

            );

            fetchOrders();

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                "Unable to update order."

            );

        }

    };

    return (

        <>

            <div className="page-header">

                <div>

                    <h1>

                        Order History

                    </h1>

                    <p className="page-subtitle">

                        View and manage all customer orders.

                    </p>

                </div>

            </div>

            <div className="orders-grid">

                {

                    orders.map(order => (

                        <OrderCard

                            key={order.id}

                            order={order}

                            customerName={

                                customers.find(

                                    c =>

                                        c.id === order.customer_id

                                )?.full_name

                            }

                            onStatusChange={

                                handleStatusChange

                            }

                        />

                    ))

                }

            </div>

        </>

    );

}

export default OrderHistory;