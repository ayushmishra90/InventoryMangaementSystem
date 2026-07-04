import Modal from "../Modal/Modal";

import CartItem from "../CartItem/CartItem";

function CartModal({

    isOpen,

    onClose,

    cart,

    setCart,

    placeOrder,

    customerName

}) {

    const increaseQuantity = (id) => {

        setCart(

            cart.map(item =>

                item.product_id === id

                ?

                {

                    ...item,

                    quantity:

                        item.quantity + 1

                }

                :

                item

            )

        );

    };

    const decreaseQuantity = (id) => {

        setCart(

            cart

                .map(item =>

                    item.product_id === id

                    ?

                    {

                        ...item,

                        quantity:

                            item.quantity - 1

                    }

                    :

                    item

                )

                .filter(

                    item =>

                        item.quantity > 0

                )

        );

    };

    const removeItem = (id) => {

        setCart(

            cart.filter(

                item =>

                    item.product_id !== id

            )

        );

    };

    const total = cart.reduce(

        (sum, item) =>

            sum +

            item.price *

            item.quantity,

        0

    );

    return (

        <Modal

            isOpen={isOpen}

            title="Shopping Cart"

            onClose={onClose}

            onSubmit={placeOrder}

            submitText="Place Order"

        >

            <h3>

                Customer

            </h3>

            <p>

                {customerName || "Select Customer"}

            </p>

            {

                cart.length === 0 ?

                (

                    <h3>

                        Cart is Empty

                    </h3>

                )

                :

                (

                    cart.map(item => (

                        <CartItem

                            key={item.product_id}

                            item={item}

                            increaseQuantity={

                                increaseQuantity

                            }

                            decreaseQuantity={

                                decreaseQuantity

                            }

                            removeItem={

                                removeItem

                            }

                        />

                    ))

                )

            }

            <hr/>

            <h2>

                Total : ₹ {total}

            </h2>

        </Modal>

    );

}

export default CartModal;