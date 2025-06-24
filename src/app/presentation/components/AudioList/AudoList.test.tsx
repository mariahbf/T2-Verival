import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import AudioList from './AudioList';

vi.mock('../AudioCard/GenericAudioCard', () => ({
  __esModule: true,
  default: ({ title, onClick, weekNumber }: any) => (
    <div data-testid={`card-week-${weekNumber}`} onClick={onClick}>
      <span>{title}</span>
    </div>
  ),
}));

vi.mock('next/font/google', () => ({
  Poppins: vi.fn(() => ({
    style: {
      fontFamily: 'Poppins, sans-serif',
    },
  })),
  Hind: vi.fn(() => ({
    style: {
      fontFamily: 'Hind, sans-serif',
    },
  })),
  Inter: vi.fn(() => ({
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  })),
}));

describe('AudioList', () => {
  const makeStartDate = (weeksAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (weeksAgo * 7));
    return date.toLocaleDateString('pt-BR');
  };

  it('should call updateAudio when clicked', async () => {
    const updateAudioMock = vi.fn();
    const startDate = makeStartDate(1);

    const { user } = customRender(
      <AudioList
        startDate={startDate}
        updateAudio={updateAudioMock}
        hasHospitalDischarge={false}
      />
    );

    const card = screen.getByTestId('card-week-2');
    await user.click(card);

    expect(updateAudioMock).toHaveBeenCalledWith(2);
    expect(updateAudioMock).toHaveBeenCalledTimes(1);
  });

  it('should unblock all weeks when hospital dischard is true', () => {
    const updateAudioMock = vi.fn();
    const startDate = makeStartDate(1);

    customRender(
      <AudioList
        startDate={startDate}
        updateAudio={updateAudioMock}
        hasHospitalDischarge={true}
      />
    );

    for (let week = 1; week <= 6; week++) {
      const card = screen.getByTestId(`card-week-${week}`);
      expect(card).toBeInTheDocument();
      expect(screen.getByText(`Clique para ouvir o áudio da semana ${week}`)).toBeInTheDocument();
    }
  });
});
