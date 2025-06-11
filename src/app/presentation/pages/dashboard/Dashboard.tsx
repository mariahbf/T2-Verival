
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import BarChartMother from '@/app/presentation/components/BarChart/BarChart';
import { CustomPieChart } from '../../components/PieChart';
import { CustomDataGrid } from '../../components/CustomDataGrid';
import api from '../../../api';

export const DashboardScreen: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [pieChartData, setPieChartData] = useState([{label: 'Carregando...', value: 0}]);
  const [barChartData, setBarChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
            
      const calculateWeeks = (createdAt: string): string | number => {
        const differenceInDays = getDifferenceInDays(createdAt);
        const weeks = Math.ceil(differenceInDays / 7);
        if (weeks > 6) return 'Completo';
        return Math.max(weeks, 1);
      };

      const getDifferenceInDays = (createdAt: string): number => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate.getTime() - createdDate.getTime();
        return differenceInMilliseconds / (1000 * 60 * 60 * 24);
      };
  
      const filteredData = response.data.filter((user: { role: string; }) => user.role !== 'ADMINISTRATOR'); 
      const formattedData = filteredData.map((user: {id: number, createdAt: any; username: any; time_listen: any; role: string }) => ({
        id: user.id,
        nome: user.username, 
        semana: user.role == 'CONTROL_GROUP' ? 'Controle' : calculateWeeks(user.createdAt),
        medmin: Math.ceil(user.time_listen / Math.min(getDifferenceInDays(user.createdAt), 42)), 
        role: user.role
      }));
      const interventionFormattedData = formattedData.filter((user: { role: string; semana: string }) => user.role === 'INTERVENTION_GROUP');
      
      setPieChartData([
        { label: 'Controle', value: response.data.filter((user: { role: string; }) => user.role === 'CONTROL_GROUP').length },
        { label: 'Intervenção', value: response.data.filter((user: { role: string; }) => user.role === 'INTERVENTION_GROUP').length },
        { label: 'Administradores', value: response.data.filter((user: { role: string; }) => user.role === 'ADMINISTRATOR').length },
      ]);
      const weeks = ['1', '2', '3', '4', '5', '6'];
      const barChartData = weeks.map(week => 
        interventionFormattedData.filter((user: { semana: string }) => user.semana == week).length
      );
      setBarChartData(barChartData);
      setUsers(formattedData);
    } catch (err) {
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>  {
    fetchUsers();
  }, []);

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="4rem"
      overflow={'hidden'}
      padding="2rem"
    >
      <Stack direction={'row'} justifyContent={'center'} width={'90%'} spacing={5}>
        <CustomPieChart subtitle='Número de' title="Usuários Cadastrados" data={pieChartData}/>
        <BarChartMother data={barChartData} />
      </Stack>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CustomDataGrid data={users} />
      )}
    </Stack>
  );
};
