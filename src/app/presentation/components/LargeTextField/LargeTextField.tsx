import React from 'react';
import { Stack } from '@mui/material';
import { CustomTextField } from './style';

interface LargeTextFieldProps {
  onChange: (x: string) => void;
}

export const LargeTextField: React.FC<LargeTextFieldProps> = ({ onChange }) => {
  return (
    <Stack overflow={'auto'}>
      <CustomTextField
        placeholder="Insira aqui suas anotações..."
        multiline
        minRows={10}
        fullWidth
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
