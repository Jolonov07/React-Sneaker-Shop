import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import style from './Swiper.module.scss'
import 'swiper/css/autoplay'
import img from './sneakers/4.jpg'
import imgs from './sneakers/7.jpg'
import imgss from './sneakers/5.jpg'
import imgsss from './sneakers/3.jpg'

function createSlide() {
  return (
    <SwiperSlide className={style.swipe}>
      <img className={style.img} src={img} alt="Slider" />
    </SwiperSlide>
  )
}

function createSlide2() {
  return (
    <SwiperSlide className={style.swipe}>
      <img className={style.img} src={imgs} alt="Slider" />
    </SwiperSlide>
  )
}

function createSlide3() {
  return (
    <SwiperSlide className={style.swipe}>
      <img className={style.img} src={imgss} alt="Slider" />
    </SwiperSlide>
  )
}

function createSlide4() {
  return (
    <SwiperSlide className={style.swipe}>
      <img className={style.img} src={imgsss} alt="Slider" />
    </SwiperSlide>
  )
}

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      // navigation
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      {createSlide()}
      {createSlide2()}
      {createSlide3()}
      {createSlide4()}
    </Swiper>
  )
}
