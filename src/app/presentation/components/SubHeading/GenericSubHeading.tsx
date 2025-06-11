import { StyledTypography } from './style';
import React from 'react';

interface FlexibleHeadingProps {
  text: string;
  themevariant: 'dark' | 'light';
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
}

export const GenericSubHeading: React.FC<FlexibleHeadingProps> = ({
  text,
  themevariant,
  width,
  height,
  fontSize
}) => {
  return (
    <StyledTypography themevariant={themevariant} width={width} height={height} fontSize={fontSize}>
      {text}
    </StyledTypography>
  );
};
