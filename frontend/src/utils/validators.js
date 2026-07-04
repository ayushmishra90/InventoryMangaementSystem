export const validateProduct = (data) => {

    const errors = {};

    if (!data.name.trim()) {

        errors.name = "Product name is required.";

    }

    if (!data.sku.trim()) {

        errors.sku = "SKU is required.";

    }

    if (Number(data.price) <= 0) {

        errors.price = "Price must be greater than 0.";

    }

    if (

        data.stock_quantity === "" ||

        Number(data.stock_quantity) < 0

    ) {

        errors.stock_quantity =
            "Stock cannot be negative.";

    }

    return errors;

};

export const validateCustomer = (data) => {

    const errors = {};

    if (!data.full_name.trim()) {

        errors.full_name =
            "Customer name is required.";

    }

    if (!data.email.trim()) {

        errors.email = "Email is required.";

    }

    else if (

        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)

    ) {

        errors.email = "Invalid email.";

    }

    if (!/^\d{10}$/.test(data.phone_number)) {

        errors.phone_number =
            "Phone number must be exactly 10 digits.";

    }

    return errors;

};