import React, { useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';

import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Poppins } from "next/font/google";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: 'nome', headerName: 'Nome', flex: 0.5, minWidth: 150 },
  { field: 'semana', headerName: 'Semana', flex: 0.5, minWidth: 100, headerAlign: 'left', align: 'left' },
  { field: 'medmin', headerName: 'Média de minutos por dia', flex: 0.5, minWidth: 10, headerAlign: 'left', align: 'left' },
  { 
    field: 'actions', 
    headerName: '', 
    flex: 0.1, 
    headerAlign: 'left', 
    align: 'left',
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href={`/dashboard/registros/${params.row.id}`}>
            <ArrowForwardIosIcon style={{ color: '#5F1E0D', width: '1.4rem'}} />
          </Link>
        </div>
      );
    }
  },
];

const poppins = Poppins({
  weight: ['400', '600', '700'], 
  subsets: ['latin'],
  display: 'swap',
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    border: 'none',
    borderRadius: '15px', 
    fontFamily: poppins.style.fontFamily, 
    overflow: 'hidden',
  },
  '& .MuiDataGrid-main': {
    borderRadius: '0.925rem', 
  },
  '& .MuiDataGrid-virtualScroller': {
    '&::-webkit-scrollbar': {},
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      '&:hover': {
        background: '#555',
      },
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#5e0f17',
    color: '#FFF', 
    fontWeight: '700',
    borderBottom: '2px solid #000',
    fontSize: '1rem', 
    paddingLeft: '16px', 
  },
  '& .MuiDataGrid-cell': {
    color: '#000',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    alignItems: 'center', 
    paddingLeft: '16px', 
    fontWeight: '400',

  },
  '& .MuiDataGrid-row': {
    backgroundColor: '#FFFF', 
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#F5F2F2', 
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#F9DCD5', 
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  '& .MuiDataGrid-columnSeparator': {
    color: '#5F1E0D !important',
  },
  '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton': {
    color: '#FFF !important',
  },
  '& .MuiDataGrid-pagination': {
    backgroundColor: '#F9DCD5', 
    color: '#000', 
    '& .Mui-selected': {
      backgroundColor: '#D9B6AB', 
      color: '#5e0f17', 
    },
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#f8ebe7',
  borderRadius: '8px',
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
  '& .MuiInputAdornment-root': {
    color: '#5e0f17',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#f8ebe7',
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2b5ad',
  },
  '& .MuiSelect-icon': {
    color: '#5e0f17',
  },
  '& .MuiInputBase-input': {
    color: '#5e0f17',
  }
}));

export interface ICustomDataGridProps {
  data: Array<{ nome: string; semana: number; medmin: number, id: number }>;
}

export const CustomDataGrid: React.FC<ICustomDataGridProps> = ({ data }) => {
  const theme = useTheme();

  // Estados para os filtros
  const [filterName, setFilterName] = useState('');
  const [filterWeek, setFilterWeek] = useState<number | string>('');

  const filteredData = data.filter((row) => {
    const matchesName = row.nome ? row.nome.toLowerCase().includes(filterName.toLowerCase()) : false;
    const matchesWeek = filterWeek === '' || filterWeek === 'Todos' || row.semana === filterWeek;
    return matchesName && matchesWeek;
  }).map((item) => ({
    ...item,
    id: item.id
  }));
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%',
      }}
    >
      {/* Filtros */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '100%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '100%',
          },
        }}
      >
        {/* Título "Filtrar:" */}
        <Typography variant="h6" sx={{ color: '#5e0f17', fontWeight: 'bold', marginRight: '16px' }}>
          Filtrar:
        </Typography>

        {/* Filtro de nome com ícone de lupa */}
        <CustomTextField
          label=""
          placeholder="Insira o nome..."
          variant="outlined"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />

        {/* Filtro de semana */}
        <FormControl fullWidth>
          <InputLabel id="select-week-label" sx={{ color: '#5e0f17',
            "&.Mui-focused": {
            color: '#B89A9D',
          }
          }}>
            Selecione a semana
          </InputLabel>
          <CustomSelect
            labelId="select-week-label"
            value={filterWeek}
            onChange={(e) => setFilterWeek(e.target.value as number | string)}
            displayEmpty
            label="Selecione a semana"
          >
            <MenuItem value="Todos">Todos</MenuItem>
            {[1, 2, 3, 4, 5, 6].map((week) => (
              <MenuItem key={week} value={week}>
                {week}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Box>

      {/* Grid de dados */}
      <Box
        sx={{
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '100%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '100%',
          },
        }}
      >
        <StyledDataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText} 
          disableRowSelectionOnClick
          rows={filteredData}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
};
