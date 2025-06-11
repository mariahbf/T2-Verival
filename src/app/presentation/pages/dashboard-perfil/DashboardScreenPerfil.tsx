import React, { useEffect, useState } from 'react';
import { Stack, Box, Link } from '@mui/material';
import { PerfilDataGrid } from '@/app/presentation/components/CustomDataGridPerfil/CustomDataGridPerfil';
import api from '@/app/api';
import { GenericHeading } from '../../components/Heading/GenericHeading';

interface AudioData {
  id: number;
  listenedAt: string;
  timeListened: number;
  userId: number;
  week: number;
}

interface UsersData {
  id: number;
  username: string;
}

interface PerfilDataGridRow {
  dia: string;
  semana: number;
  tempoOuvido: number;
  audioCompleto: boolean;
  horario: string;
}

interface Props {
  userId: number;
}

export const DashboardScreenPerfil: React.FC<Props> = ({ userId }) => {
  const [audiosData, setAudiosData] = useState<AudioData[]>([]);
  const [usersData, setUsersData] = useState<UsersData | null>(null); 

  const fetchAudios = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await api.get(`/audios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAudiosData(response.data);
    } catch (error) {
      console.error('Erro ao buscar áudios:', error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, [userId]);

  const fetchUsers = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsersData(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };  

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  const handleVerPerfilClick = () => {
    window.location.href = `/dashboard/perfil/${userId}`;
  };

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="flex-start"
      alignItems="center"
      gap="2rem"
      overflow="hidden"
      padding="2rem"
    >
      <Box width="100%">
        {usersData && (
          <GenericHeading
            text={usersData.username}
            themevariant="dark"
          />
        )}
        
        <Link
          component="button"
          onClick={handleVerPerfilClick}
          sx={{
            color: '#5e0f17',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'block',
          }}
        >
          Ver Perfil &gt;
        </Link>
      </Box>

      <PerfilDataGrid
        data={audiosData.map((x: AudioData) => {
          const dateObj = new Date(x.listenedAt);
          const dia = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
            dateObj.getMonth() + 1
          ).padStart(2, '0')}/${dateObj.getFullYear()}`;
          const horario = dateObj.toTimeString().split(' ')[0];

          return {
            dia: dia,
            semana: x.week,
            tempoOuvido: x.timeListened,
            horario: horario,
          } as PerfilDataGridRow;
        })}
      />
    </Stack>
  );
};
