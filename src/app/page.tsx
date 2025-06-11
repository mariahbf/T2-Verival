'use client';;
import { Stack } from '@mui/material';
import { GenericButton } from './presentation/components';
import { GenericHeading } from '../app/presentation/components/Heading';
import { GenericSubHeading } from './presentation/components/SubHeading';
import { Lotus } from '../app/presentation/components/Lotus';
import BreastfeedingMom from '@/assets/BreastfeedingMom.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getLoggedUser, User } from './session';
import { Loading } from './presentation/components/loading';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) setUser(loggedUser);
    setLoading(false);
  }, []);

    const buttonClick = () => {
      if (user) router.push('/home');
      else router.push('/login');
    };


  if (isLoading) return <Loading />;

  return (
    <Stack display="flex" alignItems="center" width={'100%'} height={'100vh'}>
      <Lotus />
      <Stack
        flexDirection="column"
        alignSelf={'flex-start'}
        marginLeft={'1.2rem'}
        marginRight={'1.2rem'}
        spacing={-1.3}
      >
        <GenericHeading text="Bem-vinda ao" themevariant="light" />
        <GenericHeading text="meditAMAmente" themevariant="dark" />
      </Stack>
      <Stack
        alignSelf={'flex-start'}
        marginLeft={'1.2rem'}
        marginRight={'1.2rem'}>
        <GenericSubHeading text="Encontre paz com a meditação Slow, criada para apoiar você neste momento tão delicado." themevariant="dark" />
        <Image
          src={BreastfeedingMom.src}
          alt="Mãe amamentando"
          width={360}
          height={340}
          style={{ marginBottom: '3rem', marginTop: '2rem', }} />
      </Stack >
      
        <GenericButton text="Próximo" themevariant='dark' icon={<ArrowForwardIcon />} width={'22.4rem'} height={'3rem'} onClick={buttonClick} />

    </Stack>
  );
}
