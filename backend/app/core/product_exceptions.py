from app.core.exceptions import AppException
from app.core.response_codes import ResponseCode


class ProductNotFoundException(
    AppException
):
    def __init__(self):
        super().__init__(
            ResponseCode.PRODUCT_NOT_FOUND,
            "Product not found"
        )


class DuplicateSKUException(
    AppException
):
    def __init__(self):
        super().__init__(
            ResponseCode.SKU_ALREADY_EXISTS,
            "SKU already exists"
        )