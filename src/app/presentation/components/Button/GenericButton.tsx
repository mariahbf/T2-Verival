import React from 'react';
import { StyledButton } from './style';

interface FlexibleButtonProps {
  text: string;
  themevariant: "dark" | "normal" | "light";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode; 
  width?: string | number;
  height?: string | number; 
  textColor?: string;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

export const GenericButton: React.FC<FlexibleButtonProps> = ({
  text,
  themevariant,
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  width,
  height,
  textColor,
  borderRadius = '20px',
  style,
}) => {
  return (
    <StyledButton
      themevariant={themevariant}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      endIcon={icon}
      sx={{
        width: width, 
        height: height,
        color: textColor,
        borderRadius: borderRadius,
        fontFamily: 'Poppins, sans-serif',
        ...style,
      }}
    >
      {text}
    </StyledButton>
  );
};
