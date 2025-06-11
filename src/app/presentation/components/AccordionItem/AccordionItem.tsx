import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { CustomAccordionDetails } from './style';

export interface IAccordionItemProps {
  title: string;
  content: string;
  isLast: boolean;
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={
      <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
    }
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.neutrals.baseWhite,
  flexDirection: 'row',
  paddingRight: theme.spacing(10),
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

export const AccordionItem = ({
  title,
  content,
  isLast,
}: IAccordionItemProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const theme = useTheme();
  const handleChange = () => setExpanded(!expanded);

  return (
    <Stack
      sx={{
        borderTop: `0.8rem solid ${theme.palette.neutrals.baseWhite}`,
        borderBottom: `0.6rem solid ${theme.palette.neutrals.baseWhite}`,
        marginBottom: isLast ? '1.5rem' : 'none',
        borderBottomLeftRadius: isLast ? '1rem' : 'none',
        borderBottomRightRadius: isLast ? '1rem' : 'none',
      }}
    >
      <MuiAccordion
        disableGutters
        elevation={0}
        square
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary>
          <Typography
            variant="subtitle1"
            color={theme.palette.neutrals.baseBlack}
            fontSize={'1.1rem'}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <Typography
            variant="h4"
            fontSize={'1rem'}
            color={theme.palette.neutrals.baseBlack}
          >
            {' '}
            {content}{' '}
          </Typography>
        </CustomAccordionDetails>
      </MuiAccordion>
    </Stack>
  );
};
