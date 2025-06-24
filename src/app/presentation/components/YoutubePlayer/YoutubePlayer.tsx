import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import React from 'react';

export interface IYouTubePlayerProps {
    playing: boolean;
    videoUrl?: string;
    setPlayed: (prog: number) => void;
    setDuration: (duration: number) => void;
}

export const YouTubePlayer = ({ playing, videoUrl, setPlayed, setDuration }: IYouTubePlayerProps) => {
    const [isClient, setIsClient] = useState(false); //avoid hydration failed error

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Stack position="absolute" zIndex={1}>
            {isClient && (
                <ReactPlayer
                    width="5rem"
                    height="5rem"
                    url={videoUrl}
                    playing={playing}
                    onProgress={(progress) => setPlayed(Math.ceil(progress.playedSeconds))}
                    onDuration={(duration) => setDuration(duration)}
                />
            )}
        </Stack>
    );
};
``
