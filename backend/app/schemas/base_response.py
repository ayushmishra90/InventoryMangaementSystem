from pydantic import BaseModel
from typing import Any


class BaseResponse(BaseModel):
    success: bool
    code: str
    message: str
    data: Any = None