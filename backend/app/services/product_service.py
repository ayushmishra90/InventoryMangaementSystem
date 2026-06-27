from app.repositories.product_repository import (
    ProductRepository
)

from app.core.product_exceptions import (
    ProductNotFoundException,
    DuplicateSKUException
)

from app.services.base_service import (
    BaseService
)


class ProductService:

    @staticmethod
    def validate_unique_sku(
        db,
        sku: str,
        current_product_id: int = None
    ):

        existing = ProductRepository.get_by_sku(
            db,
            sku
        )

        BaseService.validate_unique(
            existing,
            DuplicateSKUException,
            current_product_id
        )

    @staticmethod
    def create_product(
        db,
        product_data
    ):

        ProductService.validate_unique_sku(
            db,
            product_data.sku
        )

        return ProductRepository.create(
            db,
            product_data.model_dump()
        )

    @staticmethod
    def get_all_products(
        db
    ):
        return ProductRepository.get_all(
            db
        )

    @staticmethod
    def get_product(
        db,
        product_id
    ):
        return BaseService.raise_if_none(
            ProductRepository.get_by_id(
                db,
                product_id
            ),
            ProductNotFoundException
        )

    @staticmethod
    def update_product(
        db,
        product_id,
        update_data
    ):

        product = BaseService.raise_if_none(
            ProductRepository.get_by_id(
                db,
                product_id
            ),
            ProductNotFoundException
        )

        data = update_data.model_dump(
            exclude_unset=True
        )

        if "sku" in data:

            ProductService.validate_unique_sku(
                db,
                data["sku"],
                product.id
            )

        for key, value in data.items():
            setattr(
                product,
                key,
                value
            )

        return ProductRepository.update(
            db,
            product
        )

    @staticmethod
    def delete_product(
        db,
        product_id
    ):

        product = BaseService.raise_if_none(
            ProductRepository.get_by_id(
                db,
                product_id
            ),
            ProductNotFoundException
        )

        return ProductRepository.delete(
            db,
            product
        )