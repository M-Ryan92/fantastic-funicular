import React, { ReactElement, useState } from 'react';
// import './App.css';
import { ThemeProvider, styled } from 'styled-components';
import { theme } from './theme'
import { Table } from './table';
import { Header } from './header';
import { Box } from './components';
import { ProcessForm } from './process_form';
import { CSPRecord } from './process_form/csp_record';
import { MdError, MdCheckCircle } from 'react-icons/md'

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.light_3};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`

const displayStatusColumn = (data: boolean): ReactElement => {
  const Icon = data ? MdCheckCircle : MdError
  const color = data ? theme.status_ok : theme.status_danger

  return <Icon color={color} size={'2rem'}/>
}

function App() {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<CSPRecord[]>([]);
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header title={'Customer Statement Processor'}/>
        <Body>
          <Box style={{width: '80%', minWidth: '50rem', margin: '0 auto'}}>
            <Box padding={'1rem'}>
                <ProcessForm loading={loading} setLoading={setLoading} setRecords={setRecords} ></ProcessForm>
            </Box>
            <Box padding={'1rem'}>
              <Table<CSPRecord>
                loading={loading}
                searchOn={'reference'}
                columns={
                  {
                    col1: {
                      key: 'reference',
                      label: 'Reference'
                    },
                    col2: {
                      key: 'validEndbalance',
                      label: 'Valid endbalance',
                      render_row_value: displayStatusColumn
                    },
                    col3: {
                      key: 'uniqueReference',
                      label: 'Unique Reference',
                      render_row_value: displayStatusColumn
                    },
                    col4: {
                      key: 'accountNumber',
                      label: 'account number',
                    },
                    col5: {
                      key: 'description',
                      label: 'description',
                    },
                    col8: {
                      key: 'startBalance',
                      label: 'start balance',
                    },
                    col7: {
                      key: 'mutation',
                      label: 'mutation',
                    },
                    col6: {
                      key: 'endBalance',
                      label: 'end balance',
                    },
                  }

                }
                records={records}
              />
            </Box>
          </Box>
        </Body>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
