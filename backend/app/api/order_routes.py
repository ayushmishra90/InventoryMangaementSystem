from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.order_schema import (
    OrderCreate,
    OrderStatusUpdate,
    OrderResponse
)

from app.services.order_service import (
    OrderService
)

from app.mappers.order_mapper import (
    OrderMapper
)

from app.core.response_builder import (
    success_response
)

from app.core.response_codes import (
    ResponseCode
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    created_order = OrderService.create_order(
        db,
        order
    )

    return success_response(
        ResponseCode.ORDER_CREATED,
        "Order created successfully",
        OrderMapper.to_response(
            created_order
        )
    )

@router.get("")
def get_orders(
    db: Session = Depends(get_db)
):

    orders = OrderService.get_all_orders(
        db
    )

    return success_response(
        ResponseCode.ORDER_FETCHED,
        "Orders fetched successfully",
        OrderMapper.to_response_list(
            orders
        )
    )

@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = OrderService.get_order(
        db,
        order_id
    )

    return success_response(
        ResponseCode.ORDER_FETCHED,
        "Order fetched successfully",
        OrderMapper.to_response(
            order
        )
    )

@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    OrderService.delete_order(
        db,
        order_id
    )

    return success_response(
        ResponseCode.ORDER_CANCELLED,
        "Order deleted successfully"
    )

@router.patch(

    "/{order_id}/status"

)

def update_order_status(

    order_id: int,

    request: OrderStatusUpdate,

    db: Session = Depends(get_db)

):

    order = OrderService.update_status(

        db,

        order_id,

        request.status

    )

    return success_response(

        code="ORDER_STATUS_UPDATED",

        message="Order status updated.",

        data=OrderResponse.model_validate(

            order

        )

    )