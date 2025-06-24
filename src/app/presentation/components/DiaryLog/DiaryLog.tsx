import { Stack, Typography } from '@mui/material';
import { Accordion } from '../../components/Accordion';
import AddIcon from '@mui/icons-material/Add';
import { LargeFab } from './style';
import { GenericHeading } from '../../components';
import { IDiaryLogItem } from '../../pages';

export interface IDiaryLogProps {
  diaryEntries: IDiaryLogItem[];
  handleClick: () => void;
  hideAddButton?: boolean;
}

export const DiaryLog = ({ diaryEntries, handleClick, hideAddButton = false }: IDiaryLogProps) => {
  return (
    <Stack margin="1.5rem" gap="0.5rem" flex={1} overflow="hidden">
      <Stack flexDirection="row" gap="0.5rem">
        <GenericHeading text="Diário" themevariant="dark" />
        <GenericHeading text="de Bordo" themevariant="light" />
      </Stack>
      <Stack>
        <Typography variant="subtitle1" lineHeight="1rem">
          Descreva suas experiências e sentimentos utilizando a meditação.
        </Typography>
        <Typography variant="subtitle1">
          Clique no + para adicionar uma anotação.
        </Typography>
      </Stack>
      <Accordion diaryEntries={diaryEntries} />
      {!hideAddButton && <Stack position={'absolute'} bottom={'4rem'} right={'2rem'} data-testid="add-button">
        <LargeFab onClick={handleClick}>
          <AddIcon sx={{ fontSize: '3.5rem' }} />
        </LargeFab>
      </Stack>}
    </Stack>
  );
};
