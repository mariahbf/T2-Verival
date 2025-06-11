import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, useTheme } from '@mui/material';
import { axisClasses } from '@mui/x-charts';

interface BarChartMotherProps {
  data: number[];
}

const BarChartMother: React.FC<BarChartMotherProps> = ({ data }) => {
  const theme = useTheme();
  const semanas = ['1', '2', '3', '4', '5', '6'];
  const title = 'Mães Ativas';

  return (
    <Box
      sx={{
        width: '22rem',
        height: '18rem',
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-8880px, 0)',
        },
      }}
    >
      {/* Título do gráfico */}
      <Typography
        sx={{
          ...theme.typography.subtitle1, // Reutilizando o estilo do subtítulo
          fontSize: '0.8rem',
        }}
      >
        Número de
      </Typography>
      <Typography
        sx={{
          ...theme.typography.body2, // Reutilizando o estilo do body2
          fontSize: '0.9rem',
        }}
      >
        {title}
      </Typography>

      {/* Gráfico de barras */}
      <BarChart
        borderRadius={8}
        height={180}
        width={350}
        grid={{
          horizontal: true,
          vertical: false,
        }}
        series={[{
          data,
        }]}
        margin={{
          top: 10,
          bottom: 40,
        }}
        yAxis={[
          {
            colorMap: {
              type: 'piecewise',
              thresholds: [20, 40],
              colors: ['#F4B8BE', '#EA7C87', '#5E0F17'],
            },
          },
        ]}
        xAxis={[
          {
            scaleType: 'band',
            data: semanas,
            label: 'Semanas',
            disableTicks: true,
            labelStyle: {
              fill: theme.typography.subtitle1.color, // Reutilizando a cor do subtítulo
              fontFamily: theme.typography.subtitle1.fontFamily, // Reutilizando a fonte do subtítulo
              fontSize: '0.8rem', // Tamanho em rem
            },
          },
        ]}
      />
    </Box>
  );
};

export default BarChartMother;
