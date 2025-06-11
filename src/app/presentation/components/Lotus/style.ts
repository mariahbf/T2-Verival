import { Box, styled } from '@mui/material';
import lotus from '../../../../assets/lotus.png';

export const StyledBox = styled(Box)({
  position: 'absolute',
  zIndex: -1,
  backgroundImage: `url(${lotus.src})`,
  backgroundSize: '25rem',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  height: '16rem',
  width: '100%',
});
