import axios from 'axios'
import { CSPRecord, reformData } from './csp_record'
import { ToastData } from './toast'

type uploadFileRequestProps = {
  file: File,
  setLoading: (arg0: boolean) => void,
  setRecords: (arg0: CSPRecord[]) => void,
  setToastData: (arg0: ToastData) => void,
}

export type ResponseRecord = {
  data: {
    account_number: string
    description: string,
    end_balance: string,
    mutation: string,
    reference: string,
    start_balance: string
  },
  is_unique_reference: boolean,
  is_valid_endbalance: boolean,
}

export type ProcessRequestResponse = {
  data: {response: ResponseRecord[]}
}

export const uploadFileRequest = ({file, setLoading, setRecords, setToastData}: uploadFileRequestProps): void => {
  setLoading(true)

  const formData = new FormData();
  formData.append('file', file);
  axios.post<FormData, ProcessRequestResponse>('http://localhost:5000/api/process_file/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
    const data = response.data.response.map(reformData)
    setToastData({code: 200, message: 'file processed'})
    setTimeout(() => setLoading(false), 500)
    setRecords(data)
  })
  .catch(function () {
    setRecords([])
    setToastData({code: 500, message: 'internal server error'})
  });
};
