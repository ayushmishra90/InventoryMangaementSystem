import { useEffect, useState } from "react";

import CartModal from "../../components/CartModal/CartModal";
import OrderProductCard from "../../components/Card/OrderProductCard/OrderProductCard";
import Button from "../../components/Button/Button";

import {
    getOrders,
    createOrder
} from "../../api/orderApi";

import {
    getProducts
} from "../../api/productApi";

import {
    getCustomers
} from "../../api/customerApi";

import {
    showSuccess,
    showError
} from "../../utils/toast";

import {
    FaShoppingCart
} from "react-icons/fa";

import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [products, setProducts] = useState([]);

    const [customers, setCustomers] = useState([]);

    const [cart, setCart] = useState([]);

    const [cartOpen, setCartOpen] = useState(false);

    const [customerId, setCustomerId] = useState(0);

    useEffect(() => {

        fetchOrders();

        fetchProducts();

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

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data.data);

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

    const handleAddToCart = (product) => {

        const existing = cart.find(

            item => item.product_id === product.id

        );

        if (existing) {

            setCart(

                cart.map(item =>

                    item.product_id === product.id

                        ? {

                            ...item,

                            quantity: item.quantity + 1

                        }

                        : item

                )

            );

        }

        else {

            setCart([

                ...cart,

                {

                    product_id: product.id,

                    name: product.name,

                    price: product.price,

                    quantity: 1,

                    stock_quantity: product.stock_quantity

                }

            ]);

        }

    };

    const increaseQuantity = (productId) => {

        setCart(

            cart.map(item => {

                if (item.product_id !== productId) {

                    return item;

                }

                const product = products.find(

                    p => p.id === productId

                );

                if (item.quantity >= product.stock_quantity) {

                    return item;

                }

                return {

                    ...item,

                    quantity: item.quantity + 1

                };

            })

        );

    };

    const decreaseQuantity = (productId) => {

        setCart(

            cart

                .map(item =>

                    item.product_id === productId

                        ? {

                            ...item,

                            quantity: item.quantity - 1

                        }

                        : item

                )

                .filter(

                    item => item.quantity > 0

                )

        );

    };

    const removeItem = (productId) => {

        setCart(

            cart.filter(

                item => item.product_id !== productId

            )

        );

    };

    const handlePlaceOrder = async () => {

        if (customerId === 0) {

            showError(

                "Please select a customer."

            );

            return;

        }

        if (cart.length === 0) {

            showError(

                "Cart is empty."

            );

            return;

        }

        try {

            const payload = {

                customer_id: customerId,

                items: cart.map(item => ({

                    product_id: item.product_id,

                    quantity: item.quantity

                }))

            };

            await createOrder(payload);

            showSuccess(

                "Order placed successfully."

            );

            setCart([]);

            setCustomerId(0);

            setCartOpen(false);

            fetchOrders();

            fetchProducts();

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };

    return (

        <>

            <div className="orders-header">

                <div className="orders-title">

                    <h1>Orders</h1>

                    <p>Create new customer orders.</p>

                </div>

                <div className="orders-toolbar">

                    <select
                        id="customer"
                        className="customer-select"
                        value={customerId}
                        onChange={(e) =>

                            setCustomerId(Number(e.target.value))

                        }
                    >

                        <option value={0}>

                            Select Customer

                        </option>

                        {

                            customers.map(customer => (

                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >

                                    {customer.full_name}

                                </option>

                            ))

                        }

                    </select>

                    <Button
                        className="cart-btn"
                        variant="success"
                        icon={<FaShoppingCart />}
                        onClick={() => setCartOpen(true)}
                    >

                        Cart (

                        {

                            cart.reduce(

                                (sum, item) => sum + item.quantity,

                                0

                            )

                        }

                        )

                    </Button>

                </div>

            </div>

            <div className="order-grid">

                {

                    products.map(product => (

                        <OrderProductCard

                            key={product.id}

                            product={product}

                            cart={cart}

                            onAddToCart={handleAddToCart}

                            onIncrease={increaseQuantity}

                            onDecrease={decreaseQuantity}

                        />

                    ))

                }

            </div>

            <CartModal

                isOpen={cartOpen}

                onClose={() =>

                    setCartOpen(false)

                }

                cart={cart}

                increaseQuantity={increaseQuantity}

                decreaseQuantity={decreaseQuantity}

                removeItem={removeItem}

                placeOrder={handlePlaceOrder}

                customerName={

                    customers.find(

                        c => c.id === customerId

                    )?.full_name

                }

            />

        </>

    );

}

export default Orders;