import theme from '@/theme/theme';
import {Button, styled} from '@mui/material';

export const StyledCircleButton = styled(Button)<{ }>(({  }) => ({
    minWidth: 'auto',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary[1000],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }
));