import { useState, useEffect } from "react";

import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import ProductForm from "./ProductForm";
import "./Products.css";
import {

    showSuccess,

    showError

}
    from "../../utils/toast";
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../../api/productApi";

import { validateProduct } from "../../utils/validators";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/Button/Button";
function Products() {

    const [open, setOpen] = useState(false);

    const [products, setProducts] = useState([]);

    const [isEdit, setIsEdit] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({

        name: "",

        sku: "",

        price: "",

        stock_quantity: ""

    });

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(

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

            name: "",

            sku: "",

            price: "",

            stock_quantity: ""

        });

        setErrors({});

        setIsEdit(false);

        setSelectedProductId(null);

    };

    const handleSave = async () => {

        const validationErrors = validateProduct(formData);

        if (

            Object.keys(validationErrors).length > 0

        ) {

            setErrors(validationErrors);

            return;

        }

        setErrors({});

        const payload = {

            name: formData.name,

            sku: formData.sku,

            price: Number(formData.price),

            stock_quantity: Number(

                formData.stock_quantity

            )

        };

        try {

            if (isEdit) {

                await updateProduct(

                    selectedProductId,

                    payload

                );
                showSuccess(

                    "Product updated successfully."

                );

            }

            else {

                await createProduct(

                    payload

                );
                showSuccess(

                    "Product added successfully."

                );

            }

            await fetchProducts();

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

    const handleEdit = (product) => {

        setIsEdit(true);

        setSelectedProductId(

            product.id

        );

        setErrors({});

        setFormData({

            name: product.name,

            sku: product.sku,

            price: product.price,

            stock_quantity: product.stock_quantity

        });

        setOpen(true);

    };

    const handleDeleteClick = (id) => {

        setSelectedProductId(id);

        setDeleteOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteProduct(

                selectedProductId

            );
            showSuccess(

                "Product deleted successfully."

            );

            await fetchProducts();

            setDeleteOpen(false);

            setSelectedProductId(null);

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

            <div className="page-header">

                <div>

                    <h1>

                        Products

                    </h1>

                    <p className="page-subtitle">

                        Manage your inventory.

                    </p>

                </div>

                <Button

                    className="add-product-btn"

                    variant="primary"

                    icon={<FaPlus />}

                    onClick={() => {

                        resetForm();

                        setOpen(true);

                    }}

                >

                    Add Product

                </Button>

            </div>

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns:

                        "repeat(auto-fill,minmax(240px,1fr))",

                    gap: "20px"

                }}

            >

                {

                    products.map(product => (

                        <ProductCard

                            key={product.id}

                            product={product}

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

                        "Edit Product"

                        :

                        "Add Product"

                }

                onClose={() => {

                    resetForm();

                    setOpen(false);

                }}

                onSubmit={handleSave}

            >

                <ProductForm

                    formData={formData}

                    setFormData={setFormData}

                    errors={errors}

                />

            </Modal>

            <ConfirmDialog

                isOpen={deleteOpen}

                title="Delete Product"

                message="Are you sure you want to delete this product?"

                onConfirm={confirmDelete}

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedProductId(null);

                }}

            />

        </>

    );

}

export default Products;