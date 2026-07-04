from app.core.exceptions import AppException
from app.core.response_codes import ResponseCode


class OrderNotFoundException(AppException):

    def __init__(self):
        super().__init__(
            ResponseCode.ORDER_NOT_FOUND,
            "Order not found"
        )


class InsufficientStockException(AppException):

    def __init__(self):
        super().__init__(
            ResponseCode.INSUFFICIENT_STOCK,
            "Insufficient stock"
        )
        
class InvalidOrderStatusTransitionException(
    AppException
):

    def __init__(self):

        super().__init__(
            code="INVALID_ORDER_STATUS_TRANSITION",
            message="Invalid order status transition."
        )


