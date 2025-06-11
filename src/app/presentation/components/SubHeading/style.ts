import { styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)<{
  themevariant: 'dark' | 'light';
  fontSize?: string | number;
}>(({ theme, themevariant, fontSize }) => ({
  color:
    themevariant === 'dark'
      ? theme.palette.secondary[1000]
      : theme.palette.secondary[400],
  fontFamily: theme.typography.h4.fontFamily,
  fontWeight: theme.typography.h4.fontWeight,
  fontSize:  fontSize || theme.typography.h4.fontSize,
}));
