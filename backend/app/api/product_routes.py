from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.services.product_service import (
    ProductService
)

from app.schemas.product_schema import (
    ProductCreate,
    ProductUpdate
)

from app.core.response_builder import (
    success_response
)

from app.core.response_codes import (
    ResponseCode
)

from app.mappers.product_mapper import (
    ProductMapper
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    product = ProductMapper.to_response(
        ProductService.create_product(
            db,
            product
        )
    )

    return success_response(
        ResponseCode.PRODUCT_CREATED,
        "Product created successfully",
        product
    )


@router.get("")
def get_products(
    db: Session = Depends(get_db)
):
    products = ProductService.get_all_products(
        db
    )

    return success_response(
        ResponseCode.PRODUCT_FETCHED,
        "Products fetched successfully",
        ProductMapper.to_response_list(
            products
        )
    )


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = ProductMapper.to_response(
        ProductService.get_product(
            db,
            product_id
        )
    )

    return success_response(
        ResponseCode.PRODUCT_FETCHED,
        "Product fetched successfully",
        product
    )


@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):

    updated = ProductMapper.to_response(
        ProductService.update_product(
            db,
            product_id,
            product
        )
    )

    return success_response(
        ResponseCode.PRODUCT_UPDATED,
        "Product updated successfully",
        updated
    )


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    ProductService.delete_product(
        db,
        product_id
    )

    return success_response(
        ResponseCode.PRODUCT_DELETED,
        "Product deleted successfully"
    )