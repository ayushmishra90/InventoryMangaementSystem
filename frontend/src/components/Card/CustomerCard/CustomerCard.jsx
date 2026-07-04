import {

    FaEdit,

    FaTrash,

    FaUser

} from "react-icons/fa";

import Button from "../../Button/Button";

import "./CustomerCard.css";

function CustomerCard({

    customer,

    onEdit,

    onDelete

}) {

    return (

        <div className="card customer-card">

            <div className="customer-header">

                <FaUser

                    className="customer-icon"

                />

                <h2 className="card-title">

                    {customer.full_name}

                </h2>

            </div>

            <div className="card-row">

                <span>

                    Email

                </span>

                <span>

                    {customer.email}

                </span>

            </div>

            <div className="card-row">

                <span>

                    Phone

                </span>

                <span>

                    {customer.phone_number}

                </span>

            </div>

            <div className="card-actions">

                <Button
                    variant="primary"
                    icon={<FaEdit />}
                    onClick={() => onEdit(customer)}
                >
                    Edit
                </Button>

                <Button
                    variant="danger"
                    icon={<FaTrash />}
                    onClick={() => onDelete(customer.id)}
                >
                    Delete
                </Button>

            </div>

        </div>

    );

}

export default CustomerCard;