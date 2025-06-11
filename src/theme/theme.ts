'use client';
import { createTheme } from '@mui/material/styles';
import primary from './colors/primary';
import secondary from './colors/secondary';
import warning from './colors/warning';
import error from './colors/error';
import success from './colors/success';
import neutrals from './colors/neutrals';
import { Poppins } from "next/font/google";
import { Hind } from "next/font/google";
import { Inter } from "next/font/google";

declare module '@mui/material/styles' {
  interface Palette {
    neutrals: Palette['primary'];
  }

  interface PaletteOptions {
    neutrals?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
    baseWhite: string;
    baseBlack: string;
  }

  interface TypographyVariants {
    sidebarlogo: React.CSSProperties;
    sidebaricons: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    sidebarlogo?: React.CSSProperties;
    sidebaricons?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebarlogo: true;
    sidebaricons: true;
  }
}

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const hind = Hind({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary,
    secondary,
    neutrals,
    warning,
    error,
    success,
    background: {
      default: primary['200'],
    },
  },
  typography: {
    h1: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '600',
      fontSize: '2.2rem',
      color: primary[1000],
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '600',
      fontSize: '1.8rem',
      color: primary[1000],
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '400',
      fontSize: '1.4rem',
      color: primary[1000],
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '400',
      fontSize: '1.2rem',
      color: primary[1000],
    },
    body1: {
      fontFamily: hind.style.fontFamily,
      fontWeight: 'normal',
      fontSize: '1rem',
      color: primary[1000],
    },
    body2: {
      fontFamily: inter.style.fontFamily,
      fontWeight: '700',
      fontSize: '1.2rem',
      color: primary[1000],
    },
    subtitle1: {
      fontFamily: inter.style.fontFamily,
      fontWeight: '400',
      fontSize: '1rem',
      color: primary[1000],
    },
    subtitle2: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '400',
      fontSize: '1rem',
      color: primary[1000],
    },
    sidebarlogo: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '800',
      fontSize: '1.4rem',
      color: primary[1000],
    },
    sidebaricons: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: '600',
      fontSize: '1.125rem',
      color: primary[1000],
    },
  },
});

export default theme;
