import React from 'react';
import { customRender } from "../../test-utils";
import { vi } from 'vitest';
import { act } from '@testing-library/react';
import { Introducao } from '../../../src/app/presentation/pages/Introducao';

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


vi.mock('react-player', () => {
  return {
    default: () => <div>Mocked React Player</div>,
  };
});

describe('Introducao', () => {
  it('should render Introduction screen', async () => {
    const { screen } = customRender(<Introducao />);

    expect(screen.getByText(/como/i)).toBeInTheDocument();
    expect(screen.getByText(/funciona/i)).toBeInTheDocument();
    expect(screen.getByText(/veja as etapas principais para começar a usar o app/i)).toBeInTheDocument();
    expect(screen.getByTestId('custom-carousel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar/i })).toBeInTheDocument();
  });

  it('should enable "finalizar" button after navigating through all slides', async () => {
    const { user, screen } = customRender(<Introducao />);

    const finalizarButton = screen.getByRole('button', { name: /finalizar/i });
    expect(finalizarButton).toBeDisabled();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /next slide/i }));
    });

    expect(finalizarButton).toBeDisabled();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /next slide/i }));
    });

    expect(finalizarButton).toBeEnabled();
    
  });
});
