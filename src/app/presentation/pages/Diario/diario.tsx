import { Stack } from '@mui/material';
import { Lotus } from '../../components';
import { GenericCircleButton } from '../../components/CircleButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DiaryLog } from '../../components/DiaryLog';
import { AddDiaryEntry } from '../../components/AddDiaryEntry';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDiaryEntry, getDiaries } from '@/app/api';
import { Loading } from '../../components/loading';

export interface IDiaryLogItem {
  date: string;
  text: string;
}

export interface IDiaryLogResponse {
  date: Date;
  text: string;
  userId: number;
  id: number;
}

export const Diario = () => {
  const router = useRouter();
  const [screen, setScreen] = React.useState<'DiaryLog' | 'AddDiaryEntry'>('DiaryLog');
  const handleBackButtonClick = () => screen == 'AddDiaryEntry' ? setScreen('DiaryLog') : router.push('/home');
  const handleDiaryLogClick = () => setScreen('AddDiaryEntry');
  const [diaryEntries, setDiaryEntries] = useState<IDiaryLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddDiaryEntryClick = async (text: string) => {
    await createDiaryEntry(text);
    setLoading(true);
    await fetchDiaries();
    setScreen('DiaryLog');
  };

  const fetchDiaries = async () => {
    try {
      const data = await getDiaries();
      setDiaryEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar os diários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  if (loading) return <Loading />;

  return (
    <Stack height="100vh" position="relative">
      <Stack position="absolute" top="2rem" left="1rem" zIndex={2}>
        <GenericCircleButton icon={<ArrowBackIcon />} onClick={handleBackButtonClick} />
      </Stack>
      <Lotus />
      {screen === 'DiaryLog' ? (
        <DiaryLog diaryEntries={diaryEntries} handleClick={handleDiaryLogClick} />
      ) : (
        <AddDiaryEntry handleClick={handleAddDiaryEntryClick} />
      )}
    </Stack>
  );
};
