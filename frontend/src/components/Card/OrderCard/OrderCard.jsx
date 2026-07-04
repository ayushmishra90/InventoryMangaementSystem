import "./OrderCard.css";

function OrderCard({

    order,

    customerName,

    onStatusChange

}) {

    return (

        <div className="card order-card">

            <div className="order-header">

                <h2 className="card-title">

                    Order #{order.id}

                </h2>

                <select

                    className={`status-select ${order.status.toLowerCase()}`}

                    value={order.status}

                    onChange={(e) =>

                        onStatusChange(

                            order.id,

                            e.target.value

                        )

                    }

                >

                    <option value="PLACED">

                        PLACED

                    </option>

                    <option value="COMPLETED">

                        COMPLETED

                    </option>

                    <option value="CANCELLED">

                        CANCELLED

                    </option>

                </select>

            </div>

            <div className="card-row">

                <span>

                    Customer

                </span>

                <span>

                    {customerName}

                </span>

            </div>

            <div className="card-row">

                <span>

                    Total

                </span>

                <strong>

                    ₹ {order.total_amount}

                </strong>

            </div>

            <hr />

            <h3>

                Products

            </h3>

            {

                order.items.map(item => (

                    <div

                        key={item.product.id}

                        className="order-item"

                    >

                        <div>

                            <strong>

                                {item.product.name}

                            </strong>

                            <p>

                                Qty : {item.quantity}

                            </p>

                        </div>

                        <strong>

                            ₹ {item.subtotal}

                        </strong>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderCard;