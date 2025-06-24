import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import GenericAudioCard from './GenericAudioCard';
import { customRender } from 'tests/test-utils';

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

const createDummy = (overrides = {}) => ({
  weekNumber: 1,
  title: 'Default Title',
  currentDay: 1,
  isBlocked: false,
  handleClickMock: vi.fn(),
  ...overrides,
});

describe('GenericAudioCard Component', () => {
  it('Should render unblocked audio card', () => {
    const audioDummy = createDummy({
      isBlocked: false,
      title: 'Fake Audio Card',
    });

    const { screen } = customRender(<GenericAudioCard {...audioDummy} />);

    const audioCard = screen.getByRole('cell', {
      name: new RegExp(`semana ${audioDummy.weekNumber}`, 'i'),
    });
    expect(audioCard).toBeInTheDocument();
    expect(within(audioCard).getByText(audioDummy.title)).toBeInTheDocument();
    expect(
      within(audioCard).getByText(`${audioDummy.currentDay}/7 dias`),
    ).toBeInTheDocument();
    expect(within(audioCard).getByTestId('PlayCircleIcon')).toBeInTheDocument();
    expect(within(audioCard).queryByText(/Bloqueado/i)).not.toBeInTheDocument();
  });

  it('Should render blocked audio card', () => {
    const audioDummy = createDummy({
      isBlocked: true,
      weekNumber: 3,
      title: 'Fake Blocked Audio Card',
      currentDay: 6,
    });

    const { screen } = customRender(<GenericAudioCard {...audioDummy} />);

    const audioCard = screen.getByRole('cell', {
      name: new RegExp(`semana ${audioDummy.weekNumber}`, 'i'),
    });
    expect(audioCard).toBeInTheDocument();
    expect(within(audioCard).getByText(audioDummy.title)).toBeInTheDocument();
    expect(within(audioCard).getByText(/Bloqueado/i)).toBeInTheDocument();
    expect(
      within(audioCard).queryByTestId('PlayCircleIcon'),
    ).not.toBeInTheDocument();
  });

  it('Should call handleClick mock when clicked', async () => {
    const handleClickMock = vi.fn();
    const audioDummy = createDummy({
      isBlocked: false,
      onClick: handleClickMock,
    });

    const { user, screen } = customRender(<GenericAudioCard {...audioDummy} />);

    const audioCard = screen.getByRole('cell', {
      name: new RegExp(`semana ${audioDummy.weekNumber}`, 'i'),
    });
    await user.click(audioCard);

    expect(handleClickMock).toHaveBeenCalledOnce();
  });

  describe.each([
    [1, 'LooksOneIcon'],
    [2, 'LooksTwoIcon'],
    [3, 'Looks3Icon'],
    [4, 'Looks4Icon'],
    [5, 'Looks5Icon'],
    [6, 'Looks6Icon'],
    [7, 'LooksOneIcon'],
  ])(
    'Should render AudioCard with correct icon according to week number',
    (weekNumber, expectedIcon) => {
      it(`exibe o ícone ${expectedIcon}`, () => {
        const audio = createDummy({
          weekNumber,
          title: `Fake Audio Card for Week ${weekNumber}`,
          isBlocked: false,
        });

        const { screen } = customRender(<GenericAudioCard {...audio} />);

        const audioCard = screen.getByRole('cell', {
          name: new RegExp(`semana ${weekNumber}`, 'i'),
        });

        expect(audioCard).toBeInTheDocument();
        expect(within(audioCard).getByTestId(expectedIcon)).toBeInTheDocument();
      });
    },
  );
});
