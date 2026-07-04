import Button from "../../Button/Button";

import "./OrderProductCard.css";

function OrderProductCard({

    product,

    cart,

    onAddToCart,

    onIncrease,

    onDecrease

}) {

    const cartItem = cart.find(

        item => item.product_id === product.id

    );

    const quantity = cartItem

        ? cartItem.quantity

        : 0;

    return (

        <div className="card order-product-card">

            <h2 className="card-title">

                {product.name}

            </h2>

            <div className="card-row">

                <span>SKU</span>

                <span>{product.sku}</span>

            </div>

            <div className="card-row">

                <span>Price</span>

                <span>₹ {product.price}</span>

            </div>

            <div className="card-row">

                <span>Stock</span>

                <span>{product.stock_quantity}</span>

            </div>

            {

                product.stock_quantity === 0 ?

                (

                    <Button

                        variant="danger"

                        disabled

                    >

                        Out Of Stock

                    </Button>

                )

                :

                quantity === 0 ?

                (

                    <Button

                        variant="primary"

                        onClick={() =>

                            onAddToCart(product)

                        }

                    >

                        Add To Cart

                    </Button>

                )

                :

                (

                    <div className="qty-controls">

                        <Button

                            variant="danger"

                            onClick={() =>

                                onDecrease(product.id)

                            }

                        >

                            -

                        </Button>

                        <span>

                            {quantity}

                        </span>

                        <Button

                            variant="success"

                            onClick={() =>

                                onIncrease(product.id)

                            }

                        >

                            +

                        </Button>

                    </div>

                )

            }

        </div>

    );

}

export default OrderProductCard;