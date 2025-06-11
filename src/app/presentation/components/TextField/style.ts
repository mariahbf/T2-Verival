import { alpha, styled } from '@mui/material/styles';
import TextFieldComponent from '@mui/material/TextField';

export const StyledTextField = styled(TextFieldComponent)<{ themevariant: "dark" | "normal" | "light" }>(({ theme, themevariant }) => ({
    fontSize: '14px',
    fontWeight: 'normal',
    backgroundColor:  themevariant === 'normal' //tela de admin mobile
    ? theme.palette.neutrals.baseWhite 
    : themevariant === 'dark' //  tela de login mãe
    ? alpha(theme.palette.neutrals.baseBlack ?? '', 0.06)
    : theme.palette.primary[100], //tela de admin desktop
    borderRadius: '4px 4px 0 0',
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.neutrals.baseBlack,
    },
    
    }
));