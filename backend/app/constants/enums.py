from enum import Enum


class OrderStatus(str, Enum):
    PLACED = "PLACED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"