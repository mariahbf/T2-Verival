
import Select from '@mui/material/Select';
import styled from '@emotion/styled';
import theme from '@/theme/theme';

export const StyledDropDown= styled(Select)<{ }>(({ }) => ({
backgroundColor: theme.palette.primary[100], 
borderRadius: '4px 4px 0 0', 
color: theme.palette.neutrals[500]
}));