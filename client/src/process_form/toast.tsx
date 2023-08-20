import React, { ReactElement, useEffect } from 'react';
import { Box } from '../components';
import { Theme } from '../theme';

export type ToastData = {code: number, message: string} | null

type ToastProps = {
  data: ToastData,
  setToastData: (arg0: ToastData) => void
}

const codetoTheme = (code: number): keyof Theme => {
  switch (code) {
    case 200:
      return 'status_ok'
    case 500:
      return 'status_error'

    default:
      return 'status_warn'
  }
}

export const Toast = ({ data, setToastData }:ToastProps): ReactElement | null => {
  if (!data) return null;

  useEffect(() => {
    setTimeout(() => setToastData(null), 1500)
  }, [data])

  return (
    <Box
      style={{margin: '8px 0 0 0', width: '25rem', borderRadius: '5px', padding: '10px'}}
      backGroundColor={codetoTheme(data.code)}
    >
    {data.message}
    </Box>)
}
