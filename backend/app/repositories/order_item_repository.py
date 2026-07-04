from sqlalchemy.orm import Session

from app.models.order_item import OrderItem


class OrderItemRepository:

    @staticmethod
    def create(
        db: Session,
        item: OrderItem
    ):

        db.add(item)

        return item

    @staticmethod
    def create_many(
        db: Session,
        items: list[OrderItem]
    ):

        db.add_all(items)