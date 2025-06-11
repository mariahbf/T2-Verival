import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { GenericButton } from '../../components';

type InfoCardProps = {
  title: string;
  description: string;
  backgroundColor: string;
  titleColor: string;
  descriptionColor: string;
  buttonColor: 'normal' | 'light' | 'dark';
  textColor?: string;
  buttonText?: string;
  onClick?: () => void;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  backgroundColor,
  titleColor,
  descriptionColor,
  buttonColor,
  textColor,
  buttonText = 'Ver mais',
  onClick,
}) => {
  return (
    <Card
      sx={{
        backgroundColor,
        borderRadius: '16px',
        boxShadow: 3,
        width: '100%',
      }}
    >
      <CardContent style={{ paddingBottom: '1rem' }}>
        <Typography
          sx={{
            fontSize: '1rem',
            color: titleColor,
            marginBottom: '0.3rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.8rem',
            fontWeight: 'normal',
            fontFamily: 'Poppins, sans-serif',
            color: descriptionColor,
            marginBottom: '0.5rem',
          }}
        >
          {description}
        </Typography>

        <GenericButton
          text={buttonText}
          themevariant={buttonColor}
          width={'100%'}
          height={'2rem'}
          onClick={onClick}
          textColor={textColor}
          borderRadius={'8px'}
        />
      </CardContent>
    </Card>
  );
};
