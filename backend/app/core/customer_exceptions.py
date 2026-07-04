from app.core.exceptions import AppException
from app.core.response_codes import ResponseCode


class CustomerNotFoundException(
    AppException
):

    def __init__(self):
        super().__init__(
            ResponseCode.CUSTOMER_NOT_FOUND,
            "Customer not found"
        )


class DuplicateEmailException(
    AppException
):

    def __init__(self):
        super().__init__(
            ResponseCode.EMAIL_ALREADY_EXISTS,
            "Email already exists"
        )