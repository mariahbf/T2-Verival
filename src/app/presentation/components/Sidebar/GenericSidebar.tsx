import theme from '@/theme/theme';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import BreastfeedingMom from '@/assets/BreastfeedingMom.svg';
import TableChartIcon from '@mui/icons-material/TableChart';
import { logout } from '@/app/session';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface MenuItem {
  icon: ReactNode;
  label: string;
  link?: string;
  action?: () => void;
  borderRadius?: string;
}

const SidebarMenuItem = ({ icon, label, link, action, borderRadius }: MenuItem) => (  
  <Stack
  component="button"
  onClick={action || (() => link && window.location.assign(link))}
  sx={{
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s ease-in-out',
    height: '5rem',
    padding: '0.5rem 1rem',
    borderRadius: borderRadius || '0',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: theme.palette.secondary[300],
      transform: 'scale(1.02)',
    },
    '&:active': {
      backgroundColor: theme.palette.secondary[400],
    },
    color: theme.palette.secondary[1000],
  }}
>
  {icon}
  <Typography
    variant="sidebaricons"
    sx={{
      marginLeft: '0.5rem',
    }}
  >
    {label}
  </Typography>
</Stack>

);

const GenericSidebar = () => {
  const menuItems: MenuItem[] = [
    {
      icon: <DashboardIcon fontSize="large" />,
      label: 'Dashboard',
      link: '/dashboard',
      borderRadius: '0 1rem 0 0',
    },
    {
      icon: <AddCircleOutlineIcon fontSize="large" />,
      label: 'Cadastrar Mães',
      link: '/dashboard/cadastro',
    },
    {
      icon: <TableChartIcon fontSize="large" />,
      label: 'Gerar Relatório',
      link: '/dashboard/relatorios',
    },
    {
      icon: <LogoutIcon fontSize="large" />,
      label: 'Logout',
      action: logout,
      borderRadius: '0 0 1rem 0',
    },
  ];

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderTopRightRadius: '1.25rem',
        width: { xs: '13.75rem', sm: '17.125rem', md: '17.125rem', lg: '17.125rem' },
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        role: 'navigation',
        'aria-label': 'Main sidebar',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <Image
          src={BreastfeedingMom}
          alt="logo"
          style={{
            margin: '3rem 1rem 1rem 1rem',
            width: '17.125rem',
            height: '6.5rem',
          }}
        />
        <Typography variant="sidebarlogo">meditAMAmente</Typography>
      </Stack>

      <Stack
        sx={{
          backgroundColor: theme.palette.secondary[200],
          borderRadius: '1rem',
          width: '19rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {menuItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            link={item.link}
            action={item.action}
            borderRadius={item.borderRadius}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default GenericSidebar;
