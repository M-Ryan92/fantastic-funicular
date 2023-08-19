from decimal import Decimal
from dataclasses import dataclass


@dataclass
class TransactionReferenceSchema:
    reference: str
    account_number: str
    description: str
    start_balance: Decimal
    mutation: Decimal
    end_balance: Decimal
