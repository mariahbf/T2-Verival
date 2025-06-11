import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import React from "react";
import { StyledButton } from "./style";

export interface IPlayButtonProps {
    handleClick?: () => void;
    playing: boolean;
}

export const PlayButton = ({handleClick, playing}:IPlayButtonProps) => {    
    return(
        <StyledButton onClick={handleClick}>
            {playing?<PauseIcon sx={{color: 'white', height:'2rem'}}/>
            :<PlayArrowIcon sx={{color: 'white', height:'2rem'}}/>}
        </StyledButton>
    )
};

