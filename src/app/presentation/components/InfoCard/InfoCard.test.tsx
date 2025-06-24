import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { customRender } from '../../../../../tests/test-utils';
import { InfoCard } from './InfoCard';

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

describe('InfoCard', () => {
  const props = {
    title: 'Título de Exemplo',
    description: 'Descrição de teste do componente.',
    backgroundColor: '#fff1e6',
    titleColor: '#333333',
    descriptionColor: '#666666',
    buttonColor: 'dark' as const,
  };

  it('should render InfoCard component', () => {
    customRender(<InfoCard {...props} />);

    expect(screen.getByText(/título de exemplo/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição de teste do componente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver mais/i })).toBeInTheDocument();
  });

  it('should render custom text button', () => {
    customRender(<InfoCard {...props} buttonText="Saiba mais" />);

    expect(screen.getByRole('button', { name: /saiba mais/i })).toBeInTheDocument();
  });

  it('should call handleClick when button is clicked', async () => {
    const handleClick = vi.fn();
    const { user } = customRender(<InfoCard {...props} onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: /ver mais/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
