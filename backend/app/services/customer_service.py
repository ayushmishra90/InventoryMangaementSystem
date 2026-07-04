from app.repositories.customer_repository import CustomerRepository
from app.services.base_service import BaseService

from app.core.customer_exceptions import (
    CustomerNotFoundException,
    DuplicateEmailException,
)


class CustomerService:

    @staticmethod
    def validate_unique_email(
        db,
        email,
        current_customer_id=None,
    ):

        existing = CustomerRepository.get_by_email(
            db,
            email,
        )

        BaseService.validate_unique(
            existing,
            DuplicateEmailException,
            current_customer_id,
        )

    @staticmethod
    def get_customer_or_raise(
        db,
        customer_id,
    ):
        return BaseService.raise_if_none(
            CustomerRepository.get_by_id(
                db,
                customer_id,
            ),
            CustomerNotFoundException,
        )

    @staticmethod
    def create_customer(
        db,
        customer_data,
    ):

        CustomerService.validate_unique_email(
            db,
            customer_data.email,
        )

        return CustomerRepository.create(
            db,
            customer_data.model_dump(),
        )

    @staticmethod
    def get_all_customers(
        db,
    ):
        return CustomerRepository.get_all(db)

    @staticmethod
    def get_customer(
        db,
        customer_id,
    ):
        return CustomerService.get_customer_or_raise(
            db,
            customer_id,
        )

    @staticmethod
    def update_customer(
        db,
        customer_id,
        update_data,
    ):

        customer = CustomerService.get_customer_or_raise(
            db,
            customer_id,
        )

        data = update_data.model_dump(
            exclude_unset=True,
        )

        if "email" in data:
            CustomerService.validate_unique_email(
                db,
                data["email"],
                customer.id,
            )

        for key, value in data.items():
            setattr(customer, key, value)

        return CustomerRepository.update(
            db,
            customer,
        )

    @staticmethod
    def delete_customer(
        db,
        customer_id,
    ):

        customer = CustomerService.get_customer_or_raise(
            db,
            customer_id,
        )

        CustomerRepository.delete(
            db,
            customer,
        )