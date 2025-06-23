import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { screen, } from '@testing-library/react';
import { AddDiaryEntry } from './AddDiaryEntry';
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

describe('AddDiaryEntry Component', () => {
  it('Should render correctly', () => {
    const handleClickMock = vi.fn();

    customRender(<AddDiaryEntry handleClick={handleClickMock} />);

    expect(screen.getByTestId('add-diary-entry')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByText('registro')).toBeInTheDocument();
    expect(screen.getByText(/Finalizar/i)).toBeInTheDocument();
    expect(screen.getByText(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('Should not call handleClick if no text is provided', async () => {
    const handleClickMock = vi.fn();

    const { user } = customRender(<AddDiaryEntry handleClick={handleClickMock} />);
    const addButton = screen.getByRole('button');

    await user.click(addButton);

    expect(handleClickMock).not.toHaveBeenCalled();
  });

  it('Should call handleClick with input text', async () => {
    const handleClickMock = vi.fn();
    const { user } = customRender(<AddDiaryEntry handleClick={handleClickMock} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Fake test diary entry');

    const addButton = screen.getByRole('button');
    await user.click(addButton);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith('Fake test diary entry');
  });
});
