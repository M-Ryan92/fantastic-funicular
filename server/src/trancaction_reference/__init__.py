from dacite import from_dict, Config
from .transaction_reference_schema import TransactionReferenceSchema
from decimal import Decimal


def to_transaction_reference(dict):
    config = Config(
        type_hooks={
            Decimal: Decimal,
        },
    )

    return from_dict(TransactionReferenceSchema, dict, config=config)
