"use client";

import { useParams } from 'next/navigation';
import { PerfilMae } from "@/app/presentation/pages/PerfilMae/PerfilMae";
import { withAuth } from "@/app/presentation/components/withAuth";
import { Loading } from "@/app/presentation/components/loading";
import { useEffect, useState } from 'react';

const PerfilMaePage = () => {
  const params = useParams();
  const userId = params?.userId;

  const [isUserIdReady, setIsUserIdReady] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsUserIdReady(true);
    }
  }, [userId]);

  const WrappedPerfilMae = withAuth(() => {
    return <PerfilMae userId={Number(userId)} />;
  }, true);

  return isUserIdReady ? <WrappedPerfilMae /> : <Loading />;
};

export default PerfilMaePage;
