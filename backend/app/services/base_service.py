class BaseService:

    @staticmethod
    def raise_if_none(
        entity,
        exception_class
    ):
        if entity is None:
            raise exception_class()

        return entity

    @staticmethod
    def validate_unique(
        existing_entity,
        exception_class,
        current_id=None
    ):

        if (
            existing_entity and
            existing_entity.id != current_id
        ):
            raise exception_class()