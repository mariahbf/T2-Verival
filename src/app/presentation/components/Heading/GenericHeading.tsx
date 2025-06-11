import React from 'react';
import { StyledTypography } from './style';

interface FlexibleHeadingProps {
  text: string;
  themevariant: 'dark' | 'light';
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}

export const GenericHeading: React.FC<FlexibleHeadingProps> = ({
  text,
  themevariant,
  width,
  height,
  fontSize,
  lineHeight,
  letterSpacing,
}) => {
  return (
    <StyledTypography
      themevariant={themevariant}
      width={width}
      height={height}
      fontSize={fontSize}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
    >
      {text}
    </StyledTypography>
  );
};
