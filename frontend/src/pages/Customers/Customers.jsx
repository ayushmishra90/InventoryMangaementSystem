import { useState, useEffect } from "react";

import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import CustomerCard from "../../components/Card/CustomerCard/CustomerCard";
import CustomerForm from "./CustomerForm";
import {

    showSuccess,

    showError

}
    from "../../utils/toast";

import { FaPlus } from "react-icons/fa";
import Button from "../../components/Button/Button";
import {

    createCustomer,

    getCustomers,

    updateCustomer,

    deleteCustomer

} from "../../api/customerApi";

import {

    validateCustomer

} from "../../utils/validators";

function Customers() {

    const [open, setOpen] = useState(false);

    const [customers, setCustomers] = useState([]);

    const [isEdit, setIsEdit] = useState(false);

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({

        full_name: "",

        email: "",

        phone_number: ""

    });

    useEffect(() => {

        fetchCustomers();

    }, []);

    const fetchCustomers = async () => {

        try {

            const response = await getCustomers();

            setCustomers(

                response.data.data

            );

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };

    const resetForm = () => {

        setFormData({

            full_name: "",

            email: "",

            phone_number: ""

        });

        setErrors({});

        setIsEdit(false);

        setSelectedCustomerId(null);

    };

    const handleSave = async () => {

        const validationErrors = validateCustomer(

            formData

        );

        if (

            Object.keys(validationErrors).length > 0

        ) {

            setErrors(validationErrors);

            return;

        }

        setErrors({});

        const payload = {

            full_name: formData.full_name,

            email: formData.email,

            phone_number: formData.phone_number

        };

        try {

            if (isEdit) {

                await updateCustomer(

                    selectedCustomerId,

                    payload

                );
                showSuccess(

                    "Customer updated successfully."

                );

            }

            else {

                await createCustomer(

                    payload

                );
                showSuccess(

                    "Customer added successfully."

                );

            }

            await fetchCustomers();

            resetForm();

            setOpen(false);

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                error.response?.data?.detail ||

                "Something went wrong."

            );

        }

    };

    const handleEdit = (customer) => {

        setErrors({});

        setIsEdit(true);

        setSelectedCustomerId(

            customer.id

        );

        setFormData({

            full_name: customer.full_name,

            email: customer.email,

            phone_number: customer.phone_number

        });

        setOpen(true);

    };

    const handleDeleteClick = (id) => {

        setSelectedCustomerId(id);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteCustomer(

                selectedCustomerId

            );
            showSuccess(

                "Customer deleted successfully."

            );

            await fetchCustomers();

            setDeleteOpen(false);

            setSelectedCustomerId(null);

        }

        catch (error) {

            showError(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    return (

        <>

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    marginBottom: "20px"

                }}

            >

                <h1>

                    Customers

                </h1>

                <Button

                    className="add-product-btn"


                    variant="primary"

                    icon={<FaPlus />}

                    onClick={() => {

                        resetForm();

                        setOpen(true);

                    }}

                >

                    Add Customer

                </Button>

            </div>

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",

                    gap: "20px"

                }}

            >

                {

                    customers.map(customer => (

                        <CustomerCard

                            key={customer.id}

                            customer={customer}

                            onEdit={handleEdit}

                            onDelete={handleDeleteClick}

                        />

                    ))

                }

            </div>

            <Modal

                isOpen={open}

                title={

                    isEdit

                        ?

                        "Edit Customer"

                        :

                        "Add Customer"

                }

                onClose={() => {

                    resetForm();

                    setOpen(false);

                }}

                onSubmit={handleSave}

            >

                <CustomerForm

                    formData={formData}

                    setFormData={setFormData}

                    errors={errors}

                />

            </Modal>

            <ConfirmDialog

                isOpen={deleteOpen}

                title="Delete Customer"

                message="Are you sure you want to delete this customer?"

                onConfirm={confirmDelete}

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedCustomerId(null);

                }}

            />

        </>

    );

}

export default Customers;