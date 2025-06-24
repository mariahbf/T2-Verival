import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import BottomNavigation from './BottomNavigation';
import { vi } from 'vitest';

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

describe('CustomBottomNavigation', () => {
  it('deve renderizar os três botões de navegação', () => {
    customRender(<BottomNavigation />);

    expect(screen.getByRole('link', { name: /infos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /meditação/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /diário/i })).toBeInTheDocument();
  });

  it('deve alterar o valor de seleção ao clicar nos botões', async () => {
    const { user } = customRender(<BottomNavigation />);

    const infosButton = screen.getByRole('link', { name: /infos/i });
    const diarioButton = screen.getByRole('link', { name: /diário/i });

    await user.click(infosButton);
    expect(infosButton).toHaveClass('Mui-selected');

    await user.click(diarioButton);
    expect(diarioButton).toHaveClass('Mui-selected');
  });

  it('deve conter os links corretos em cada botão', () => {
    customRender(<BottomNavigation />);

    expect(screen.getByRole('link', { name: /infos/i })).toHaveAttribute('href', '/informacoes');
    expect(screen.getByRole('link', { name: /meditação/i })).toHaveAttribute('href', '/home');
    expect(screen.getByRole('link', { name: /diário/i })).toHaveAttribute('href', '/diario');
  });
});
