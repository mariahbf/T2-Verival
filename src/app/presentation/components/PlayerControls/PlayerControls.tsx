import { Stack } from "@mui/material";
import { PlayButton } from "../PlayButton";
import { ReplayButton } from "../ReplayButton";

interface IControlsProps {
    playing: boolean;
    onPlayClick: () => void;
    onReplayClick: () => void;
}

export const PlayerControls = ({ playing, onPlayClick, onReplayClick }: IControlsProps) => {
    return(
       <Stack width={'15rem'} direction="row" justifyContent="flex-end" alignItems="center" gap="2rem">
            <PlayButton playing={playing} handleClick={onPlayClick} />
            <ReplayButton handleClick={onReplayClick} />
        </Stack>
    )
};