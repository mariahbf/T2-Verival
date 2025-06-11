import { Stack, Avatar, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { YouTubePlayer } from "../YoutubePlayer";
import { ProgressBar } from "../ProgressBar";
import audioIcon from "../../../../assets/audioIcon.jpg";
import { PlayerControls } from "../PlayerControls";

export interface IAudioPlayerProps {
    url: string;
    timeListened: number;
    setTimeListened: (time: number) => void;
    duration: number;
    setDuration: (duration: number) => void;
    postRequest: () => void;
}

export const AudioPlayer = ({ url, timeListened, setTimeListened, duration, setDuration, postRequest}: IAudioPlayerProps) => {
    const [playing, setPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState(url);
    const theme = useTheme();

    const handlePlayClick = () => setPlaying((prev) => !prev);

    const handleReplayClick = () => {
        setVideoUrl(prevUrl => prevUrl === url ? `${url}/` : url);
        setPlaying(true);
        postRequest();
    }

    useEffect(() => {
        setVideoUrl(url);
    }, [url]);

    return (
        <Stack width="100%" alignItems="center" gap="2rem">
            <Stack
                zIndex="2"
                alignItems="center"
                width="100%"
                gap="2rem"
                sx={{ backgroundColor: theme.palette.primary[200], padding: '1rem' }}
            >
                <Avatar alt="Audio Icon" src={audioIcon.src} sx={{ width: '20rem', height: 'auto' }} />
                <PlayerControls playing={playing} onPlayClick={handlePlayClick} onReplayClick={handleReplayClick} />
            </Stack>
            <YouTubePlayer videoUrl={videoUrl} playing={playing} setPlayed={setTimeListened} setDuration={setDuration} />
            <ProgressBar timeListened={timeListened} duration={duration} />
        </Stack>
    );
};