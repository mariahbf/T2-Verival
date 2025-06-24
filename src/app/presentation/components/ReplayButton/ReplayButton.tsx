import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { StyledButton } from "./style";

export interface IReplayButtonProps {
    handleClick: () => void;
}

export const ReplayButton = ({handleClick}:IReplayButtonProps) => {
    
    return( 
        <StyledButton aria-label="repetir-button" onClick={handleClick}>{<ReplayIcon sx={{color:'white'}}/>}</StyledButton>
    )
}