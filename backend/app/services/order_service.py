from sqlalchemy.orm import Session

from app.constants.enums import OrderStatus

from app.models.order import Order
from app.models.order_item import OrderItem

from app.repositories.order_repository import OrderRepository
from app.repositories.order_item_repository import OrderItemRepository
from app.repositories.product_repository import ProductRepository

from app.services.product_service import ProductService
from app.services.customer_service import CustomerService
from app.services.base_service import BaseService

from app.core.order_exceptions import (
    OrderNotFoundException,
    InsufficientStockException,    
    InvalidOrderStatusTransitionException

)

class OrderService:

    @staticmethod
    def validate_stock(
        product,
        quantity
    ):

        if product.stock_quantity < quantity:
            raise InsufficientStockException()
    
    @staticmethod
    def calculate_subtotal(
        product,
        quantity
    ):
        return product.price * quantity
    
    @staticmethod
    def get_order_or_raise(
        db,
        order_id
    ):

        return BaseService.raise_if_none(
            OrderRepository.get_by_id(
                db,
                order_id
            ),
            OrderNotFoundException
        )

    @staticmethod
    def create_order(
        db: Session,
        order_data
    ):

        try:

            customer = CustomerService.get_customer(
                db,
                order_data.customer_id
            )

            order = Order(
                customer_id=customer.id,
                total_amount=0,
                status=OrderStatus.PLACED.value
            )

            OrderRepository.create(
                db,
                order
            )

            order_items = []

            total_amount = 0

            for item in order_data.items:

                product = ProductService.get_product(
                    db,
                    item.product_id
                )

                OrderService.validate_stock(
                    product,
                    item.quantity
                )

                subtotal = OrderService.calculate_subtotal(
                    product,
                    item.quantity
                )

                total_amount += subtotal

                order_item = OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=item.quantity,
                    unit_price=product.price,
                    subtotal=subtotal
                )

                order_items.append(order_item)

                product.stock_quantity -= item.quantity

                ProductRepository.save(
                    db,
                    product
                )

            OrderItemRepository.create_many(
                db,
                order_items
            )

            order.total_amount = total_amount

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    @staticmethod
    def get_all_orders(
        db
    ):

        return OrderRepository.get_all(
            db
        )

    @staticmethod
    def get_order(
        db,
        order_id
    ):

        return OrderService.get_order_or_raise(
            db,
            order_id
        )

    @staticmethod
    def delete_order(
        db,
        order_id
    ):

        order = OrderService.get_order_or_raise(
            db,
            order_id
        )

        try:

            OrderRepository.delete(
                db,
                order
            )

            db.commit()

        except Exception:

            db.rollback()

            raise


    @staticmethod
    def update_status(

        db,

        order_id,

        status

    ):

        order = BaseService.raise_if_none(

            OrderRepository.get_by_id(

                db,

                order_id

            ),

            OrderNotFoundException

        )

        # Already same status
        if order.status == status:

            return order

        # ----------------------------
        # Allowed transitions
        # ----------------------------

        if order.status == OrderStatus.PLACED:

            if status not in (

                OrderStatus.COMPLETED,

                OrderStatus.CANCELLED

            ):

                raise InvalidOrderStatusTransitionException()

        elif order.status == OrderStatus.COMPLETED:

            raise InvalidOrderStatusTransitionException()

        elif order.status == OrderStatus.CANCELLED:

            raise InvalidOrderStatusTransitionException()

        # ----------------------------
        # Restore Inventory
        # ----------------------------

        if status == OrderStatus.CANCELLED:

            for item in order.items:

                product = ProductRepository.get_by_id(

                    db,

                    item.product_id

                )

                product.stock_quantity += item.quantity

                ProductRepository.update(

                    db,

                    product

                )

        order.status = status

        return OrderRepository.update(

            db,

            order

        )