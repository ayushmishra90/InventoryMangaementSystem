from pydantic import BaseModel, Field
from typing import Optional


class ProductCreate(BaseModel):

    name: str = Field(..., min_length=1)

    sku: str = Field(..., min_length=1)

    price: float = Field(..., gt=0)

    stock_quantity: int = Field(..., ge=0)


class ProductUpdate(BaseModel):

    name: Optional[str] = None

    sku: Optional[str] = None

    price: Optional[float] = Field(
        None,
        gt=0
    )

    stock_quantity: Optional[int] = Field(
        None,
        ge=0
    )


class ProductResponse(BaseModel):

    id: int

    name: str

    sku: str

    price: float

    stock_quantity: int

    model_config = {
        "from_attributes": True
    }