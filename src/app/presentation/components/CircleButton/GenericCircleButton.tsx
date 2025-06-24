import React from 'react';
import { StyledCircleButton } from './style';

interface FlexibleButtonProps {
  icon?: React.ReactNode;
  margin?: string;
  minWidth?: string;
  padding?: string;
  borderRadius?: string;
  onClick?: () => void;
}

export const GenericCircleButton: React.FC<FlexibleButtonProps> = ({
  icon,
  margin,
  minWidth,
  padding,
  borderRadius,
  onClick,
}) => {
  return (
    <StyledCircleButton
    aria-label="Generic Circle Button"
      sx={{
        margin: { margin },
        minWidth: { minWidth },
        padding: { padding },
        borderRadius: { borderRadius },
      }}
      onClick={onClick}
    >
      {icon}
    </StyledCircleButton>
  );
};
