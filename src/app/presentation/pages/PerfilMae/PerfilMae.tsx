import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogTitle,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import theme from '@/theme/theme';
import { GenericButton, GenericHeading } from '@/app/presentation/components';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Checkbox from '@mui/material/Checkbox';
import { Check } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../../api';

interface PerfilMaeProps {
  userId: number;
}

export const PerfilMae: React.FC<PerfilMaeProps> = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditableNome, setIsEditableNome] = useState(false);
  const [isEditableCpf, setIsEditableCpf] = useState(false);
  const [isEditableEmail, setIsEditableEmail] = useState(false);
  const [isEditableSenha, setIsEditableSenha] = useState(false);
  const [isEditableData, setIsEditableData] = useState(false);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [data, setData] = useState('');
  const [deactivated, setDeactivated] = useState(false);
  const [hospitalDischarge, setHospitalDischarge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  interface DiarioEntry {
    date: string;
    text: string;
  }

  const [diarioEntries, setDiarioEntries] = useState<DiarioEntry[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');

        const response = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setNome(data.username);
        setCpf(data.cpf);
        setEmail(data.email);
        setData(data.birthDate);
        setDeactivated(data.deactivated);
        setHospitalDischarge(data.hospitalDischarge);

        const diaryResponse = await api.get(`/diaries/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const diariesData = diaryResponse.data;

        if (Array.isArray(diariesData)) {
          setDiarioEntries(diariesData);
        } else {
          setDiarioEntries([]);
        }
      } catch (err) {
        console.error('Erro ao buscar os dados do usuário ou diários:', err);
        setError('Erro ao carregar os dados do usuário ou diários.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const toggleModal = () => setShowModal(!showModal);

  const toggleEditNome = async () => {
    if (isEditableNome) {
      setIsEditableNome(false);
      try {
        const token = localStorage.getItem('access_token');
        const dataToUpdate = {
          username: nome,
        };
  
        await api.patch(`/users/${userId}`, dataToUpdate, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Erro ao atualizar o nome do usuário:", error)
        setError('Erro ao atualizar o nome do usuário.');
      }
    } else {
      setIsEditableNome(true);
    }
  };
  
    
  const toggleEditCpf = async () => {
    if (isEditableCpf) {
      if (cpf.length !== 11) {
        setCpfError('O CPF deve conter 11 dígitos.');
      } else {
        setCpfError('');
        setIsEditableCpf(false);
        try {
          const token = localStorage.getItem('access_token');
          const dataToUpdate = {
            cpf: cpf,
          };
    
          await api.patch(`/users/${userId}`, dataToUpdate, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Erro ao atualizar o CPF do usuário:", error)
          setError('Erro ao atualizar o CPF do usuário.');
        }
      }
    } else {
      setCpfError('');
      setIsEditableCpf(true);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const toggleEditEmail = async () => {
    if (isEditableEmail) {
      if (!validateEmail(email)) {
        setEmailError('O email é inválido.');
      } else {
        setEmailError('');
        setIsEditableEmail(false);
        try {
          const token = localStorage.getItem('access_token');
          const dataToUpdate = {
            email: email,
          };
    
          await api.patch(`/users/${userId}`, dataToUpdate, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Erro ao atualizar o email do usuário:", error)
          setError('Erro ao atualizar o email do usuário.');
        }
      }
    } else {
      setEmailError('');
      setIsEditableEmail(true);
    }
  };

  const toggleEditSenha = async () => {
    if (isEditableSenha) {
      if (senha.length < 1) {
        setPasswordError('A senha deve ter pelo menos um caractere.');
      } else {
        setPasswordError('');
        setIsEditableSenha(false);
        try {
          const token = localStorage.getItem('access_token');
          const dataToUpdate = {
            password : senha,
          };
    
          await api.patch(`/users/${userId}`, dataToUpdate, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Erro ao atualizar a senha do usuário:", error)
          setError('Erro ao atualizar a senha do usuário.');
        };
      }
    } else {
      setPasswordError('');
      setIsEditableSenha(true);
    }
  };

  const toggleEditData = async () => {
    if (isEditableData) {
      setIsEditableData(false);
      try {
        const token = localStorage.getItem('access_token');
        const dataToUpdate = {
          birthDate: data,
        };
  
        await api.patch(`/users/${userId}`, dataToUpdate, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Erro ao atualizar data de nascimento do usuário:", error)
        setError('Erro ao atualizar data de nascimento do usuário.');
      };
    } else {
      setIsEditableData(true);
    }
  };

  const handleDeactivatedChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setDeactivated(newValue);

    try {
      const token = localStorage.getItem('access_token');
      const dataToUpdate = {
        deactivated: newValue,
      };

      await api.patch(`/users/${userId}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
      setError('Erro ao desativar usuário.');
    }
  };

  const handleHospitalDischargeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setHospitalDischarge(newValue);

    try {
      const token = localStorage.getItem('access_token');
      const dataToUpdate = {
        hospitalDischarge: newValue,
      };

      await api.patch(`/users/${userId}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao registrar alta hospitalar do usuário:', error);
      setError('Erro ao registrar alta hospitalar do usuário.');
    }
  };

  const latestEntry = diarioEntries
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <Stack
      sx={{
        height: '100v',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Stack
        style={{
          backgroundColor: theme.palette.neutrals.baseWhite,
          borderRadius: '32px',
          width: '85%',
          flexDirection: 'column',
          padding: '1rem',
          margin: '5rem',
        }}
      >
        <Stack
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <GenericHeading
            themevariant={'dark'}
            text={'Perfil da Mãe'}
          ></GenericHeading>
        </Stack>

        {loading ? (
          <Typography variant="h6" color="textSecondary" align="center">
            Carregando...
          </Typography>
        ) : (
          <>
            <Stack sx={{ marginBottom: '1rem' }}>
              <Typography style={{ color: theme.palette.secondary[1000] }}>
                Nome
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  variant="outlined"
                  InputProps={{ readOnly: !isEditableNome }}
                  sx={{ backgroundColor: '#FBE7E9', borderRadius: '8px' }}
                />
                <IconButton
                  onClick={toggleEditNome}
                  sx={{
                    backgroundColor: '#5E0F16',
                    borderRadius: '4px',
                    height: '48px',
                    width: '48px',
                    '&:hover': {
                      backgroundColor: '#82151F',
                    },
                  }}
                >
                  {isEditableNome ? (
                    <Check sx={{ color: '#FFFFFF' }} />
                  ) : (
                    <EditIcon sx={{ color: '#FFFFFF' }} />
                  )}
                </IconButton>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ marginBottom: '1rem' }}>
              <Stack sx={{ width: '50%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  CPF
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TextField
                    fullWidth
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    variant="outlined"
                    InputProps={{ readOnly: !isEditableCpf }}
                    error={!!cpfError}
                    helperText={cpfError}
                    sx={{ backgroundColor: '#FBE7E9', borderRadius: '8px' }}
                  />
                  <IconButton
                    onClick={toggleEditCpf}
                    sx={{
                      backgroundColor: '#5E0F16',
                      borderRadius: '4px',
                      height: '48px',
                      width: '48px',
                      '&:hover': {
                        backgroundColor: '#82151F',
                      },
                    }}
                  >
                    {isEditableCpf ? (
                      <Check sx={{ color: '#FFFFFF' }} />
                    ) : (
                      <EditIcon sx={{ color: '#FFFFFF' }} />
                    )}
                  </IconButton>
                </Stack>
              </Stack>

              <Stack sx={{ width: '50%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  Data de Nascimento
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TextField
                    fullWidth
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    variant="outlined"
                    InputProps={{ readOnly: !isEditableData }}
                    sx={{ backgroundColor: '#FBE7E9', borderRadius: '8px' }}
                  />
                  <IconButton
                    onClick={toggleEditData}
                    sx={{
                      backgroundColor: '#5E0F16',
                      borderRadius: '4px',
                      height: '48px',
                      width: '48px',
                      '&:hover': {
                        backgroundColor: '#82151F',
                      },
                    }}
                  >
                    {isEditableData ? (
                      <Check sx={{ color: '#FFFFFF' }} />
                    ) : (
                      <EditIcon sx={{ color: '#FFFFFF' }} />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ marginBottom: '1rem' }}>
              <Stack sx={{ width: '50%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  Email
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    InputProps={{ readOnly: !isEditableEmail }}
                    error={!!emailError}
                    helperText={emailError}
                    sx={{ backgroundColor: '#FBE7E9', borderRadius: '8px' }}
                  />
                  <IconButton
                    onClick={toggleEditEmail}
                    sx={{
                      backgroundColor: '#5E0F16',
                      borderRadius: '4px',
                      height: '48px',
                      width: '48px',
                      '&:hover': {
                        backgroundColor: '#82151F',
                      },
                    }}
                  >
                    {isEditableEmail ? (
                      <Check sx={{ color: '#FFFFFF' }} />
                    ) : (
                      <EditIcon sx={{ color: '#FFFFFF' }} />
                    )}
                  </IconButton>
                </Stack>
              </Stack>

              <Stack sx={{ width: '50%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  Senha
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TextField
                    fullWidth
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    variant="outlined"
                    InputProps={{ readOnly: !isEditableSenha }}
                    error={!!passwordError}
                    helperText={passwordError}
                    sx={{ backgroundColor: '#FBE7E9', borderRadius: '8px' }}
                  />
                  <IconButton
                    onClick={toggleEditSenha}
                    sx={{
                      backgroundColor: '#5E0F16',
                      borderRadius: '4px',
                      height: '48px',
                      width: '48px',
                      '&:hover': {
                        backgroundColor: '#82151F',
                      },
                    }}
                  >
                    {isEditableSenha ? (
                      <Check sx={{ color: '#FFFFFF' }} />
                    ) : (
                      <EditIcon sx={{ color: '#FFFFFF' }} />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            <Stack sx={{ marginBottom: '1rem' }}>
              <Typography style={{ color: theme.palette.secondary[1000] }}>
                Diário de Bordo
              </Typography>
              {latestEntry ? (
                <Box
                  sx={{
                    padding: '1rem',
                    backgroundColor: '#FBE7E9',
                    borderRadius: '16px',
                    border: '1px solid #5E0F17',
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ color: theme.palette.neutrals[1000] }}
                  >
                    {new Date(latestEntry.date).toLocaleDateString('pt-BR')} -{' '}
                    {new Date(latestEntry.date).toLocaleTimeString('pt-BR')}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: theme.palette.neutrals[1000] }}
                  >
                    {latestEntry.text}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.neutrals[1000] }}
                >
                  Nenhuma entrada no diário.
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={0} sx={{ marginBottom: '1rem' }}>
              <Stack sx={{ width: '25%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  Usuário desativado
                  <Checkbox
                    checked={deactivated}
                    onChange={handleDeactivatedChange}
                    sx={{
                      color: theme.palette.neutrals[1000],
                      '&.Mui-checked': { color: theme.palette.secondary[1000] },
                    }}
                  />
                </Typography>
              </Stack>

              <Stack sx={{ width: '25%' }}>
                <Typography style={{ color: theme.palette.secondary[1000] }}>
                  Alta Hospitalar
                  <Checkbox
                    checked={hospitalDischarge}
                    onChange={handleHospitalDischargeChange}
                    sx={{
                      color: theme.palette.neutrals[1000],
                      '&.Mui-checked': { color: theme.palette.secondary[1000] },
                    }}
                  />
                </Typography>
              </Stack>
            </Stack>

            <GenericButton
              text={'Visualizar Todos'}
              themevariant={'dark'}
              icon={<ArrowForwardOutlinedIcon />}
              onClick={toggleModal}
            ></GenericButton>

            <Dialog
              open={showModal}
              onClose={toggleModal}
              fullWidth
              maxWidth="md"
              PaperProps={{
                sx: {
                  borderRadius: '32px',
                },
              }}
            >
              <DialogTitle sx={{ textAlign: 'center', paddingBottom: '1rem' }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#82151F',
                  }}
                >
                  Diário de Bordo
                </Typography>
              </DialogTitle>

              <DialogContent dividers sx={{ padding: '1rem 2rem' }}>
                {diarioEntries.length > 0 ? (
                  diarioEntries.map((entry, index) => (
                    <Accordion
                      key={index}
                      sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        borderBottom: '1px solid #E0E0E0',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowUpIcon
                            sx={{
                              color: '#5E0F17',
                              transform: 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                            }}
                          />
                        }
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{
                          flexDirection: 'row-reverse',
                          textAlign: 'left',
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.neutrals[1000],
                            fontWeight: 'bold',
                            width: '100%',
                          }}
                        >
                          {new Date(entry.date).toLocaleDateString('pt-BR')} -{' '}
                          {new Date(entry.date).toLocaleTimeString('pt-BR')}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.neutrals[1000] }}
                        >
                          {entry.text || 'Sem conteúdo para essa data.'}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    style={{ color: theme.palette.neutrals[1000] }}
                  >
                    Nenhuma entrada no diário.
                  </Typography>
                )}
              </DialogContent>

              <Button
                onClick={toggleModal}
                sx={{
                  backgroundColor: '#5E0F17',
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  margin: '1rem',
                  '&:hover': {
                    backgroundColor: '#82151F',
                  },
                }}
              >
                Fechar
              </Button>
            </Dialog>
          </>
        )}
      </Stack>
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="error"
        variant='filled'
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
    </Stack>
  );
};
