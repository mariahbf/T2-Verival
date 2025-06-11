import { IconButton, styled } from "@mui/material";

export const StyledButton = styled(IconButton)(({ theme }) => ({
    width:'3rem', 
    height:'3rem', 
    background: theme.palette.secondary[1000],
     '&:hover': {
         background: '#481117',
     }
 }));