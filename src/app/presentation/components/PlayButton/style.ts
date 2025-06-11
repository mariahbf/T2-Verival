import { IconButton, styled } from "@mui/material";

export const StyledButton = styled(IconButton)(({ theme }) => ({
    width: '5rem',
    height: '5rem',
    background: theme.palette.secondary[1000], 
    '&:hover': {
        background: '#481117',
    }
}));
