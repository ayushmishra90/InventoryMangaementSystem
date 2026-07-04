import "./CartItem.css";

function CartItem({

    item,

    increaseQuantity,

    decreaseQuantity,

    removeItem

}) {

    return (

        <div className="cart-item">

            <div>

                <h3>

                    {item.name}

                </h3>

                <p>

                    ₹ {item.price}

                </p>

            </div>

            <div className="cart-controls">

                <button

                    onClick={() =>

                        decreaseQuantity(

                            item.product_id

                        )

                    }

                >

                    -

                </button>

                <span>

                    {item.quantity}

                </span>

                <button

                    onClick={() =>

                        increaseQuantity(

                            item.product_id

                        )

                    }

                >

                    +

                </button>

            </div>

            <div>

                ₹ {item.price * item.quantity}

            </div>

            <button

                className="remove-button"

                onClick={() =>

                    removeItem(

                        item.product_id

                    )

                }

            >

                Remove

            </button>

        </div>

    );

}

export default CartItem;