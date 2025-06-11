import { styled } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';

export const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: theme.palette.neutrals.baseWhite,
}));
