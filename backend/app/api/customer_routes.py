from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.services.customer_service import (
    CustomerService
)

from app.schemas.customer_schema import (
    CustomerCreate,
    CustomerUpdate
)

from app.core.response_builder import (
    success_response
)

from app.core.response_codes import (
    ResponseCode
)

from app.mappers.customer_mapper import (
    CustomerMapper
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)

@router.post("")
def create_customer(
    Customer: CustomerCreate,
    db: Session = Depends(get_db)
):

    Customer = CustomerMapper.to_response(
        CustomerService.create_customer(
            db,
            Customer
        )
    )

    return success_response(
        ResponseCode.CUSTOMER_CREATED,
        "Customer created successfully",
        Customer
    )


@router.get("")
def get_customers(
    db: Session = Depends(get_db)
):
    Customers = CustomerService.get_all_customers(
        db
    )

    return success_response(
        ResponseCode.CUSTOMER_FETCHED,
        "Customers fetched successfully",
        CustomerMapper.to_response_list(
            Customers
        )
    )


@router.get("/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    Customer = CustomerMapper.to_response(
        CustomerService.get_customer(
            db,
            customer_id
        )
    )

    return success_response(
        ResponseCode.CUSTOMER_FETCHED,
        "Customer fetched successfully",
        Customer
    )


@router.put("/{customer_id}")
def update_customer(
    customer_id: int,
    Customer: CustomerUpdate,
    db: Session = Depends(get_db)
):

    updated = CustomerMapper.to_response(
        CustomerService.update_customer(
            db,
            customer_id,
            Customer
        )
    )

    return success_response(
        ResponseCode.CUSTOMER_UPDATED,
        "Customer updated successfully",
        updated
    )


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    CustomerService.delete_customer(
        db,
        customer_id
    )

    return success_response(
        ResponseCode.CUSTOMER_DELETED,
        "Customer deleted successfully"
    )