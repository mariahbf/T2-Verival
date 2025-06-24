import React from 'react';
import { vi } from 'vitest';
import { customRender } from '../../../../../tests/test-utils';
import { screen } from '@testing-library/react';
import { DiaryLog } from './DiaryLog';
import { IDiaryLogItem } from '../../pages';

const mockEntries: IDiaryLogItem[] = [
  {
    date: '2025-06-01',
    text: 'Primeira meditação do dia.',
  },
  {
    date: '2025-06-02',
    text: 'Reflexão sobre o sono.',
  },
];

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

describe('DiaryLog component', () => {
  it('Should render DiaryLog component', () => {
    const handleClickMock = vi.fn();

    customRender(<DiaryLog diaryEntries={mockEntries} handleClick={handleClickMock} />);

    expect(screen.getByText(/diário/i)).toBeInTheDocument();
    expect(screen.getByText(/de bordo/i)).toBeInTheDocument();
    expect(screen.getByText(/descreva suas experiências/i)).toBeInTheDocument();
    expect(screen.getByText(/clique no \+ para adicionar/i)).toBeInTheDocument();

    expect(screen.getByText(/primeira meditação do dia/i)).toBeInTheDocument();
    expect(screen.getByText(/reflexão sobre o sono/i)).toBeInTheDocument();
  });

  it('Should not render add button if hideAddButton property is true', () => {
    const handleClickMock = vi.fn();
    customRender(
      <DiaryLog diaryEntries={mockEntries} handleClick={handleClickMock} hideAddButton />
    );

    expect(screen.queryByTestId('add-button')).not.toBeInTheDocument();
  });
});
