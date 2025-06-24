import React from 'react';
import { logout, User } from '@/app/session';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { InfoCard } from '@/app/presentation/components/InfoCard';
import { useRouter } from 'next/navigation';
import AudioList from '@/app/presentation/components/AudioList/AudioList';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import theme from '@/theme/theme';
import { Lotus } from '@/app/presentation/components/Lotus/Lotus';
import { GenericSubHeading } from '../../components';
import { getLoggedUser } from '@/app/session';
import { useMediaQuery } from '@mui/material';
import { Player } from '../Player';
import CustomBottomNavigation from '../../components/BottomNavigation/BottomNavigation';

const calculateDaysDifference = (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(
    Math.abs((endDate.getTime() - startDate.getTime()) / oneDay),
  );
};

const calculateProgress = (createdAt: Date) => {
  const today = new Date();
  const daysDifference = calculateDaysDifference(createdAt, today);
  const weeks = daysDifference / 7;
  const percentage = (weeks / 6) * 100;
  return Math.min(percentage, 100);
};

export const Home = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery('(max-height:768px)');

  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
      const progressValue = loggedUser?.hospitalDischarge ? 100 : calculateProgress(new Date(loggedUser.createdAt));
      setProgress(progressValue);
    }
  }, []);

  const LogoutClick = () => {
    logout();
    router.push('/login');
  };

  const InfoCardClick = () => {
    router.push('/introducao');
  };

  if (!user) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    selectedAudio 
    ? <>
      
      <Player week={selectedAudio} updateAudio={setSelectedAudio} />
    </>
    :
    <Stack>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            width: '100%',
            maxWidth: '450px',
            zIndex: -1
          }}
        >
          <Lotus />
        </Stack>
        <Stack sx={{ marginTop: '1.5625rem', marginLeft: '0.5rem' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              marginRight: '0',
              top: '-1rem',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={60}
              sx={{
                color: '##F6CBC0',
                position: 'absolute',
                marginTop: '1.5625rem',
                marginLeft: '0.5rem',
              }}
            />
            <CircularProgress
              variant="determinate"
              value={progress}
              size={60}
              sx={{
                color: '#5E0F17',
                marginTop: '1.5625rem',
                marginLeft: '0.5rem',
              }}
            />
            <Typography
              sx={{
                color: 'theme.pallete.secondary[1000]',
                fontWeight: '600 ',
                fontSize: progress === 100 ? '1rem ' : '1.2rem',
              }}
              mt={5.3}
              ml={-6}
            >
              {progress > 0 ? `${Math.round(progress)}%` : null}
            </Typography>
          </Box>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            marginTop: '1.8rem',
            margin: '1.8rem 0 0 1rem',
          }}
          spacing={-1}
        >
          <GenericSubHeading text={`Olá, ${user.name}`} themevariant={'dark'} fontSize={isSmallScreen ? '1.1rem' : '1.2rem'}/>

          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: isSmallScreen ? '1.5rem' : '1.7rem',
              color: theme.palette.secondary[1000],
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Bem-vinda de volta!
          </Typography>
        </Stack>
        <button
          data-testid="logout-button"
          style={{
            maxHeight: "40px",
            marginTop: "30px",
            backgroundColor: 'transparent',
            border: '0.125rem solid transparent',
            cursor: 'pointer',
          }}
          onClick={LogoutClick}
        >
          <LogoutIcon
            sx={{
              height: '2rem',
              width: '2rem',
              marginRight: '1rem',
              color: '#5E0F17',
            }}
          />
        </button>
      </Stack>
      <Stack spacing={2} sx={{ width: '90%', margin: 'auto' }}>
        <Divider style={{ color: theme.palette.neutrals[500] }} />

        <InfoCard
          title="Introdução do App"
          description="Está com dúvidas sobre como funciona o aplicativo? Reveja a introdução."
          backgroundColor={theme.palette.secondary[1000]}
          titleColor={theme.palette.secondary[300]}
          descriptionColor={theme.palette.neutrals.baseWhite}
          buttonColor="light"
          textColor={theme.palette.secondary[1000]}
          onClick={InfoCardClick}
          buttonText="Ver Introdução"
        />

        <Divider style={{ color: theme.palette.neutrals[500] }} />
        <AudioList startDate={new Date(user.createdAt).toLocaleDateString()} updateAudio={setSelectedAudio} hasHospitalDischarge={user.hospitalDischarge || false} />
      </Stack>
      <CustomBottomNavigation />
    </Stack>
  );
};
