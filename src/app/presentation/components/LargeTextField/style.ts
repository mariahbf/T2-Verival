import { styled, TextField } from '@mui/material';

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: theme.typography.h1.fontFamily,
  },
  overflow: 'auto',
  borderRadius: '1rem',
  backgroundColor: '#F5F5F5',
  height: '50rem',
  marginBottom: '1.5rem',
}));
