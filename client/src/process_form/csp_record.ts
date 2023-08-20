import { ResponseRecord } from './upload_file_requiest'

export type CSPRecord = {
  accountNumber: string;
  description: string;
  endBalance: string;
  mutation: string;
  reference: string;
  startBalance: string;
  uniqueReference: boolean;
  validEndbalance: boolean;
}
export const reformData = (record: ResponseRecord): CSPRecord => {
  const {
    account_number: accountNumber,
    description,
    end_balance: endBalance,
    mutation,
    reference,
    start_balance: startBalance,
  } = record.data;

  return {
    reference,
    accountNumber,
    description,
    startBalance,
    mutation,
    endBalance,
    uniqueReference: record.is_unique_reference,
    validEndbalance: record.is_valid_endbalance,

  }
}
