import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import theme from '@/theme/theme';
import { GenericHeading } from '../../components/Heading/GenericHeading';
import { GenericTextField } from '../../components/TextField/GenericTextField';
import { GenericButton } from '../../components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField/TextField';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GenericDropDown } from '../../components/Dropdown/GenericDropDown';
import { createUser } from '../../../api';
import { Alert, Snackbar } from '@mui/material';

export const CadastroMae = () => {
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [grupo, setGrupo] = useState('');
    const [data, setData] = useState('');
    const [error, setError] = useState({ email: '', senha: '', nome: '', cpf: '', grupo: '', data: '', idade: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [responseError, setResponseError] = useState<string | null>(null);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const optionsidade = [
        { value: '10', label: 'Abaixo de 32 semanas' },
        { value: '20', label: 'Acima de 32 semanas' }
    ];

    const optionsGroup = [
        { value: '10', label: 'Intervenção' },
        { value: '20', label: 'Controle' }
    ];

    const validation = () => {
        let msg = { email: '', senha: '', nome: '', cpf: '', grupo: '', data: '', idade: '' };
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

        if (nome === '') {
            msg.nome = 'Nome não pode ser vazio. Por favor, insira um nome válido.';
            retorno = false;
        }

        if (cpf === '') {
            msg.cpf = 'CPF é obrigatório. Por favor, insira um CPF válido.';
            retorno = false;
        } else if (cpf.length !== 11 || isNaN(Number(cpf))) {
            msg.cpf = 'Número inválido. Por favor, insira novamente um CPF válido.';
            retorno = false;
        }

        if (grupo === '') {
            msg.grupo = 'Grupo não pode ser vazio. Por favor, selecione uma opção válida.';
            retorno = false;
        }

        if (data === '') {
            msg.data = 'Data de nascimento não pode ser vazio. Por favor, insira uma data de nascimento válida.';
            retorno = false;
        } else {
            const dataNacimento = new Date(data);
            const atual = new Date();
            if (dataNacimento >= atual) {
                msg.data = 'Data de nascimento incorreta. Por favor, insira uma data de nascimento válida.';
                retorno = false;
            }
        }

        if (idade === '') {
            msg.idade = 'Idade gestacional não pode ser vazio. Por favor, selecione uma opção válida.';
            retorno = false;
        }

        setError(msg);
        return retorno;
    };

    const onSubmit = async () => {
        setIsLoading(true);
        setError({ email: '', senha: '', nome: '', cpf: '', grupo: '', data: '', idade: '' });

        if (!validation()) {
            setIsLoading(false);
            return;
        }

        try {
            const userData = {
                username: nome,
                email: email,
                password: senha,
                cpf: cpf,
                birthDate: data,
                gestationalAge: idade === '20', 
                role: grupo === 'ADMINISTRADOR' ? 1 : 2, 
            };

            const response = await createUser(userData);
            setResponseError(null);
        } catch (error: any) {
            setResponseError(error?.response?.data ?? 'Erro ao criar usuário');
        } finally {
            setIsLoading(false);
            setShowSnackbar(true);
        }
    };

    return (
        <Stack sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <Stack style={{ backgroundColor: theme.palette.neutrals.baseWhite, borderRadius: '32px', flexDirection: 'column', padding: '1rem', margin: '5rem' }}>
                <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GenericHeading themevariant={'dark'} text={'Cadastro de Mães'}></GenericHeading>
                </Stack>

                <Stack sx={{ marginBottom: '0.5rem' }}>
                    <Typography style={{ color: theme.palette.secondary[1000] }}>Nome</Typography>
                    <GenericTextField
                        themevariant={'light'}
                        label={'Insira seu nome'}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        helperText={error.nome}
                        error={!!error.nome}
                        helperTextStyles={{ color: theme.palette.error[200] }}
                    ></GenericTextField>
                </Stack>

                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <Stack sx={{ width: '60%', marginRight: '0.2rem' }}>
                        <Typography style={{ color: theme.palette.secondary[1000] }}>CPF</Typography>
                        <GenericTextField
                            themevariant={'light'}
                            label={'Insira seu CPF'}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            helperText={error.cpf}
                            error={!!error.cpf}
                            helperTextStyles={{ color: theme.palette.error[200] }}
                        ></GenericTextField>
                    </Stack>
                    <TextField
                        label="Data de Nascimento"
                        type="date"
                        value={data}
                        helperText={error.data}
                        error={!!error.data}
                        onChange={(e) => setData(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '23rem', marginTop: '1.55rem' }}
                    />
                </Stack>

                <Stack sx={{ marginBottom: '0.5rem' }}>
                    <Typography style={{ color: theme.palette.secondary[1000] }}>Email</Typography>
                    <GenericTextField
                        themevariant={'light'}
                        label={'Insira seu email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={error.email}
                        error={!!error.email}
                        helperTextStyles={{ color: theme.palette.error[200] }}
                    ></GenericTextField>
                </Stack>

                <Stack sx={{ marginBottom: '0.5rem' }}>
                    <Typography style={{ color: theme.palette.secondary[1000] }}>Senha</Typography>
                    <GenericTextField
                        themevariant={'light'}
                        label={'Insira sua senha'}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        helperText={error.senha}
                        error={!!error.senha}
                        helperTextStyles={{ color: theme.palette.error[200] }}
                    ></GenericTextField>
                </Stack>

                <Stack style={{ display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                    <GenericDropDown
                        label="Grupo"
                        value={grupo}
                        onChange={(e) => setGrupo(e.target.value)}
                        options={optionsGroup}
                        error={!!error.grupo}
                        helperText={error.grupo}
                    ></GenericDropDown>

                    <GenericDropDown
                        label="Idade gestacional"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        options={optionsidade}
                        error={!!error.idade}
                        helperText={error.idade}
                    ></GenericDropDown>
                </Stack>

                <GenericButton
                    text={'Cadastrar'}
                    themevariant={'dark'}
                    icon={<ArrowForwardOutlinedIcon />}
                    onClick={onSubmit}
                    disabled={isLoading}
                ></GenericButton>
            </Stack>

            <Snackbar 
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                autoHideDuration={6000} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
            <Alert
                severity={responseError ? 'error' : 'success'}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {responseError ?? 'Usuário criado com sucesso!'}
            </Alert>
            </Snackbar>

        </Stack>
    );
};
