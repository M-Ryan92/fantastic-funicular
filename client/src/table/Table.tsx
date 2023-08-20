import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react'

import {TableContainer, TableHeader, TableColumn, TableRows, TableRow, CenterBox } from './styled'
import { Box } from '../components';
import { ThreeCircles } from 'react-loader-spinner';
import { theme } from '../theme';

type BaseColumnDetailsValue<T, K extends keyof T> = {
    label: string;
    key: K;
    render_row_value?: (val: T[K]) => ReactElement;
};

type BaseRecordValue<T, K extends keyof T> = T[K]

type RecordValue<T> = { [K in keyof T]-?: BaseRecordValue<T, K> }[keyof T]

type ColumnDetailsValue<T> = { [K in keyof T]-?: BaseColumnDetailsValue<T, K> }[keyof T]

type ColumnDetails<T> = {
  [key: string]: ColumnDetailsValue<T>
}

type TableProps<T> = {
  columns: ColumnDetails<T>;
  records: T[];
  searchOn?: keyof T;
  loading?: boolean
}

const render = <T,>(value: RecordValue<T>, column: ColumnDetailsValue<T>) => {
  if (column.render_row_value) {
    return column.render_row_value(value);
  }

  if (typeof value !== 'object') {
    return value
  }
  return null
}

const makeColumns = <T,>(record: T, columns: ColumnDetailsValue<T>[]): ReactElement[] => (
  columns.map(column => {
    const value = column.key && record[column.key]

    return <TableColumn key={1}>
        <>
          {render<T>(value, column)}
        </>
      </TableColumn>;
  })
)

const makeRows = <T,>(records: T[], columns: ColumnDetailsValue<T>[]) => (
  records.map(record => (
    <TableRow key={1}>
    {makeColumns<T>(record, columns)}
  </TableRow>
  ))
)

type searchRecordProps<T> = {
  searchRef: RefObject<HTMLInputElement>,
  searchOn: keyof T,
  records: T[],
  setFilteredRecords: (value: T[]) => void,
}

const filter = <T,>(record: T, searchOn: keyof T, search: string): boolean => {
  const value = record[searchOn];
  if (typeof value === 'string') {
    return !!value.match(search)
  }
  return false;
}

const searchRecord = <T,>({searchRef, searchOn, records, setFilteredRecords}: searchRecordProps<T>)  => {
  const searchValue = searchRef.current?.value

  if (searchValue && searchOn) {
    const new_results = records.filter(record => filter(record, searchOn, searchValue))
    setFilteredRecords(new_results);
  } else {
    setFilteredRecords(records);
  }
}

export const Table = <T,>({columns, records, searchOn, loading=false}: TableProps<T>): ReactElement => {
  const columnsArray = Object.values<ColumnDetailsValue<T>>(columns);

  const [filteredRecords, setFilteredRecords] = useState<T[]>(records)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(searchRef.current){
      searchRef.current.value = '';
    }
    setFilteredRecords(records)

  }, [records])

  return (

    <TableContainer height={'40vh'}>
      <Box direction={'row'} padding={'1rem'}>
            {searchOn && (
              <>
                <Box direction={'column'} padding={'0 0 0 1rem'}>
                  <button onClick={() => searchRecord({searchRef, searchOn, records, setFilteredRecords})}>{'search'}</button>
                </Box>
                <Box style={{width: '10rem'}} direction={'column'}>
                  <input ref={searchRef}></input>
                </Box>
              </>
            )}
      </Box>
      <TableHeader>
        {
          columnsArray.map(column => (
            <TableColumn key={'1'}>
              {column.label}
            </TableColumn>
          )
        )}
      </TableHeader>
        {loading && (
          <CenterBox>
            <ThreeCircles
                height={'200'}
                width={'200'}
                color={'#4fa94d'}
                wrapperStyle={{margin: 'auto'}}
                visible
                outerCircleColor={theme.neutral_3}
                innerCircleColor={theme.accent_2}
                middleCircleColor={theme.primary}
              />
          </CenterBox>
        )}
        {!loading && filteredRecords.length == 0 && (<CenterBox><Box style={{margin: 'auto'}}>{'No results found'}</Box></CenterBox>)}
        {!loading && filteredRecords.length > 0 &&
          <TableRows>
            {makeRows<T>(filteredRecords, columnsArray)}
          </TableRows>
        }
    </TableContainer>
  )
}
