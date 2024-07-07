/* eslint-disable jsx-a11y/alt-text */
'use client'
import React from 'react'
import SVTopbar from './SVTopbar'
import { FaUser } from 'react-icons/fa'
import SVNavMenus from './SVNavMenus'
import { Col, Grid, Row } from 'antd'

export default function SVProductDetails() {
  return (
    <div className="">
      <div className="bg-[#eee] py-4">
        <div className="flex justify-between items-center bg-[#eee] w-3/4 m-auto">
          <SVNavMenus />
          <div className="flex justify-end items-center">
            <div className="mr-5 rounded-3xl py-2 px-4 border border-customPrimary-800 text-customPrimary-800 flex items-center">
              <FaUser className="text-customPrimary-800 mr-2" />
              Login
            </div>
            <h1>
              <strong className="text-customPrimary-800 text-3xl font-semibold">
                Style
              </strong>
              <span className="text-customPrimary-800 text-3xl font-thin">
                Vibe
              </span>
            </h1>
          </div>
        </div>
      </div>
     <div className='w-3/4 m-auto'>
     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={12} md={12} lg={12}>
            1
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
            2
        </Col>
     </Row>
     </div>
    </div>
  )
}
