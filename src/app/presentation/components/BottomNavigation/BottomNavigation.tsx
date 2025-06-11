import * as React from 'react';
import Box from '@mui/material/Box';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Link from 'next/link';

export default function CustomBottomNavigation() {
  const [value, setValue] = React.useState(1);

  return (
    <Box 
      sx={{ 
        width: '100%',
        position: 'fixed',
        bottom: '-1px',
        left: 0,
        right: 0,
        borderRadius: '16px 16px 0px 0px', 
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}
    >
      <MuiBottomNavigation
        sx={{
          backgroundColor: '#5E0F17',
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          label="Infos" 
          icon={<AnalyticsIcon />} 
          component={Link}
          href="/informacoes" 
          sx={{
            color: value === 0 ? '#F0A0A8' : '#FFFFFF',
            '&.Mui-selected': {
              color: '#F0A0A8',
            },
          }}
        />
        <BottomNavigationAction 
          label="Meditação" 
          icon={<SelfImprovementIcon />} 
          component={Link}
          href="/home" 
          sx={{
            color: value === 1 ? '#F0A0A8' : '#FFFFFF',
            '&.Mui-selected': {
              color: '#F0A0A8',
            },
          }}
        />
        <BottomNavigationAction 
          label="Diário" 
          icon={<MenuBookIcon />} 
          component={Link}
          href="/diario" 
          sx={{
            color: value === 2 ? '#F0A0A8' : '#FFFFFF',
            '&.Mui-selected': {
              color: '#F0A0A8',
            },
          }}
        />
      </MuiBottomNavigation>
    </Box>
  );
}
