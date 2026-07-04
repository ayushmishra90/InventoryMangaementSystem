from app.schemas.order_schema import (
    OrderResponse,
    OrderItemResponse
)


class OrderMapper:

    @staticmethod
    def to_response(order):

        items = [
            OrderItemResponse.model_validate(item)
            for item in order.items
        ]

        return OrderResponse(
            id=order.id,
            customer_id=order.customer_id,
            total_amount=order.total_amount,
            status=order.status,
            items=items
        )

    @staticmethod
    def to_response_list(orders):

        return [
            OrderMapper.to_response(order)
            for order in orders
        ]