import { jwtDecode } from 'jwt-decode';
import api from './api';

interface DecodedToken {
  email: string;
  sub: string;
  role: string;
  createdAt: Date;
  iat: number;
  exp: number;
  userID?: string;
  hospitalDischarge?: boolean;
}

export interface User {
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  userID?: string;
  hospitalDischarge?: boolean;
}

export function getLoggedUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('access_token');
  if (!token) {
    return null;
  }

  try {
    const { email, sub, role, createdAt, userID, hospitalDischarge } = jwtDecode<DecodedToken>(token);
    return { email, name: sub, role, createdAt, userID, hospitalDischarge };
  } catch (error) {
    console.error('Token inválido ou expirado', error);
    return null;
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
      },
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    window.location.href = window.location.href.includes('/dashboard') ? '/dashboard/login' : '/login';
  } catch (error) {
    console.error('Erro durante o logout:', error);
  }
}

