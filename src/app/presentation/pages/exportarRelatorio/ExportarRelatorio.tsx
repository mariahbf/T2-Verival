import { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Chip,
  ListItemText,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import theme from '@/theme/theme';
import TextField from '@mui/material/TextField/TextField';
import { GenericHeading } from '../../components/Heading/GenericHeading';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GenericButton } from '../../components';
import CloseIcon from '@mui/icons-material/Close';
import Papa from 'papaparse';
import api from '@/app/api';

interface Row {
  Nome: string;
  'Semana do Áudio': string;
}

export const ExportarRelatorio = () => {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [semana, setSemana] = useState<string[]>(['Todas as Semanas']);
  const [nome, setNome] = useState<string[]>(['Todas as Participantes']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    dataInicial: '',
    dataFinal: '',
    semana: '',
    nome: '',
  });
  const [optionsNomes, setOptionsNomes] = useState<string[]>([]);
  const [optionsSemanas, setOptionsSemanas] = useState<string[]>([]);

  const accessToken = localStorage.getItem('access_token');

  const fetchData = async () => {
    try {
      const response = await api.get('/reports/audios', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      });

      const csvData = await response.data.text();

      Papa.parse<Row>(csvData, {
        delimiter: ';',
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const nomes = result.data.map((row) => row.Nome);
          const semanas = result.data.map((row) => row['Semana do Áudio']);

          const uniqueNomes = ['Todas as Participantes', ...new Set(nomes)];
          const uniqueSemanas = [
            'Todas as Semanas',
            ...[...new Set(semanas)]
              .filter(Boolean)
              .map(String)
              .sort((a, b) => Number(a) - Number(b)),
          ];

          setOptionsNomes(uniqueNomes);
          setOptionsSemanas(uniqueSemanas);
        },
        error: (err) => {
          console.error('Erro ao processar CSV:', err);
        },
      });
    } catch (error) {
      alert('Erro ao buscar dados. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validation = () => {
    let msg = { dataInicial: '', dataFinal: '', semana: '', nome: '' };
    let retorno = true;
    if (dataInicial !== '') {
      const dataI = new Date(dataInicial);
      if (isNaN(dataI.getTime())) {
        msg.dataInicial =
          'O campo Data inicial está incorreto. Por favor, insira uma data válida.';
        retorno = false;
      }
    }

    if (dataFinal !== '') {
      const dataF = new Date(dataFinal);
      if (isNaN(dataF.getTime())) {
        msg.dataFinal =
          'O campo Data final está incorreto. Por favor, insira uma data válida.';
        retorno = false;
      }
    }

    if (dataInicial !== '' && dataFinal !== '') {
      const dataI = new Date(dataInicial);
      const dataF = new Date(dataFinal);
      if (dataI > dataF) {
        msg.dataFinal = 'A Data Final não pode ser anterior à Data Inicial.';
        retorno = false;
      }
    }

    setError(msg);
    return retorno;
  };

  const onSubmit = async () => {
    setIsLoading(true);

    if (!validation()) {
      setIsLoading(false);
      return;
    }

    try {
      const params: any = {};

      if (dataInicial !== '') {
        params.startDate = dataInicial;
      }
      if (dataFinal !== '') {
        params.finishDate = dataFinal;
      }
      if (!semana.includes('Todas as Semanas') && semana.length > 0) {
        params.week = semana;
      }
      if (!nome.includes('Todas as Participantes') && nome.length > 0) {
        params.names = nome;
      }

      const response = await api.get('/reports/audios', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
        paramsSerializer: (params) => {
          return Object.keys(params)
            .map((key) => {
              if (Array.isArray(params[key])) {
                return params[key]
                  .map((value: string) => `${key}=${encodeURIComponent(value)}`)
                  .join('&');
              }
              return `${key}=${encodeURIComponent(params[key])}`;
            })
            .join('&');
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Não foi possível exportar o relatório. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const onGenerateDiary = async () => {
    setIsLoading(true);

    try {
      const response = await api.get('/reports/diaries', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'diario.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Não foi possível gerar o diário. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNomeChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let selectedValues = typeof value === 'string' ? value.split(',') : value;


    selectedValues = Array.from(new Set(selectedValues));

    if (selectedValues.includes('Todas as Participantes')) {
      if (nome.includes('Todas as Participantes')) {
        if (selectedValues.length > 1) {
          selectedValues = selectedValues.filter((item: string) => item !== 'Todas as Participantes');
          setNome(selectedValues);
        } else {
          setNome(['Todas as Participantes']);
        }
      } else {
        setNome(['Todas as Participantes']);
      }
    } else {
      if (selectedValues.length === 0) {
        setNome(['Todas as Participantes']);
      } else {
        setNome(selectedValues);
      }
    }
  };

  const handleSemanaChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let selectedValues = typeof value === 'string' ? value.split(',') : value;


    selectedValues = Array.from(new Set(selectedValues));

    if (selectedValues.includes('Todas as Semanas')) {
      if (semana.includes('Todas as Semanas')) {
        if (selectedValues.length > 1) {
          selectedValues = selectedValues.filter((item: string) => item !== 'Todas as Semanas');
          setSemana(selectedValues);
        } else {
          setSemana(['Todas as Semanas']);
        }
      } else {
        setSemana(['Todas as Semanas']);
      }
    } else {
      if (selectedValues.length === 0) {
        setSemana(['Todas as Semanas']);
      } else {
        setSemana(selectedValues);
      }
    }
  };

  return (
    <Stack
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem',
        backgroundColor: theme.palette.neutrals.main,
      }}
    >
      <Stack
        style={{
          backgroundColor: theme.palette.neutrals.baseWhite,
          borderRadius: '2rem',
          padding: '2rem',
          maxWidth: '50rem',
          width: '90%',
          boxSizing: 'border-box',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <GenericHeading text={'Exportar Relatório'} themevariant={'dark'} />
        </Stack>

        <Stack
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Stack style={{ width: '48%' }}>
            <Typography sx={{ color: theme.palette.secondary[1000], marginBottom: '0.5rem' }}>
              Nomes
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="nome-label"
                multiple
                value={nome}
                onChange={handleNomeChange}
                renderValue={(selected) => {
                  if ((selected as string[]).includes('Todas as Participantes')) {
                    return 'Todas as Participantes';
                  }
                  return (
                    <div>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                        />
                      ))}
                    </div>
                  );
                }}
              >
                {optionsNomes.map((nomeOption) => (
                  <MenuItem key={nomeOption} value={nomeOption}>
                    <ListItemText primary={nomeOption} />
                    {nome.includes(nomeOption) && nomeOption !== 'Todas as Participantes' && (
                      <CloseIcon style={{ color: 'red', marginLeft: 'auto' }} />
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack style={{ width: '48%' }}>
            <Typography sx={{ color: theme.palette.secondary[1000], marginBottom: '0.5rem' }}>
              Semanas
            </Typography>
            <FormControl fullWidth>
              
              <Select
                labelId="semana-label"
                multiple
                value={semana}
                onChange={handleSemanaChange}
                renderValue={(selected) => {
                  if ((selected as string[]).includes('Todas as Semanas')) {
                    return 'Todas as Semanas';
                  }
                  return (
                    <div>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={`Semana ${value}`}
                        />
                      ))}
                    </div>
                  );
                }}
              >
                {optionsSemanas.map((semanaOption) => (
                  <MenuItem key={semanaOption} value={semanaOption}>
                    <ListItemText
                      primary={
                        semanaOption === 'Todas as Semanas'
                          ? 'Todas as Semanas'
                          : `Semana ${semanaOption}`
                      }
                    />
                    {semana.includes(semanaOption) && semanaOption !== 'Todas as Semanas' && (
                      <CloseIcon style={{ color: 'red', marginLeft: 'auto' }} />
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Stack style={{ marginTop: '1.5rem' }}>
          <Typography
            style={{
              color: theme.palette.secondary[1000],
              marginBottom: '0.5rem',
            }}
          >
            Datas
          </Typography>
          <Stack
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              label="Data Inicial"
              type="date"
              value={dataInicial}
              helperText={error.dataInicial}
              error={!!error.dataInicial}
              onChange={(e) => {
                setDataInicial(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '48%' }}
            />

            <Divider
              variant="middle"
              style={{
                backgroundColor: theme.palette.secondary[1000],
                height: '100%',
                width: '0.5rem',
                alignSelf: 'center',
              }}
            />

            <TextField
              label="Data Final"
              type="date"
              value={dataFinal}
              helperText={error.dataFinal}
              error={!!error.dataFinal}
              onChange={(e) => {
                setDataFinal(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '48%' }}
            />
          </Stack>
        </Stack>

        <GenericButton
          text={'Gerar Relatório'}
          themevariant={'dark'}
          icon={<ArrowForwardOutlinedIcon />}
          onClick={onSubmit}
          disabled={isLoading}
          width={'100%'}
          style={{ marginTop: '1rem' }}
        />

        <GenericButton
          text={'Gerar Diário'}
          themevariant={'dark'}
          icon={<ArrowForwardOutlinedIcon />}
          onClick={onGenerateDiary}
          disabled={isLoading}
          width={'100%'}
          style={{ marginTop: '1rem' }}
        />
      </Stack>
    </Stack>
  );
};
