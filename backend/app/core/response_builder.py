from app.schemas.base_response import (
    BaseResponse
)


def success_response(
    code: str,
    message: str,
    data=None
):

    return BaseResponse(
        success=True,
        code=code,
        message=message,
        data=data
    )


def failure_response(
    code: str,
    message: str
):

    return BaseResponse(
        success=False,
        code=code,
        message=message,
        data=None
    )