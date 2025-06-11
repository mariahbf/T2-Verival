import React from 'react';
import { Box, Stack } from '@mui/material';
import { StyledBox } from './style';

export const Lotus = () => {
  return (
    <Stack alignItems="center" data-testid="lotus-stack">
      <StyledBox data-testid="styled-box" />
      <Box height="8rem" data-testid="height-box" />
    </Stack>
  );
};
