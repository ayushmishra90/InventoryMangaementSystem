from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Float

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    sku: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    price: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    stock_quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )