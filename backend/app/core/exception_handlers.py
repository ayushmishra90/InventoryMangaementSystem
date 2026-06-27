from fastapi import Request

from fastapi.responses import (
    JSONResponse
)

from fastapi.exceptions import (
    RequestValidationError
)

from app.core.exceptions import (
    AppException
)

from app.core.response_builder import (
    failure_response
)

from app.core.response_codes import (
    ResponseCode
)

from app.core.logger import logger

async def app_exception_handler(
    request: Request,
    exc: AppException
):

    logger.error(
        f"{exc.code} : {exc.message}"
    )

    return JSONResponse(
        status_code=200,
        content=failure_response(
            exc.code,
            exc.message
        ).model_dump()
    )

async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):

    return JSONResponse(
        status_code=200,
        content=failure_response(
            ResponseCode.VALIDATION_ERROR,
            str(exc.errors())
        ).model_dump()
    )

async def generic_exception_handler(
    request: Request,
    exc: Exception
):

    logger.exception(
        "Unhandled Exception"
    )

    return JSONResponse(
        status_code=500,
        content=failure_response(
            ResponseCode.INTERNAL_SERVER_ERROR,
            "Something went wrong"
        ).model_dump()
    )
