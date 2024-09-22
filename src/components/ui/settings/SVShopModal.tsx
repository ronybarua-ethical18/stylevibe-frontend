'use client'

import React, { ReactNode, useState } from 'react'
import { Button, Col, Modal, Row, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeModal,
  globalSelector,
  showModal,
} from '@/redux/slices/globalSlice'
import { GrAdd } from 'react-icons/gr'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import FormSelectField from '@/components/Forms/FormSelectField'
import FormTextArea from '@/components/Forms/FormTextArea'
import SVUplaod from '../SVUpload'
import { SubmitHandler } from 'react-hook-form'

export const SERVICE_TIME_SLOTS = [
    { value: '9:00 AM', label: '9:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '12:00 PM', label: '12:00 PM' },
    { value: '1:00 PM', label: '1:00 PM' },
    { value: '2:00 PM', label: '2:00 PM' },
    { value: '3:00 PM', label: '3:00 PM' },
    { value: '4:00 PM', label: '4:00 PM' },
    { value: '5:00 PM', label: '5:00 PM' },
    { value: '6:00 PM', label: '6:00 PM' },
    { value: '7:00 PM', label: '7:00 PM' },
    { value: '8:00 PM', label: '8:00 PM' },
    { value: '9:00 PM', label: '9:00 PM' },
    { value: '10:00 PM', label: '10:00 PM' },
  ]
  
  export const SERVICE_OFF_DAYS = [
    { value: 'SUNDAY', label: 'Sunday' },
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
  ]

type FormValues = {
  shopName: string
  location: string
  shopDescription: string
  gallery: string[]
  maxResourcePerHour: number
  serviceTime: {
    openingHour: string
    closingHour: string
    offDays: string[]
  }
}

const SVShopModal = (): ReactNode => {
  const { isModalOpen } = useSelector(globalSelector)
  const dispatch = useDispatch()
  const [images, setImages] = useState([])

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    try {
      console.log('shop modal data', {
        ...data,
        serviceTime: {
          openingHour: data?.openingHour,
          closingHour: data?.closingHour,
          offDays: data?.offDays,
        },
        maxResourcePerHour: Number(data?.maxResourcePerHour),
        gallery: images,
      })
    } catch (err: any) {
      message.error(err?.data?.message)
    }
  }

  console.log('shop images', images)

  return (
    <div>
      <div className="flex justify-center">
        <div
          className="border border-dashed rounded-full flex items-center justify-center w-28 h-28 cursor-pointer"
          onClick={() => dispatch(showModal(true))}
        >
          <GrAdd />
        </div>
      </div>
      <Modal
        width={850}
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          dispatch(closeModal(false))
        }}
        onClose={() => {
          dispatch(closeModal(false))
        }}
        maskStyle={{ background: 'rgba(0,0,0, 0.4)' }}
        maskAnimation={true}
      >
        <div
          className="overflow-y-scroll no-scrollbar w-full"
          style={{ height: '90%' }}
        >
          <h1 className="text-2xl text-center font-normal">Shop Information</h1>
          <h2 className="text-base text-center font-light text-gray-600 mb-8">
            Write down essential details about your shop and services.
          </h2>
          <Form submitHandler={onSubmit}>
            <Row gutter={24}>
              <Col className="gutter-row" span={12}>
                <FormInput
                  name="shopName"
                  placeholder="Enter shop name"
                  type="text"
                  label="Name"
                  // defaultValue={incomingData?.name || ""}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormInput
                  name="location"
                  placeholder="Enter shop location"
                  type="text"
                  label="Location"
                  // defaultValue={incomingData?.price || ""}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormSelectField
                  name="openingHour"
                  options={SERVICE_TIME_SLOTS}
                  placeholder="Select"
                  label="Service Start Time"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormSelectField
                  name="closingHour"
                  options={SERVICE_TIME_SLOTS}
                  placeholder="Select"
                  label="Service End Time"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormInput
                  name="maxResourcePerHour"
                  placeholder="Max resource"
                  type="number"
                  label="Max Resource Per Hour"
                  // defaultValue={incomingData?.price || ""}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormSelectField
                  name="offDays"
                  options={SERVICE_OFF_DAYS}
                  placeholder="Select"
                  label="Service Off Days"
                  mode="multiple"
                />
              </Col>
              <Col className="gutter-row" span={24}>
                <FormTextArea
                  name="shopDescription"
                  placeholder="Write Description"
                  label="Description"
                  maxLength={400}
                />
              </Col>
              <Col className="gutter-row" span={24}>
                <h2 className="text-sm font-normal mt-4">
                  Upload Gallery Images
                </h2>
                <SVUplaod images={images} setImages={setImages} />
              </Col>
            </Row>
            <div className="flex justify-end mt-7">
              <Button htmlType="submit" type="primary" className="text-right">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default SVShopModal