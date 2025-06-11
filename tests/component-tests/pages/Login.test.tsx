import React from 'react';
import { customRender } from '../../test-utils';
import { vi } from 'vitest';
import { LoginMae } from '../../../src/app/presentation/pages/LoginMae/LoginMae';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../src/theme/theme';

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

describe('LoginMae', () => {
  it('should render LoginMae screen', async () => {
    const { screen } = customRender(
      <ThemeProvider theme={theme}>
        <LoginMae />
      </ThemeProvider>
    );

    expect(screen.getByText(/acalme sua mente/i)).toBeInTheDocument();
    expect(screen.getByText(/nutra/i)).toBeInTheDocument();
    expect(screen.getAllByText(/seu/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/amor/i)).toBeInTheDocument();
    expect(
      screen.getByText(/faça login para acessar suas meditações personalizadas/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /insira seu email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/insira sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should display error message when email or password is empty', async () => {
    const { user, screen } = customRender(
      <ThemeProvider theme={theme}>
        <LoginMae />
      </ThemeProvider>
    );
    await user.clear(screen.getByLabelText(/insira seu email/i));
    await user.clear(screen.getByLabelText(/insira sua senha/i));
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findByText(/email não pode ser vazio/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha não pode ser vazia/i)).toBeInTheDocument();
  });

  it('should display error message for invalid email', async () => {
    const { user, screen } = customRender(
      <ThemeProvider theme={theme}>
        <LoginMae />
      </ThemeProvider>
    );

    await user.type(screen.getByLabelText(/insira seu email/i), 'fake-email@');
    await user.type(screen.getByLabelText(/insira sua senha/i), '123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
  });
});
