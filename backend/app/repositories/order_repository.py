from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.models.order import Order
from app.models.order_item import OrderItem


class OrderRepository:

    @staticmethod
    def create(
        db: Session,
        order: Order
    ):
        db.add(order)
        db.flush()
        return order

    @staticmethod
    def get_by_id(
        db: Session,
        order_id: int
    ):

        return (
            db.query(Order)
            .options(
                joinedload(Order.items).joinedload(
                    OrderItem.product
                )
            )
            .filter(Order.id == order_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session
    ):

        return (
            db.query(Order)
            .options(
                joinedload(Order.items).joinedload(
                    OrderItem.product
                )
            )
            .all()
        )

    @staticmethod
    def delete(
        db: Session,
        order: Order
    ):
        db.delete(order)

    @staticmethod
    def update(
        db,
        order
    ):

        db.commit()

        db.refresh(order)

        return order