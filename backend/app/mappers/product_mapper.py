from app.schemas.product_schema import (
    ProductResponse
)


class ProductMapper:

    @staticmethod
    def to_response(product):

        return ProductResponse.model_validate(
            product
        )

    @staticmethod
    def to_response_list(products):

        return [
            ProductResponse.model_validate(
                product
            )
            for product in products
        ]