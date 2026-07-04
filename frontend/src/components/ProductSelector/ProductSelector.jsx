import "./ProductSelector.css";

function ProductSelector({
    products,
    selectedProducts,
    setSelectedProducts
}) {

    const changeQuantity = (
        product,
        quantity
    ) => {

        let updated = [...selectedProducts];

        const index = updated.findIndex(
            item => item.product_id === product.id
        );

        if (quantity <= 0) {

            if (index !== -1) {

                updated.splice(index, 1);

            }

        }

        else {

            if (index !== -1) {

                updated[index].quantity = quantity;

            }

            else {

                updated.push({

                    product_id: product.id,

                    quantity: quantity

                });

            }

        }

        setSelectedProducts(updated);

    };

    const getQuantity = (id) => {

        const item = selectedProducts.find(
            p => p.product_id === id
        );

        return item ? item.quantity : 0;

    };

    return (

        <div className="selector-container">

            {

                products.map(product => (

                    <div
                        className="selector-card"
                        key={product.id}
                    >

                        <h3>
                            {product.name}
                        </h3>

                        <p>

                            SKU : {product.sku}

                        </p>

                        <p>

                            ₹ {product.price}

                        </p>

                        <p>

                            Stock : {product.stock_quantity}

                        </p>

                        <div
                            className="qty-box"
                        >

                            <button
                                onClick={() =>
                                    changeQuantity(
                                        product,
                                        getQuantity(product.id) - 1
                                    )
                                }
                            >

                                -

                            </button>

                            <span>

                                {getQuantity(product.id)}

                            </span>

                            <button
                                onClick={() =>
                                    changeQuantity(
                                        product,
                                        getQuantity(product.id) + 1
                                    )
                                }
                            >

                                +

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ProductSelector;