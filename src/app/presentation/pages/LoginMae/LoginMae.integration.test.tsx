import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { LoginMae } from './LoginMae';
import { vi, afterEach, beforeAll, afterAll, describe, it, expect } from 'vitest';
import * as apiModule from '../../../api';
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

const originalLocation = window.location;

beforeAll(() => {
  // Mock window.location.href with a mutable value
  delete (window as any).location;
  (window as any).location = { href: '' };
});

afterAll(() => {
  // Restore original window.location.href
  (window as any).location.href = originalLocation.href;
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('LoginMae Integration test', () => {
  it('shows error messages if fields are empty', async () => {
    const {user, screen} = customRender(<LoginMae />);
    const button = screen.getByRole('button', { name: /entrar/i });
    await user.click(button);

    expect(await screen.findByText(/email não pode ser vazio/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha não pode ser vazia/i)).toBeInTheDocument();
  });

  it('logs in and redirects to /introducao if it is the first login', async () => {
    vi.spyOn(apiModule.default, 'post').mockResolvedValueOnce({
      data: {
        accessToken: '123',
        refreshToken: '456',
        expiresIn: 3600,
      },
    });

    const {user, screen} = customRender(<LoginMae />);
    await user.type(screen.getByLabelText(/email/i), 'sandra@email.com');
    await user.type(screen.getByLabelText(/insira sua senha/i), 'senha456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(localStorage.getItem('access_token')).toBe('123');
      expect(window.location.href).toBe('/introducao');
    });
  });

  it('logs in and redirects to /home if it is not the first login', async () => {
    vi.spyOn(apiModule.default, 'post').mockResolvedValueOnce({
      data: {
        accessToken: '123',
        refreshToken: '456',
        expiresIn: 3600,
      },
    });

    localStorage.setItem('last_login', new Date().toString());

    const {user, screen} = customRender(<LoginMae />);
    await user.type(screen.getByLabelText(/email/i), 'sandra@email.com');
    await user.type(screen.getByLabelText(/insira sua senha/i), 'senha456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('/home');
    });
  });

  it('shows an error if API returns status 400', async () => {
    vi.spyOn(apiModule.default, 'post').mockRejectedValueOnce(
      new Error('Request failed with status code 400')
    );

    const {user, screen} = customRender(<LoginMae />);
    await user.type(screen.getByLabelText(/email/i), 'sandra@email.com');
    await user.type(screen.getByLabelText(/insira sua senha/i), 'wronginsira sua senha');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });
});
