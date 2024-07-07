/* eslint-disable jsx-a11y/alt-text */

import { Button, Rate } from 'antd'
import Image from 'next/image'
import React from 'react'
import { FaStore } from 'react-icons/fa'
import SVButton from '../SVButton'

interface ICard {
  images: []
  name: string
  subCategory: string
  price: number
  description: string
}

export default function SVCard({ service }: any): React.ReactNode {
  return (
    <div className="shadow-custom-shadow h-full flex flex-col relative cursor-pointer mt-5">
      <div className="p-4 mb-5 flex-1">
        <div className="relative w-full" style={{ height: '200px' }}>
          <Image
            src={service?.images[0]?.img}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center">
            <FaStore className="text-base mr-2 text-customPrimary-800" />

            <h3 className="font-thin">{service?.shop?.name}</h3>
          </div>
          <h3 className="font-medium text-base m-0">{service?.name}</h3>
          <p className="font-thin">{service?.subCategory}</p>
        </div>
        <h2 className="text-xl text-customPrimary-800 font-medium">
          ${service?.price}
        </h2>
        <Rate allowHalf defaultValue={2.5} />
      </div>

      <div className="w-full p-3  text-white flex-none cursor-pointer">
        <div>
          <SVButton
            title="Add to cart"
            style={{ width: '100%', background: '#4d3ca3' }}
          />
        </div>
      </div>
    </div>
  )
}
