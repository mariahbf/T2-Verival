import { Fab, styled } from '@mui/material';

export const LargeFab = styled(Fab)(({ theme }) => ({
  width: '5rem',
  height: '5rem',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary[1000],
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.main,
  },
}));
