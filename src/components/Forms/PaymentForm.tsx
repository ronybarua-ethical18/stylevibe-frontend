import React, { useState } from 'react'
import { Col, notification, Rate, Row } from 'antd'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import SVButton from '../SVButton'
import { useCreatePaymentIntentMutation } from '@/redux/api/stripe'

const stripePromise = loadStripe(
  'pk_test_51PnMRKBfR7AXQAHn19WtEzjkCGuPKG8BmMHFqZap098kURuMhn8wuXiEEL1tg8m0QU0bryWuH3iy8ztpR3Du6hrK00BmbdnBcg',
)

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://localhost:3000/payment-success",
      },
    });

    if (result.error) {
      console.log(result.error.message);
      // Show error to your customer
    } else {
      // Payment succeeded, handle accordingly
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <SVButton
        title="Pay"
        loading={isProcessing}
        style={{ background: '#4d3ca3', width: '100%', marginTop: '20px' }}
        htmlType="submit"
      />
    </form>
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
}) => {
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const handlePaymentIntent = async () => {
    try {
      const response = await createPaymentIntent({
        amount: totalAmount,
        currency: 'usd',
        seller: service.seller,
      }).unwrap()
      console.log(response)
      setClientSecret(response.data.client_secret)
    } catch (error:any) {
      notification.error({
        message: error.data.message,
      })
    }
  }

  React.useEffect(() => {
    handlePaymentIntent()
  }, [])

  if (!clientSecret) {
    return <div>Loading...</div>
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="my-15" style={{ width: '50%', margin: 'auto' }}>
        <Row gutter={40} className="flex items-center">
          <Col span={24}>
            <h2 className="text-2xl font-medium text-left  mt-5 mb-0">
              Payment Details
            </h2>
            <h5 className="mt-0 text-base font-extralight mb-8 text-left">
              Please review before making your payment
            </h5>
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
              <div className="text-right ">
                <h2 className="text-xl text-customPrimary-800 font-medium m-0">
                  ${totalAmount}
                </h2>
                <small className="text-gray-400">
                  including tax & processing fees
                </small>
              </div>
            </div>
            <PaymentForm />
          </Col>
        </Row>
      </div>
    </Elements>
  )
}

export default PaymentWrapper