import React, { useState } from "react";
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Poppins } from "next/font/google";
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const colunasPerfil: GridColDef[] = [
  { field: 'dia', headerName: 'Dia', flex: 1 },
  { field: 'semana', headerName: 'Semana', flex: 0.7, headerAlign: 'left', align: 'left' },
  { field: 'tempoOuvido', headerName: 'Tempo ouvido (min)', flex: 1, headerAlign: 'left', align: 'left' },
  { field: 'horario', headerName: 'Horário', flex: 0.8, headerAlign: 'left', align: 'left' },
];

const DataGridEstilizado = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    border: 'none',
    borderRadius: '0.9375rem',
    fontFamily: poppins.style.fontFamily,
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#5e0f17',
    color: '#FFF',
    fontWeight: '700',
    borderBottom: '0.125rem solid #000',
    fontSize: '1rem',
    paddingLeft: '1rem',
  },
  '& .MuiDataGrid-cell': {
    color: '#000',
    borderBottom: '0.0625rem solid #E0E0E0',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1rem',
    fontWeight: '400',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: '#FFF',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F5F2F2',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#FBEAE6',
    color: '#5F1E0D',
    borderBottomLeftRadius: '0.9375rem',
    borderBottomRightRadius: '0.9375rem',
  },
  '& .MuiTablePagination-root, & .MuiTablePagination-caption, & .MuiTablePagination-selectLabel, & .MuiTablePagination-select, & .MuiTablePagination-actions': {
    color: '#5F1E0D',
  },
  '& .MuiDataGrid-columnSeparator': {
    color: '#5F1E0D !important',
  },
  '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton': {
    color: '#FFF !important',
  },
}));

const CampoTextoCustomizado = styled(TextField)(({ theme }) => ({
  backgroundColor: '#f8ebe7',
  borderRadius: '0.5rem',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e2b5ad',
    },
    '&:hover fieldset': {
      borderColor: '#e2b5ad',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e2b5ad',
    },
  },
  '& input': {
    color: '#5e0f17',
  },
  '& label': {
    color: '#5e0f17',
  },
  '& .MuiInputAdornment-root': {
    color: '#5e0f17',
  },
}));

const SelectCustomizado = styled(Select)(({ theme }) => ({
  backgroundColor: '#f8ebe7',
  borderRadius: '0.5rem',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
    color: '#5e0f17',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
    color: '#5e0f17',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
    color: '#5e0f17',
  },
  '& .MuiSelect-icon': {
    color: '#5e0f17',
  },
  '& .MuiInputBase-input': {
    color: '#5e0f17',
  },
  '& .MuiInputLabel-root': {
    color: '#5e0f17',
  },
}));

export interface DadosPerfil {
  data: Array<{ dia: string; semana: number; tempoOuvido: number; horario: string }>;
}

