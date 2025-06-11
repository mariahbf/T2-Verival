import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { GenericCircleButton } from '../CircleButton';
import { GenericHeading } from '../Heading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

export interface IInfoCardDetailsProps {
  cardContents: any;
  selectedCard: number;
  cardValue: boolean;
  variant: 'dark' | 'light';
  handleBackClick: () => void;
}

export const InfoCardDetails = ({
  cardContents,
  selectedCard,
  handleBackClick,
  cardValue,
  variant,
}: IInfoCardDetailsProps) => {
  const theme = useTheme();
  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
      padding="2rem 0 2rem 0"
    >
      <Stack sx={{ position: 'absolute', top: '2.5rem', left: '1rem' }}>
        <GenericCircleButton
          icon={<ArrowBackIcon />}
          onClick={handleBackClick}
        />
      </Stack>
      <Stack marginTop={'2.5rem'} gap={'1rem'}>
        <GenericHeading
          text={'VERDADE ou MITO?'}
          themevariant="light"
          lineHeight="1.2"
        />
        <Box
          sx={{
            backgroundColor:
              variant == 'dark'
                ? theme.palette.secondary[1000]
                : theme.palette.secondary.main,
            padding: '1rem',
            width: '100%',
            height: 'auto',
            borderRadius: '1rem',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              color:
                variant == 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.secondary[1000],
            }}
          >
            {cardContents[selectedCard].title}
          </Typography>
        </Box>
        <Stack flexDirection={'row'} width={'100%'} gap={'0.5rem'}>
          <Typography
            variant="h4"
            sx={{ fontSize: '1.1rem', color: theme.palette.secondary[1000] }}
          >
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: cardValue ? '#279E6C' : '#DA1F2F',
              }}
            >
              {cardValue ? 'Verdade' : 'Mito'}
            </span>
            {cardContents[selectedCard].description.split(
              cardValue ? 'VERDADE' : 'MITO',
            )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
