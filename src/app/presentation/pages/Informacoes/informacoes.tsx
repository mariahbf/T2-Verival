import { useEffect, useState } from 'react';
import { InfoCard } from '@/app/presentation/components/InfoCard';
import { Stack, Typography } from '@mui/material';
import { GenericHeading } from '@/app/presentation/components/Heading';
import { GenericSubHeading } from '@/app/presentation/components/SubHeading';
import { Lotus } from '@/app/presentation/components/Lotus';
import { useRouter } from 'next/navigation';
import theme from '@/theme/theme';
import { GenericCircleButton } from '../../components/CircleButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { cardContents } from '@/app/data/informacoesCardMock';
import { differenceInCalendarDays, parse } from 'date-fns';
import { getLoggedUser } from '@/app/session';
import { InfoCardDetails } from '../../components/InfoCardDetails';

export const Informacoes = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [week, setWeek] = useState<number | null>(null);
  const [hospitalDischarge, setHospitalDischarge] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      const startDate = new Date(loggedUser.createdAt).toLocaleDateString();
      const initialDate = parse(startDate, 'dd/MM/yyyy', new Date());
      const today = new Date();
      const daysDifference = differenceInCalendarDays(today, initialDate);
      const currentWeek = Math.ceil(daysDifference / 7);
      setWeek(currentWeek);
      setHospitalDischarge(loggedUser.hospitalDischarge ?? false);
    }
  }, []);

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  const handleBackHomeClick = () => {
    router.push('/home');
  };

  if (!hospitalDischarge) {
    return (
      <Stack padding={'0 3rem'}>
        <Lotus />
        <GenericHeading text={'Indisponível'} themevariant={'dark'} />
        <GenericSubHeading
          text={'Essa página será liberada após receber alta hospitalar'}
          themevariant={'dark'}
        />
        <Stack flexDirection={'row'} marginTop={'2rem'}>
          <Stack width={'40px'} marginRight={'1rem'} marginTop={'-0.4rem'}>
            <GenericCircleButton
              icon={<ArrowBackIcon />}
              onClick={handleBackHomeClick}
            />
          </Stack>
          <GenericSubHeading
            text={'Voltar para a home'}
            themevariant={'dark'}
          />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        padding: '2rem 1rem',
        margin: 'auto',
      }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Lotus />
      </Stack>

      {selectedCard === null ? (
        <>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.2rem',
            }}
          >
            <GenericCircleButton
              icon={<ArrowBackIcon />}
              onClick={handleBackHomeClick}
            />

            <Stack spacing={-1} sx={{ marginTop: '1rem' }} gap={0}>
              <GenericHeading
                text="Apoio e"
                themevariant="dark"
                letterSpacing={0}
              />
              <GenericHeading text="Informações" themevariant="light" />
            </Stack>
            <GenericSubHeading
              text="Mitos e Verdades sobre o Leite Materno."
              themevariant="dark"
            />
          </Stack>

          <Stack
            spacing={2}
            sx={{
              margin: '2rem',
              paddingBottom: '2.5rem',
              paddingTop: '0.2rem',
            }}
          >
            {cardContents.map((card, index) => (
              <InfoCard
                title={card.title}
                description={card.shortDescription}
                backgroundColor={
                  index % 2 === 0 ? theme.palette.secondary[1000] : '#F0A0A8'
                }
                titleColor={
                  index % 2 === 0 ? '#F0A0A8' : theme.palette.neutrals.baseWhite
                }
                descriptionColor={
                  index % 2 === 0
                    ? theme.palette.primary[100]
                    : theme.palette.primary[1000]
                }
                buttonColor={index % 2 === 0 ? 'light' : 'dark'}
                textColor={
                  index % 2 === 0
                    ? theme.palette.secondary[1000]
                    : theme.palette.neutrals.baseWhite
                }
                onClick={() => handleCardClick(index)}
              />
            ))}
          </Stack>
        </>
      ) : (
        <InfoCardDetails
          cardContents={cardContents}
          selectedCard={selectedCard}
          handleBackClick={handleBackClick}
          cardValue={
            cardContents[selectedCard].description.includes('VERDADE')
              ? true
              : false
          }
          variant={selectedCard % 2 === 0 ? 'dark' : 'light'}
        />
      )}
    </Stack>
  );
};