function parseISODateString(dateString: string): Date | null {
  const [year, month, day] = dateString.split('-').map(Number);
  if (year && month && day) {
    const parsedDate = new Date(year, month - 1, day);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
  return null;
}

function parseDateFromString(dateString: string): Date | null {
  const [day, month, year] = dateString.split('/');
  if (day && month && year) {
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
  return null;
}

function compareDates(date1: Date, date2: Date): boolean {
  const dayMatch = date1.getDate() === date2.getDate();
  const monthMatch = date1.getMonth() === date2.getMonth();
  const yearMatch = date1.getFullYear() === date2.getFullYear();

  return dayMatch && monthMatch && yearMatch;
}

export const PerfilDataGrid: React.FC<DadosPerfil> = ({ data }) => {
  const [filtroData, setFiltroData] = useState<Date | null>(null);
  const [filtroDataTexto, setFiltroDataTexto] = useState<string>('');
  const [filtroSemana, setFiltroSemana] = useState<number | string>('Todos');
  const [exibirAudiosCompletos, setExibirAudiosCompletos] = useState<boolean>(false);

  const tempoTotalPorSemana: { [key: number]: number } = {
    1: 11.4,
    2: 11,
    3: 7.9,
    4: 9.66,
    5: 9.2,
    6: 10,
  };

  const dadosCompletos = data.map((linha) => {
    const tempoTotal = tempoTotalPorSemana[linha.semana];
    const audioCompleto = linha.tempoOuvido >= tempoTotal;
    return { ...linha, audioCompleto };
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiltroDataTexto(value);
    const date = parseISODateString(value);
    setFiltroData(date);
  };

  const dadosFiltrados = dadosCompletos.filter((linha) => {
    let diaCorresponde = true;

    if (filtroData) {
      const dataLinha = parseDateFromString(linha.dia);
      if (dataLinha) {
        diaCorresponde = compareDates(dataLinha, filtroData);
      } else {
        diaCorresponde = false;
      }
    }

    const semanaCorresponde = filtroSemana === 'Todos' || linha.semana === filtroSemana;
    const audioCompletoCorresponde = !exibirAudiosCompletos || linha.audioCompleto;

    return diaCorresponde && semanaCorresponde && audioCompletoCorresponde;
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        overflowX: 'auto',
        fontFamily: poppins.style.fontFamily,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          marginTop: 0.7,
        }}
      >
        <Typography variant="h6" sx={{ color: '#5e0f17', fontWeight: 'bold', marginRight: '1rem' }}>
          Filtrar:
        </Typography>

        <CampoTextoCustomizado
          label="Data"
          type="date"
          value={filtroDataTexto}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ flex: '1 1 auto', minWidth: '180px', maxWidth: '150px' }}
          InputProps={{
            endAdornment: filtroDataTexto && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Limpar data"
                  onClick={() => {
                    setFiltroDataTexto('');
                    setFiltroData(null);
                  }}
                  edge="end"
                  size="small"
                  sx={{ color: '#5e0f17' }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            flex: '1 1 auto',
            marginTop: '0.1rem',
          }}
        >
          <FormControl
            sx={{ flexShrink: 0, minWidth: '180px' }}
          >
            <InputLabel id="select-week-label" sx={{ color: '#5e0f17'}}>
              Selecione a semana
            </InputLabel>
            <SelectCustomizado
              labelId="select-week-label"
              value={filtroSemana}
              onChange={(e) => setFiltroSemana(e.target.value as number | string)}
              label="Selecione a semana"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {[1, 2, 3, 4, 5, 6].map((semana) => (
                <MenuItem key={semana} value={semana}>
                  {semana}
                </MenuItem>
              ))}
            </SelectCustomizado>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={exibirAudiosCompletos}
                onChange={(e) => setExibirAudiosCompletos(e.target.checked)}
                icon={<CheckBoxOutlineBlankIcon sx={{ color: '#5e0f17' }} />}
                checkedIcon={<CheckBoxIcon sx={{ color: '#5e0f17' }} />}
              />
            }
            label="Exibir apenas áudios completos"
            sx={{
              color: '#5e0f17',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <DataGridEstilizado
          disableRowSelectionOnClick
          autoHeight
          rows={dadosFiltrados.map((item, index) => { 
            const formatHorario = (horarioUtc: string) => {
              const [hora, minuto, segundo] = horarioUtc.split(':').map(Number);
              const horaUtc3 = hora - 3;
              if (horaUtc3 < 0) {
                return `${(horaUtc3 + 24).toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
              } else if (horaUtc3 > 23) {
                return `${(horaUtc3 - 24).toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
              } else {
                return `${horaUtc3.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
              }
            };
            function formatTime(minutes: number): string {
              const totalSeconds = Math.round(minutes * 60);
              const minutesPart = Math.floor(totalSeconds / 60);
              const secondsPart = totalSeconds % 60;
          
              return `${minutesPart}:${secondsPart.toString().padStart(2, '0')}`;
            }
            return { id: index, ...item, horario: formatHorario(item.horario), tempoOuvido: `${formatTime(item.tempoOuvido)} / ${formatTime(tempoTotalPorSemana[item.semana])}` }
          })}
          columns={colunasPerfil}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: 'Linhas por página:',
            },
          }}
        />
      </Box>
    </Box>
  );
};
