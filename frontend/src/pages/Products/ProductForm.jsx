import Input from "../../components/Input/Input";

function ProductForm({

    formData,

    setFormData,

    errors

}) {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    return (

        <>

            <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            {

                errors.name &&

                <p className="error">

                    {errors.name}

                </p>

            }

            <Input
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
            />

            {

                errors.sku &&

                <p className="error">

                    {errors.sku}

                </p>

            }

            <Input
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />

            {

                errors.price &&

                <p className="error">

                    {errors.price}

                </p>

            }

            <Input
                label="Stock Quantity"
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
            />

            {

                errors.stock_quantity &&

                <p className="error">

                    {errors.stock_quantity}

                </p>

            }

        </>

    );

}

export default ProductForm;