import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Stack from '@mui/material/Stack'; // Importação do Stack

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.primary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(50);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FDECEC',
        padding: '16px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '350px', // Limite de largura para o componente não ficar muito largo
      }}
    >
      {/* Alinhamento horizontal de todos os itens */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
        {/* Progresso circular */}
        <CircularProgressWithLabel value={progress} />

        {/* Texto (nome e saudação) */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Olá, Maria
          </Typography>
          <Typography variant="subtitle1" component="div">
            Bem vinda de volta!
          </Typography>
        </Box>

        {/* Botão de logout */}
        <IconButton edge="end">
          <ExitToAppIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
