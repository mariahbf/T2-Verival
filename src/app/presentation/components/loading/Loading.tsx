import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { Lotus } from '../Lotus';

export const Loading = () => {
  return (
    <Stack display="flex" alignItems="center" width={'100%'} height={'100%'}>
        <Lotus />
        <CircularProgress 
          color={'secondary'} 
          size={'100px'}
          style={{ marginTop: '30vh' }}
        />
      </Stack>
  );
};
