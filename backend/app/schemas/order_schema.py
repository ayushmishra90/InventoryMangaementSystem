from pydantic import BaseModel, Field
from typing import List

from app.constants.enums import OrderStatus

class ProductSummary(BaseModel):

    id: int

    name: str

    model_config = {

        "from_attributes": True

    }

class OrderItemCreate(BaseModel):

    product_id: int

    quantity: int = Field(..., gt=0)


class OrderCreate(BaseModel):

    customer_id: int

    items: List[OrderItemCreate]

class OrderItemResponse(BaseModel):

    quantity: int

    unit_price: float

    subtotal: float

    product: ProductSummary

    model_config = {

        "from_attributes": True

    }

class OrderResponse(BaseModel):

    id: int

    customer_id: int

    total_amount: float

    status: OrderStatus

    items: List[OrderItemResponse]

    model_config = {
        "from_attributes": True
    }

class OrderStatusUpdate(BaseModel):

    status: OrderStatus