import React from 'react';
import { Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { LargeFab } from './style';
import { GenericHeading } from '../../components';
import { LargeTextField } from '../LargeTextField/LargeTextField';
import { useState } from 'react';

export interface IAddDiaryEntryProps {
  handleClick: (text: string) => void;
}

function formateDate(date: Date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear()).padStart(4, '0');
  const hora = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano}, ${hora}:${minutos}`;
}

export const AddDiaryEntry = ({ handleClick }: IAddDiaryEntryProps) => {
  const [text, setText] = useState<string>(); 

  return (
    <Stack margin="1.5rem" gap="0.5rem" overflow={'hidden'} data-testid="add-diary-entry">
      <Stack flexDirection="row" gap="0.5rem">
        <GenericHeading text="Novo " themevariant="dark" />
        <GenericHeading text="registro" themevariant="light" />
      </Stack>
      <Stack>
        <Typography variant="subtitle1" lineHeight="1rem">
          {formateDate(new Date())}
        </Typography>
      </Stack>
      <LargeTextField onChange={(x: string) => setText(x)} />
      <Stack
        flexDirection={'row'}
        position={'absolute'}
        bottom={'4rem'}
        right={'2rem'}
        alignItems={'center'}
        gap={'0.8rem'}
      >
        <Typography variant="h4">Finalizar</Typography>
        <LargeFab
          onClick={() => { if (!text) return; handleClick(text) }}
          style={{ backgroundColor: '#E29898', color: '#5A1A1A' }}
        >
          <TaskAltIcon sx={{ fontSize: '3.5rem' }} />
        </LargeFab>
      </Stack>
    </Stack>
  );
};
