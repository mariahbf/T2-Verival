import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('Refresh token não encontrado');
  }

  try {
    const response = await api.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem('access_token', accessToken);
    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }
  } catch (error) {
    console.error(error);
    window.location.href = '/';
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    const message = error.response?.data;

    // if (status === 401 && message === 'Token expirado') {
    //   await refreshToken();
    //   const originalRequest = error.config;
    //   return api(originalRequest);
    // }

    const token = localStorage.getItem('access_token');
    if (status == 401 && token) {
      window.location.href = window.location.href.includes('/dashboard') ? '/dashboard/login' : '/login';
    }

    return Promise.reject(error);
  }
);

export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: string;
  gestationalAge: boolean;
  role: number;
}) {
  try {
    const token = localStorage.getItem('access_token'); 
    const response = await api.post('/users', userData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

export async function getDiaries() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await api.get(
      '/diaries',
       {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar diários:', error);
    throw error;
  }
}

export async function createDiaryEntry(text: string) {
  try {
    const token = localStorage.getItem('access_token');
    const formattedDate = new Date().toISOString(); 

    const response = await api.post(
      '/diaries',
      {
        date: formattedDate, 
        text: text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar entrada de diário:', error);
    throw error;
  }
}

export default api;
