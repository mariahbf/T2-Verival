import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)<{ themevariant: 'dark' | 'normal' | 'light' }>(({ theme, themevariant }) => ({
  color: themevariant === 'normal'
    ? theme.palette.secondary?.[1000] || '#000'
    : theme.palette.neutrals?.baseWhite || '#FFF',
  backgroundColor: themevariant === 'dark'
    ? theme.palette.secondary?.[1000] || '#333'
    : theme.palette.primary?.[300] || '#ccc',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
}));
