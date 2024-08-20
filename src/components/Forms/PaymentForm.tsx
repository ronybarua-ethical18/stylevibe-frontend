import React, { ReactNode, useState } from 'react'
import { Col, Form, Rate, Row, notification } from 'antd'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'
import Image from 'next/image'
import card from '@/assets/card.png'
import SVButton from '../SVButton'
import { CiCalendarDate, CiCreditCard2, CiLock } from 'react-icons/ci'
import { IconType } from 'react-icons'
import { FaStore } from 'react-icons/fa'

interface InputWrapperProps {
  icon: IconType
  children: ReactNode
}

const stripePromise = loadStripe(
  'pk_test_51PnMRKBfR7AXQAHn19WtEzjkCGuPKG8BmMHFqZap098kURuMhn8wuXiEEL1tg8m0QU0bryWuH3iy8ztpR3Du6hrK00BmbdnBcg',
)

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    const cardElement = elements.getElement(CardNumberElement)
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 45 }),
    })

    const { clientSecret } = await response.json()

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Customer Name' },
        } as any,
      },
    )

    setIsProcessing(false)

    if (error) {
      notification.error({
        message: 'Payment failed',
        description: error.message,
      })
    } else if (paymentIntent.status === 'succeeded') {
      notification.success({
        message: 'Payment succeeded',
        description: 'Thank you for your purchase!',
      })
    } else {
      notification.info({
        message: 'Payment status',
        description: `Payment status: ${paymentIntent.status}`,
      })
    }
  }

  const InputWrapper: React.FC<InputWrapperProps> = ({
    icon: Icon,
    children,
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 10px',
        borderRadius: '4px',
        boxShadow:
          'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
        backgroundColor: '#fff',
      }}
    >
      <Icon
        style={{ marginRight: '10px', fontSize: '24px', color: '#aab7c4' }}
      />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Card Number">
        <InputWrapper icon={CiCreditCard2}>
          <CardNumberElement options={cardElementOptions} />
        </InputWrapper>
      </Form.Item>
      <Form.Item label="Expiry Date">
        <InputWrapper icon={CiCalendarDate}>
          <CardExpiryElement options={cardElementOptions} />
        </InputWrapper>
      </Form.Item>
      <Form.Item label="CVC">
        <InputWrapper icon={CiLock}>
          <CardCvcElement options={cardElementOptions} />
        </InputWrapper>
      </Form.Item>
      <Form.Item>
        <SVButton
          title="Pay"
          loading={isProcessing}
          style={{ background: '#4d3ca3', width: '100%' }}
        />
      </Form.Item>
    </Form>
  )
}

const PaymentWrapper = ({
  service,
  processingFees,
  totalAmount,
}: {
  service: any
  processingFees: number
  totalAmount: number
}) => (
  <Elements stripe={stripePromise}>
    <div className="my-15" style={{width:"50%", margin:"auto"}}>
      <Row gutter={40} className="flex items-center">
        {/* <Col span={12} className="flex items-center h-full mt-0">
          <Image src={card} alt="card logo" className="rounded-sm" />
        </Col> */}
        <Col span={24}>
          <h2 className="text-2xl font-medium text-left  mt-5 mb-0">
            Payment Details
          </h2>
          <h5 className='mt-0 text-base font-extralight mb-8 text-left'>Please take a deep look before payment with your visa card</h5>
          <div
            className="flex justify-between w-full items-center text-left mb-5"
            style={{
              boxShadow:
                'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
            }}
          >
            <div>
              <div>
                <h3 className="font-medium text-base m-0">{service?.name}</h3>
                <p className="font-thin">{service?.subCategory}</p>
              </div>
              <div className="flex items-center">
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  style={{
                    fontSize: 14,
                    marginRight: '10px',
                    color: '#4d3ca3',
                  }}
                />
                <h4 className="text-gray-600 font-extralight">134 reviews</h4>
              </div>
            </div>
          <div className='text-right '>
          <h2 className="text-xl text-customPrimary-800 font-medium m-0">
              ${totalAmount}
            </h2>
            <small className='text-gray-400'>including tax & processing fees</small>
          </div>
          </div>
          <PaymentForm />
        </Col>
      </Row>
    </div>
  </Elements>
)

export default PaymentWrapper
