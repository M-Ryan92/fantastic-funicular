from decimal import Decimal
from dataclasses import dataclass
import dataclasses
import json


@dataclass
class TransactionReferenceSchema:
    reference: str
    account_number: str
    description: str
    start_balance: Decimal
    mutation: Decimal
    end_balance: Decimal

    def to_dict(self):
        return dataclasses.asdict(self)
