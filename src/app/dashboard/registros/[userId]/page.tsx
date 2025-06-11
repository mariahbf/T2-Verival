"use client";

import { useParams } from 'next/navigation';
import { DashboardScreenPerfil } from "@/app/presentation/pages/dashboard-perfil/DashboardScreenPerfil";
import { withAuth } from "@/app/presentation/components/withAuth";
import { Loading } from "@/app/presentation/components/loading";
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const { userId } = useParams();

  const [isUserIdReady, setIsUserIdReady] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsUserIdReady(true);
    }
  }, [userId]);

  const WrappedDashboard = withAuth(() => {
    return <DashboardScreenPerfil userId={Number(userId)} />;
  }, true);

  return isUserIdReady ? <WrappedDashboard /> : <Loading />;
};

export default DashboardPage;
