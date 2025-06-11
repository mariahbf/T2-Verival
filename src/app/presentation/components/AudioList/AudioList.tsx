import React from 'react';
import GenericAudioCard from '../AudioCard/GenericAudioCard';
import { differenceInCalendarDays, parse, addWeeks, } from 'date-fns';
import { Stack } from '@mui/material';

interface AudioListProps {
  startDate: string;
  updateAudio: any;
  hasHospitalDischarge: boolean;
}

const AudioList: React.FC<AudioListProps> = ({ startDate, updateAudio, hasHospitalDischarge }) => {
  const initialDate = parse(startDate, 'dd/MM/yyyy', new Date());
  const today = new Date();

  const daysDifference = differenceInCalendarDays(today, initialDate);

  const currentWeek = Math.ceil(daysDifference / 7);

  const allWeeksUnlocked = currentWeek > 6 || hasHospitalDischarge;

  const getCurrentDayForWeek = (weekNumber: number): number => {
    const weekStartDate = addWeeks(initialDate, weekNumber - 1);

    if (allWeeksUnlocked) {
      return 7;
    } else if (weekNumber < currentWeek) {
      return 7;
    } else if (weekNumber === currentWeek) {
      const daysIntoWeek = differenceInCalendarDays(today, weekStartDate);
      const currentDay = daysIntoWeek + 1; 
      return Math.min(currentDay, 7);
    } else {
      return 0;
    }
  };

  const isWeekBlocked = (weekNumber: number): boolean => {
    if (allWeeksUnlocked) {
      return false;
    }
    return weekNumber !== currentWeek;
  };

  const weeksOrder: number[] = [];

  if (allWeeksUnlocked) {
    weeksOrder.push(1, 2, 3, 4, 5, 6);
  } else {
    weeksOrder.push(currentWeek);

    for (let i = currentWeek + 1; i <= 6; i++) {
      weeksOrder.push(i);
    }
    for (let i = 1; i < currentWeek; i++) {
      weeksOrder.push(i);
    }
  }

  const handleClick = (weekNumber: number) => {
    updateAudio(weekNumber);
  };

  return (
    <Stack spacing={2} sx={{ height: '100%', width: '100%' }} pb={8}>
      {weeksOrder.map((weekNumber) => 
        <GenericAudioCard
          key={weekNumber}
          weekNumber={weekNumber}
          title={isWeekBlocked(weekNumber) ? `O áudio da semana ${weekNumber} ainda não está disponível` : `Clique para ouvir o áudio da semana ${weekNumber}`}
          currentDay={getCurrentDayForWeek(weekNumber)}
          isBlocked={isWeekBlocked(weekNumber)}
          onClick={() => handleClick(weekNumber)}
        />)}
    </Stack>
  );
};

export default AudioList;
