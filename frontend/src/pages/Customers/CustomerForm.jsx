import Input from "../../components/Input/Input";

function CustomerForm({

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
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
            />

            {

                errors.full_name &&

                <p className="error">

                    {errors.full_name}

                </p>

            }

            <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            {

                errors.email &&

                <p className="error">

                    {errors.email}

                </p>

            }

            <Input
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
            />

            {

                errors.phone_number &&

                <p className="error">

                    {errors.phone_number}

                </p>

            }

        </>

    );

}

export default CustomerForm;