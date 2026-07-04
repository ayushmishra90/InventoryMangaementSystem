from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class CustomerCreate(BaseModel):

    full_name: str = Field(..., min_length=2)

    email: EmailStr

    phone_number: str = Field(..., min_length=10)


class CustomerUpdate(BaseModel):

    full_name: Optional[str] = None

    email: Optional[EmailStr] = None

    phone_number: Optional[str] = None


class CustomerResponse(BaseModel):

    id: int

    full_name: str

    email: str

    phone_number: str

    model_config = {
        "from_attributes": True
    }