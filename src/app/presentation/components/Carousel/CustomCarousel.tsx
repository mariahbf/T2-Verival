import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import './styles.css';
import { Stack } from '@mui/material';
import React from 'react';

export interface ICustomCarouselProps {
  carouselWidth: string;
  carouselHeight: string;
  slideWidth: string;
  slideHeight: string;
  slideNotActiveHeight?: string;
  borderRadius: string;
  spaceBetween: number;
  navigation: boolean;
  pagination: boolean;
  elements: JSX.Element[];
  setIndex?: (index: number) => void;
}

export const CustomCarousel = ({
  carouselWidth,
  carouselHeight,
  slideWidth,
  slideHeight,
  slideNotActiveHeight,
  borderRadius,
  spaceBetween,
  navigation,
  pagination,
  elements,
  setIndex,
}: ICustomCarouselProps) => {
  const [isClient, setIsClient] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const getSlideStyles = (isActive: boolean) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: slideWidth,
    height: isActive || !slideNotActiveHeight ? slideHeight : slideNotActiveHeight,
    borderRadius: borderRadius,
    overflow: 'hidden',
    alignSelf: 'center',
  });

  return (
    <Stack width="100%" height="fit-content" gap="0.5rem" mb="1rem" alignItems="center">
      <Swiper
      data-testid="custom-carousel"
        slidesPerView="auto"
        centeredSlides
        spaceBetween={spaceBetween}
        navigation={navigation}
        pagination={
          pagination
            ? {
                el: '.custom-pagination',
                clickable: true,
                renderBullet: (index, className) => `<span class="${className} custom-bullet"></span>`,
              }
            : false
        }
        modules={[Navigation, Pagination, A11y]}
        style={{ width: carouselWidth, height: carouselHeight }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setIndex?.(swiper.activeIndex)}
      >
        {elements.map((element, index) => (
          <SwiperSlide key={index} style={getSlideStyles(swiperInstance?.activeIndex === index)}>
            {element}
          </SwiperSlide>
        ))}
      </Swiper>
      {pagination && <div className="custom-pagination" role='cell' aria-label='pagination'></div>}
    </Stack>
  );
};
