import { styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)<{
  themevariant: 'dark' | 'light';
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}>(({ theme, themevariant, fontSize, lineHeight, letterSpacing}) => ({
  color:
    themevariant === 'dark'
      ? theme.palette.secondary[1000]
      : theme.palette.secondary[400],
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h1.fontWeight,
  fontSize: fontSize || theme.typography.h1.fontSize,
  lineHeight: lineHeight,
  letterSpacing: letterSpacing,
}));
