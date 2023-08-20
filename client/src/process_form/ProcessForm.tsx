import React, { ChangeEvent, ReactElement, RefObject, useRef, useState } from 'react';
import { StyledForm } from './styled';
import { Box } from '../components';
import { styled } from 'styled-components';
import { Theme } from '../theme';
import { darken } from 'polished';
import axios from 'axios';
import { Toast, ToastData } from './toast';
import { uploadFileRequest } from './upload_file_requiest';
import { CSPRecord } from './csp_record';

const Button = styled.button<{color?: keyof Theme, disabled?: boolean, children?: ReactElement | string}>`
  background-color: ${(props) => props.disabled ? props.theme.status_disable: props.theme[props.color ?? 'primary']};
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:hover {
    background-color: ${(props) => props.disabled ? props.theme.status_disable : darken(0.15, props.theme[props.color ?? 'primary'])};
  }
`

const handleFileSelect = (event:  ChangeEvent<HTMLInputElement>, setFile: (arg0: File | null) => void): void => {
  const fileList = event.target.files;
  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    setFile(file)
  } else {
    setFile(null)
  }
}
const handleClear = (ref: RefObject<HTMLInputElement>, setFile: (arg0: File | null) => void): void => {
  if (ref.current) ref.current.value = '';
  setFile(null);
}

const handleFlushDb = (setLoading: (arg0: boolean) => void, setToastData: (arg0: ToastData) => void): void => {
  setLoading(true)
  axios.get('http://localhost:5000/api/flushdB/', {})
  .then(function ({data: {code, message}}) {
    setToastData({code, message})
    setTimeout(() => setLoading(false), 500)
  })
  .catch(function () {
    setToastData({code: 500, message: 'internal server error'})
  });
}

type ProcessFormProps = {
  loading: boolean;
  setLoading: (arg0: boolean) => void;
  setRecords: (args0: CSPRecord[]) => void;
}

export const ProcessForm = ({loading, setLoading, setRecords}: ProcessFormProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [toastData, setToastData] = useState<ToastData>(null)
  const [file, setFile] = useState<File | null>(null);

  const clearDisabled = !file || loading
  const processDisabled = !file || loading

  return (
    <StyledForm style={{ height: '4rem', padding: '2rem'}}>
    <Box style={{justifyContent: 'space-between'}} direction={'row'}>
      <Box direction={'column'}>
        <Box direction={'row'}>
          <Box padding={'0 4px'}>
            <Button style={{width: '200px'}} disabled={!!file || loading} onClick={() => inputRef.current?.click()}>{file ? `${file.name} selected`: 'select a file'}</Button>
          </Box>
          <Box padding={'0 4px'}>
            <Button onClick={() => handleClear(inputRef, setFile)} color={'status_warn'} disabled={clearDisabled} >{'clear'}</Button>
          </Box>
          <Box padding={'0 4px'}>
            <Button color={'status_ok'} onClick={() => {
              if (file) {
                uploadFileRequest({file, setLoading, setRecords, setToastData})
              }
              handleClear(inputRef, setFile)
            }} disabled={processDisabled} >{'process'}</Button>
          </Box>
        </Box>
        <Toast data={toastData} setToastData={setToastData}/>
      </Box>
      <Box style={{float: 'right'}} >
        <Button onClick={() => {
          handleFlushDb(setLoading, setToastData)
          handleClear(inputRef, setFile)
          setRecords([])
        }} color={'status_danger'} >{'flushDB'}</Button>
      </Box>
      <input onChange={(event) => handleFileSelect(event, setFile)} type={'file'} accept={'.csv'} hidden ref={inputRef}/>
    </Box>
  </StyledForm>
  );
};
