from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.services.dashboard_service import (
    DashboardService
)

from app.schemas.dashboard_schema import (
    DashboardResponse
)

from app.core.response_builder import (
    success_response
)

from app.core.response_codes import (
    ResponseCode
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard(
    db: Session = Depends(get_db)
):

    dashboard = DashboardService.get_dashboard(
        db
    )

    response = DashboardResponse(
        **dashboard
    )

    return success_response(
        ResponseCode.DASHBOARD_FETCHED,
        "Dashboard fetched successfully",
        response
    )