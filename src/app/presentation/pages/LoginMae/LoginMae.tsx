import React from 'react';
import { useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GenericButton, GenericTextField } from '../../components';
import { Lotus } from '../../components/Lotus/Lotus';
import { GenericHeading } from '../../components/Heading/GenericHeading';
import theme from '../../../../theme/theme';
import api from '../../../api'; 

export const LoginMae = () => {
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
      msg.email = 'Email não pode ser vazio. Por favor, insira um email válido.';
      retorno = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      msg.email = 'Email inválido. Por favor, insira um email válido.';
      retorno = false;
    }

    if (senha === '') {
      msg.senha = 'Senha não pode ser vazia. Por favor, insira uma senha válida.';
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

      const isFirstLogin = !localStorage.getItem('last_login');
      if (isFirstLogin) {
        window.location.href = '/introducao';
        localStorage.setItem('last_login', new Date().toString());
      } else {
        window.location.href = '/home';
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message == 'Request failed with status code 400') {
        setError({ email: '', senha: 'Credenciais inválidas' });
      } else {
        setError({ email: '', senha: 'Um erro desconhecido ocorreu.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack style={{ marginLeft: '1rem', marginRight: '1rem' }}>
      <Lotus />
      <Stack>
        <GenericHeading text={'Acalme sua'} themevariant={'dark'} />

        <Stack style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
          <GenericHeading text={'Mente'} themevariant={'light'} />
          <GenericHeading text={', Nutra'} themevariant={'dark'} />
        </Stack>

        <Stack style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <GenericHeading text={'seu'} themevariant={'dark'} />
          <GenericHeading text={'Amor'} themevariant={'light'} />
        </Stack>
      </Stack>

      <Typography style={{ color: theme.palette.secondary[1000] }}>
        Faça login para acessar suas meditações personalizadas.
      </Typography>
      
      <Divider style={{ color: theme.palette.neutrals[500], margin: '1rem' }} />
      <Stack style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>

        <Typography style={{ fontWeight: 'bold', color: theme.palette.neutrals.baseBlack }}>Email*</Typography>
        <GenericTextField
          label="Insira seu email"
          themevariant={'dark'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={error.email}
          error={!!error.email}
          helperTextStyles={{ color: theme.palette.error[200] }}
        />

        <Typography style={{ fontWeight: 'bold', color: theme.palette.neutrals.baseBlack }}>Senha*</Typography>

        <GenericTextField
          label="Insira sua senha"
          themevariant={'dark'}
          margin={'0 0 1rem 0'} 
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          helperText={error.senha}
          error={!!error.senha}
          helperTextStyles={{ color: theme.palette.error[200] }}
        />
      </Stack>

      <GenericButton
        text={'Entrar'}
        themevariant={'dark'}
        icon={<ArrowForwardOutlinedIcon />}
        onClick={onSubmit}
        disabled={isLoading}
      />
    </Stack>
  );
};