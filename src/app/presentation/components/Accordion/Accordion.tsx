import { Divider, Stack } from '@mui/material';
import { AccordionItem } from '../AccordionItem';
import { IDiaryLogItem } from '../../pages';

export interface IAccordionProps {
  diaryEntries: IDiaryLogItem[];
}

function formateDate(date: Date) {
  date.setHours(date.getHours() - 3);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const hora = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');

  return `${dia}/${mes} - ${hora}h${minutos}`;
}

export const Accordion = ({ diaryEntries }: IAccordionProps) => {
  return (
    <Stack overflow="auto" borderRadius={'1rem'} marginBottom={'1.5rem'}>
      {diaryEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry, index) => {
        const isLast = index === diaryEntries.length - 1;
        return (
          <Stack key={index}>
            <AccordionItem title={formateDate(new Date(entry.date))} content={entry.text} isLast={isLast} />
            {!isLast && <Divider />}
          </Stack>
        );
      })}
    </Stack>
  );
};
