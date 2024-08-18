import { Checkbox, Col, Divider, Radio, Row } from 'antd'
import React, { ReactNode } from 'react'
import SVCalendar from './SVCalendar'
import SVBookedService from './SVBookedService'
import VisaImg from '../../assets/visa.png'
import PaypalImg from '../../assets/picon.png'
import Image from 'next/image'
import SVButton from '../SVButton'

export default function SVBookingDetails({
  isModalOpen,
  service,
}: {
  isModalOpen: boolean
  service: any
}): ReactNode {
  const paymentMethods = [
    {
      id: 1,
      name: 'Card Payment',
      subTitle: 'Pay via your visa card',
      img: VisaImg,
    },
    {
      id: 1,
      name: 'Paypal Payment',
      subTitle: 'Pay via your paypal account',
      img: PaypalImg,
    },
  ]

  const processingFees = (service?.price * 2.9) / 100 + 0.3;
  const totalAmount = processingFees + service?.price
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col md={9}>
          <SVCalendar service={service}/>
        </Col>
        <Col md={15}>
          <div className="text-left">
            <SVBookedService service={service} />
            <Divider />
            <div className="">
              <h2 className="text-lg font-normal mt-5">
                Select Payment Method
              </h2>
              <div className="flex space-x-4">
                {paymentMethods.map(item => (
                  <div
                    key={item.id}
                    className="w-[50%] px-2 py-4 flex rounded-md border items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Radio />
                      <div className="ml-2">
                        <strong className="font-medium">{item.name}</strong>
                        <h2 className="font-light m-0">{item.subTitle}</h2>
                      </div>
                    </div>
                    <Image
                      src={item.img}
                      className="rounded-sm"
                      objectFit="cover"
                      objectPosition="center"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <h6 className="font-light my-5 ">
              A processing fee of <strong>2.9%</strong> of the service amount
              plus an additional fixed charge of <strong>€0.30</strong> will be
              applied to the total cost of your purchase.
            </h6>

            <div>
              {/* <h2 className="text-lg font-normal mt-5">Booking Summary</h2> */}
              {/* <Divider style={{margin:0}}/> */}
              <div className='flex justify-between items-center'>
                  <h2 className='font-normal mb-0'>Total service fee</h2>
                  <strong className='font-medium'>${service?.price}</strong>
              </div>
              <div className='flex justify-between items-center'>
                  <h2 className='font-normal'>Tax & Processing Fees</h2>
                  <strong className='font-medium'>${processingFees.toFixed(2)}</strong>
              </div>
             
              <Divider style={{margin:0}}/>
              <div className='flex justify-between items-center'>
                  <h2 className='text-base font-medium'>Total amount</h2>
                  <strong className='font-medium'>${totalAmount}</strong>
              </div>
            </div>
            <div className='flex justify-between items-center mt-12'>
            <Checkbox>I agree to the privacy policy and terms.</Checkbox>
            <SVButton title='Continue to payment' style={{background:"#4d3ca3"}}/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
