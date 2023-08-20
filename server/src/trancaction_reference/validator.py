from .transaction_reference_schema import TransactionReferenceSchema
from dataclasses import dataclass


class Validator:
    data: TransactionReferenceSchema
    is_valid_endbalance: bool
    is_unique_reference: bool

    def __determine_unique_reference(self, client, schema):
        """validation function that checks if the reference identifier is unique"""
        unique = client.sismember("csp:reference:set", schema.reference) == 0
        if unique:
            client.sadd("csp:reference:set", schema.reference)
            return True
        return False

    def __determine_valid_endbalance(self, schema):
        """validation function that calculates the new balance and checks if it matches with the given end balance"""
        expected_balance = schema.start_balance + schema.mutation
        return expected_balance == schema.end_balance

    def __init__(self, client, schema):
        self.data = schema
        self.is_valid_endbalance = self.__determine_valid_endbalance(schema)
        self.is_unique_reference = self.__determine_unique_reference(client, schema)

    def is_invalid(self):
        return self.is_valid_endbalance & self.is_unique_reference

    def to_dict(self):
        return {
            "data": self.data.to_dict(),
            "is_unique_reference": self.is_unique_reference,
            "is_valid_endbalance": self.is_valid_endbalance,
        }
