import React, { useState } from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SvgArrow from '../generated/svg/arrow'
import { Image } from './image'
import SwiperCore, { Controller } from 'swiper'

SwiperCore.use([Controller])

const Outer = styled.div`
`

const SwiperOuter = styled.div`
  background-color: var(--dark-brown);
  position: relative;
  user-select: none;
`

const ControllOuter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: stretch;
  z-index: 1;
  pointer-events: none;
`

const ControllButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  pointer-events: auto;
  transition: all 0.4s;
  cursor: pointer;
  color: white;
  &:hover {
    opacity: 0.5;
  }
`

const LeftControllButton = styled(ControllButton)`
padding-right: 4rem;
  svg {
    transform: scaleX(-1);
  }
`

const RightControllButton = styled(ControllButton)`
  padding-left: 4rem;
  margin-left: auto;
`


const ImageOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 40rem;

  @media (max-height: 50rem) {
    height: 30rem;
  }
  @media (max-width: 40rem) {
    height: 100%;
  }


  picture, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    @media (max-width: 40rem) {
      width: 100%;
      height: auto;
      object-fit: none;
    }
  }
`

type ImageSliderProps = {
  images: {
    filename: string,
    width: number,
    height: number
  }[]
}
export const ImageSlider: FunctionComponent<ImageSliderProps> = ({images}) => {
  const [swiper, setSwiper] = useState<SwiperCore>()
  return <Outer>
    <SwiperOuter>
      <Swiper
        slidesPerView={1}
        onSwiper={(swiper => setSwiper(swiper))}
        loop
        autoHeight
      >
        {images.map((image, i) => {
          return <SwiperSlide key={i}>
            <ImageOuter>
              <Image name={image.filename} width={image.width} height={image.height} />
            </ImageOuter>
          </SwiperSlide>
        })}
      </Swiper>
      <ControllOuter>
        <LeftControllButton onClick={() => swiper?.slidePrev()}>
          <SvgArrow />
        </LeftControllButton>
        <RightControllButton onClick={() => swiper?.slideNext()}>
          <SvgArrow />
        </RightControllButton>
      </ControllOuter>
    </SwiperOuter>
  </Outer>
}