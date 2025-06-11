import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';

export interface ICustomPieChartProps {
  subtitle?: string;
  title?: string;
  data: { label: string; value: number }[];
};

export const CustomPieChart = ({ data, title }: ICustomPieChartProps) => {
  const theme = useTheme();

  const colors = ['#F1A09E', theme.palette.primary[1000], theme.palette.primary.main, theme.palette.primary[300]];
  const total = data.reduce((acc, item) => acc + item.value, 0);
  return (
    <Stack width='22rem' height='18rem' borderRadius='1.5rem' paddingTop='1rem'  boxShadow= '0 4px 12px rgba(0, 0, 0, 0.1)' sx={{ backgroundColor: '#FFFFFF'}}>
      <Stack paddingLeft='1.5rem'>
        <Typography sx={{fontFamily: theme.typography.subtitle1.fontFamily, color: theme.typography.subtitle1.color, fontSize: '0.8rem'}}>Número de</Typography>
        <Typography sx={{fontFamily: theme.typography.body2.fontFamily, fontWeight: theme.typography.body2.fontWeight, color: theme.typography.body2.color, fontSize: '0.9rem'}}>{title}</Typography>
      </Stack>
      <Divider sx={{ marginTop: '0.4rem' }} />
      <Stack alignItems='center'>
        <PieChart
          series={[
            {
              startAngle: -90,
              endAngle: 90,
              paddingAngle: 1,
              innerRadius: 60, 
              outerRadius: 110, 
              data,
            },
          ]}
          colors={colors} 
          margin={{ right: 0, left: 0, top: 0, bottom: 0 }}
          width={220}  
          height={260} 
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
        <Stack position='absolute' alignItems='center' marginTop={'5rem'} >
          <Typography  sx={{fontSize: '0.6rem', color: theme.palette.neutrals[600]}}>Quantidade</Typography>
          <Typography sx={{fontSize: '0.6rem', color: theme.palette.neutrals[600]}} >total</Typography>
          <Typography fontSize={'1.2rem'} >{total}</Typography>
        </Stack>
        <Divider sx={{ marginTop: '-6.4rem', marginBottom: '1rem', width: '100%' }} />
        <List sx={{ display: 'flex', flexDirection: 'row', padding: '0', gap: '1rem' }}>
          {data.map((item, index) => (
            <ListItem 
              key={index} 
              sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0', margin: '0', width: 'auto' }} 
              disableGutters
            >
              <ListItemIcon sx={{ minWidth: 'unset' }}>
                <CircleIcon sx={{ fontSize: '0.6rem', color: colors[index] }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: '0.6rem', fontWeight: 100, color: theme.palette.neutrals[600] }} 
                sx={{ margin: '0' }}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};
