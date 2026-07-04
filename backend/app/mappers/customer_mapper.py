from app.schemas.customer_schema import (
    CustomerResponse
)


class CustomerMapper:

    @staticmethod
    def to_response(customer):

        return CustomerResponse.model_validate(
            customer
        )

    @staticmethod
    def to_response_list(customers):

        return [
            CustomerResponse.model_validate(customer)
            for customer in customers
        ]