import {
    FaEdit,
    FaTrash,
    FaBox
} from "react-icons/fa";

import Button from "../../Button/Button";

import "./ProductCard.css";

function ProductCard({

    product,

    onEdit,

    onDelete

}) {

    return (

        <div className="card product-card">

            <div className="product-header">

                <FaBox className="product-icon" />

                <h2 className="card-title">

                    {product.name}

                </h2>

            </div>

            <div className="card-row">

                <span>

                    SKU

                </span>

                <span>

                    {product.sku}

                </span>

            </div>

            <div className="card-row">

                <span>

                    Price

                </span>

                <span>

                    ₹ {product.price}

                </span>

            </div>

            <div className="card-row">

                <span>

                    Stock

                </span>

                <span>

                    {product.stock_quantity}

                </span>

            </div>

            <div className="card-actions">

                <Button

                    variant="primary"

                    icon={<FaEdit />}

                    onClick={() => onEdit(product)}

                >

                    Edit

                </Button>

                <Button

                    variant="danger"

                    icon={<FaTrash />}

                    onClick={() => onDelete(product.id)}

                >

                    Delete

                </Button>

            </div>

        </div>

    );

}

export default ProductCard;