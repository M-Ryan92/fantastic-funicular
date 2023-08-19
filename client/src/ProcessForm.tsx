import { ReactElement } from 'react';
import { Button, FileInput, Form, FormField, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { DocumentUpload } from 'grommet-icons';
import { theme } from './theme';

const customTheme = deepMerge(theme, {
  fileInput: {
    dragOver: {
      border: { color: 'focus' },
    },
    hover: {
      border: { color: 'focus' },
    },
  },
});

export const ProcessForm = (): ReactElement => {
  return (
    <Form>
      <FormField
        label="upload file for csp"
        htmlFor="cspFileInput"
        name="cspFileInput"
      >
        <Grommet theme={customTheme}>
          <FileInput
            accept=".csv"
            multiple={false}
            name="file"
            onChange={(event): void => {
              const fileList = event?.target?.files;

              if (fileList && fileList.length > 0) {
                const file = fileList[0];
                console.log({ file });
              }
            }}
          />
        </Grommet>
      </FormField>
      <Button
        primary
        label={'Upload'}
        icon={<DocumentUpload size="medium" />}
        type="submit"
      />
    </Form>
  );
};
