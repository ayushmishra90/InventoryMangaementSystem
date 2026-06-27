from fastapi import FastAPI

from fastapi.exceptions import (
    RequestValidationError
)

from app.api.product_routes import (
    router as product_router
)

from app.core.exceptions import (
    AppException
)

from app.core.exception_handlers import (
    app_exception_handler,
    validation_exception_handler,
    generic_exception_handler
)

from app.middleware.logging_middleware import (
    LoggingMiddleware
)

app = FastAPI(
    title="Inventory API"
)

app.add_middleware(
    LoggingMiddleware
)

app.add_exception_handler(
    AppException,
    app_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    Exception,
    generic_exception_handler
)

app.include_router(
    product_router
)
