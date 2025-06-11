'use client';;
import { Stack } from '@mui/material';
import { GenericHeading } from '../../components/Heading';
import { Lotus } from '../../components/Lotus';
import { GenericButton } from '../../components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CustomCarousel } from '../../components/Carousel/CustomCarousel';
import slide1 from '../../../../assets/carousel1.png';
import slide2 from '../../../../assets/carousel2.png';
import ReactPlayer from 'react-player';
import { GenericSubHeading } from '../../components/SubHeading';
import { audios } from '../../../data/audios';
import React, { useState } from 'react';

export const Introducao = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <Stack width="100%" height="100%" alignItems={'center'} overflow={'hidden'}>
      <Lotus />
      <Stack alignItems="center" width="100%" gap="1.5rem">
        <HeadingSection />
        <CustomCarousel
          carouselWidth="100%"
          carouselHeight="18.5rem"
          slideWidth="16rem"
          slideHeight="18rem"
          slideNotActiveHeight="16rem"
          borderRadius="1rem"
          spaceBetween={10}
          navigation
          pagination
          elements={[
            <ReactPlayer
              url={audios[0]}
              playing
              loop
              controls={false}
              style={{ height: '100%', width: '100%' }}
            />,
            <img src={slide2.src} alt='slide2'/>,
            <img src={slide1.src} alt="slide1"/>,
          ]}
          setIndex={setSlideIndex}
        />
        <GenericButton
          text="Finalizar"
          themevariant="dark"
          icon={<ArrowForwardIcon />}
          width="22.4rem"
          height="3rem"
          disabled={slideIndex !== 2}
          onClick={() => {window.location.href = '/home'}}
        />
      </Stack>
    </Stack>
  );
};

const HeadingSection = () => (
  <Stack alignItems="flex-start" width="100%" gap="0.5rem" marginLeft="2rem" marginBottom="1.5rem">
    <Stack flexDirection="row" gap="0.6rem">
      <GenericHeading text="Como" themevariant="light" />
      <GenericHeading text="Funciona?" themevariant="dark" />
    </Stack>
    <GenericSubHeading text="Veja as etapas principais para começar a usar o app." themevariant="dark" width="100%" height="3rem" />
  </Stack>
);
