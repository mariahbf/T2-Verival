import React, { useEffect, useState } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Stack, Typography, useTheme } from '@mui/material';

export interface IProgressBarProps {
    timeListened: number;
    duration: number;
}

export const ProgressBar = (props: LinearProgressProps & IProgressBarProps) => {
    const { timeListened, duration, ...linearProgressProps } = props;
    const theme = useTheme();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (duration > 0) {
            const calculatedProgress = (timeListened / duration) * 100;
            setProgress(calculatedProgress);
        }
    }, [timeListened, duration]);

    return (
        <Stack gap={'0.5rem'} width={'20rem'} color={theme.palette.secondary[1000]}>
            <LinearProgress variant="determinate" value={progress} color='inherit' {...linearProgressProps} />
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Typography data-testid="time-listened" variant='subtitle2'>{formatTime(timeListened || 0)}</Typography>
                <Typography variant="subtitle2">{formatTime(duration || 0)}</Typography>
            </Stack>
        </Stack>
    );
};

const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
};
