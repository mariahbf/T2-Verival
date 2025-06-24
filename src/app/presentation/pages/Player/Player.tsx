import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import { AudioPlayer } from "../../components/AudioPlayer";
import { Lotus } from "../../components/Lotus";
import { useEffect, useState } from "react";
import { audios } from "@/app/data/audios";
import LotusBackground from '../../../../assets/Lotus_inverted.png';
import api from "@/app/api";
import { GenericCircleButton } from "../../components/CircleButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getLoggedUser, User } from "@/app/session";

export const Player = ({ week, updateAudio }: { week: number, updateAudio: any }) => {
    const [duration, setDuration] = useState(0);
    const [timeListened, setTimeListened] = useState(0);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const loggedUser = getLoggedUser();
      if (loggedUser) setUser(loggedUser);
    }, []);

    const postAudioListened = () => {
      if (!user || user.hospitalDischarge) return;

      const token = localStorage.getItem('access_token'); 
      const audioListened = {
        timeListened: timeListened / 60,
        listenedAt: new Date(),
        week
      }
      api.post(`/audios`, audioListened, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
    }

    const handleBackButton = () => {
      if (timeListened) postAudioListened();
      updateAudio(null);
    }

    return (
        <Stack gap="1rem" height="100vh" position="relative">
            <Stack
              position='absolute'
              top='2rem'
              left='1rem'
              zIndex={2}
            >
              <GenericCircleButton
                icon={<ArrowBackIcon />}
                onClick={handleBackButton}
              />
            </Stack>
            <Lotus/>
            <Stack marginLeft="1.5rem">
                <Typography variant="h1">
                     Semana {week}
                </Typography>
                <Typography variant="subtitle2">
                       Música de fundo: 'Sad Piano Ambient Music' por BreakingCopyright — Royalty Free Music.
                </Typography>
            </Stack>
            <AudioPlayer url={audios[week]} timeListened={timeListened} setTimeListened={setTimeListened} duration={duration} setDuration={setDuration} postRequest={postAudioListened} />
            <Box
                component="img"
                src={LotusBackground.src}
                alt="Lotus Background"
                sx={{
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    objectFit: 'cover',
                }}
            />
        </Stack>
    );
}
