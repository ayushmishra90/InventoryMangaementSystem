import api from "./axios";

export const getOrders = () =>
    api.get("/orders");

export const createOrder = (data) =>
    api.post("/orders", data);

export const deleteOrder = (id) =>
    api.delete(`/orders/${id}`);

export const updateOrderStatus = (

    id,

    data

) =>

    api.patch(

        `/orders/${id}/status`,

        data

    );