import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import './AdminLogin.css';
import { GenericButton, GenericTextField } from '../../components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import theme from '@/theme/theme';
import api from '../../../api';
import BreastfeedingMom from '@/assets/BreastfeedingMom.svg';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState({ email: '', senha: '' });
  const [isLoading, setIsLoading] = useState(false);

  const postLogin = async (data: { email: string; password: string }) => {
    return await api.post('/auth/login', data);
  };

  const validation = () => {
    let msg = { email: '', senha: '' };
    let retorno = true;

    if (email === '') {
      msg.email =
        'Email não pode ser vazio. Por favor, insira um email válido.';
      retorno = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      msg.email = 'Email inválido. Por favor, insira um email válido.';
      retorno = false;
    }

    if (senha === '') {
      msg.senha =
        'Senha não pode ser vazia. Por favor, insira uma senha válida.';
      retorno = false;
    }

    setError(msg);
    return retorno;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setError({ email: '', senha: '' });

    if (!validation()) {
      setIsLoading(false);
      return;
    }

    try {
      const loginResponse = await postLogin({ email, password: senha });
      const { accessToken, refreshToken, expiresIn } = loginResponse.data;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('expires_in', expiresIn.toString());

      window.location.href = '/dashboard';
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message == 'Request failed with status code 400'
      ) {
        setError({ email: '', senha: 'Credenciais inválidas' });
      } else {
        setError({ email: '', senha: 'Um erro desconhecido ocorreu.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (     
        <Stack alignItems="center" justifyContent="center" width={'100vw'} height={'100vh'} gap="2rem">
          <Stack className="LogoTitulo">
            <Image className="imagem" src={BreastfeedingMom} alt={''}></Image>
            <Typography className="titulo">meditAMAmente</Typography>
          </Stack>
          <Stack
            sx={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '2rem',            
              width: 'auto',
              height: 'auto',
              alignItems: 'center',
              gap: '1.3rem',
            }}
          >
            <h1 className="containerTitulo">Seja bem-vindo!</h1>

            <div className="adminLoginFields">
              <label className="inputTitulo" htmlFor="nome">
                Endereço de Email *
              </label>
              <GenericTextField
                label="Insira seu email"
                themevariant={'light'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width={'100%'}
                helperText={error.email}
                error={!!error.email}
                helperTextStyles={{ color: theme.palette.error[200] }}
              />
            </div>

            <div className="adminLoginFields">
              <label className="inputTitulo" htmlFor="nome">
                Senha *
              </label>
              <GenericTextField
                label="Insira sua senha"
                themevariant={'light'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                width={'100%'}
                type="password"
                helperText={error.senha}
                error={!!error.senha}
                helperTextStyles={{ color: theme.palette.error[200] }}
              />
            </div>

            <GenericButton
              text="Entrar"
              themevariant="dark"
              icon={<ArrowForwardIcon />}
              width={'46.625rem'}
              height={'3rem'}
              onClick={onSubmit}
            />
          </Stack>
        </Stack>
  );
};
