import React from 'react';
import { StyledTextField } from './style';
import theme from '../../../../theme/theme';


interface TextFolderProps { 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  themevariant: "dark" | "normal" | "light";
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  value?: string;
  helperText?: string;	
  error?: boolean;
  helperTextStyles?: React.CSSProperties;
  type?: string;
  sx?: React.CSSProperties;
}

export const GenericTextField: React.FC<TextFolderProps> = ({
  label,
  themevariant,
  width,
  height,
  margin,
  value,
  helperText,
  onChange,
  error,
  helperTextStyles, 
  type, 
  sx
}) => {
  return (
    <StyledTextField
    themevariant={themevariant}
    variant="filled"
    value={value}
    label={label}
    onChange={onChange}
    helperText={helperText}
    error={error}
    FormHelperTextProps={{ style: helperTextStyles }} //Estilizar a cor do texto de erro
    type={type}
      sx={{
        color: theme.palette.neutrals.baseBlack,
        width: {width},
        height: {height},
        margin: {margin},
        '& .MuiFilledInput-root': {
          border: error ? theme.palette.error.main: 'initial', //Ver essa cor
          
        },
        minHeight: '1px',
      }}
      >
      </StyledTextField>
  );
};
