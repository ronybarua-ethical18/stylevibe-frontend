/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
'use client'
import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import imgOne from '@/assets/h5.jpg'
import imgTwo from '@/assets/h3.jpg'
import imgThree from '@/assets/h4.jpg'


export default function SVHeaderCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        // autoplaySpeed:2000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <></>, // Use empty fragment to hide previous button
        nextArrow: <></>,
       
      };
  return (
    <Slider {...settings} >
      
        <Image
          src={imgOne}
          style={{ width:"100%" }}
          layout="responsive"
          objectFit="contain"
          objectPosition="center center"
          alt=""
        />
        
     
        <Image
          src={imgTwo}
          style={{ width:"100%" }}
          layout="responsive"
          objectFit="contain"
          objectPosition="center center"
          alt=""
        />
        
   
        <Image
          src={imgThree}
          style={{ width:"100%" }}
          layout="responsive"
          objectFit="contain"
          objectPosition="center center"
          alt=""
        />
    </Slider>
  )
}
