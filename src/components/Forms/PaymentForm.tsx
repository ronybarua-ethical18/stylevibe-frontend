import React, { useState } from 'react'
import { Col, notification, Rate, Row, Modal } from 'antd'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import SVButton from '../SVButton'
import { useCreatePaymentIntentMutation } from '@/redux/api/stripe'
import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons'
import Link from 'next/link'

const stripePromise = loadStripe(
  'pk_test_51PnMRKBfR7AXQAHn19WtEzjkCGuPKG8BmMHFqZap098kURuMhn8wuXiEEL1tg8m0QU0bryWuH3iy8ztpR3Du6hrK00BmbdnBcg',
)

const PaymentForm = ({
  paymentIntentId,
  clientSecret,
  handleClose,
}: {
  paymentIntentId: string | null
  clientSecret: string | null
  handleClose: () => void
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
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

  console.log('paymentIntentId', paymentIntentId)

  const copyToClipboard = () => {
    if (paymentIntentId) {
      navigator.clipboard.writeText(paymentIntentId)
      notification.success({
        message: 'Copied to clipboard',
        placement: 'top',
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <SVButton
          title="Pay"
          loading={isProcessing}
          style={{ background: '#4d3ca3', width: '100%', marginTop: '20px' }}
          htmlType="submit"
        />
      </form>
      <Modal
        title={null}
        visible={isSuccessModalVisible}
        onOk={() => setIsSuccessModalVisible(false)}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={null}
        width={650}
        bodyStyle={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
        centered
      >
        <CheckCircleOutlined
          style={{ fontSize: '64px', color: '#52c41a', marginBottom: '24px' }}
        />
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>
          Payment Successful!
        </h2>
        <p
          style={{
            fontSize: '18px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '400px',
          }}
          className="bg-gray-50"
        >
          <div>
            <p style={{ fontSize: '14px', color: '#888', margin: '0 0 4px' }}>
              Payment Intent ID
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
              {paymentIntentId}
            </p>
          </div>
          <CopyOutlined
            style={{ fontSize: '20px', color: '#4d3ca3', cursor: 'pointer' }}
            onClick={copyToClipboard}
          />
        </div>
        <p
          style={{
            marginBottom: '24px',
            textAlign: 'center',
          }}
          className="text-center text-gray-500 font-light text-sm"
        >
          Visit your dashboard to manage your services or request a refund.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/customer/dashboard">
            <SVButton
              title="Go to Dashboard"
              style={{
                background: '#4d3ca3',
                width: '200px',
                height: '40px',
                fontSize: '16px',
              }}
            />
          </Link>
          <SVButton
            title="Close"
            style={{
              background: '#ffffff',
              color: '#4d3ca3',
              border: '1px solid #4d3ca3',
              width: '200px',
              height: '40px',
              fontSize: '16px',
            }}
            onClick={() => setIsSuccessModalVisible(false)}
          />
        </div>
      </Modal>
    </>
  )
}

const PaymentWrapper = ({
  service,
  processingFees,
  totalAmount,
  handleClose,
}: {
  service: any
  processingFees: number
  totalAmount: number
  handleClose: () => void
}) => {
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentCreated, setIntentCreated] = useState<boolean>(false)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null) // To store the payment intent ID

  const handlePaymentIntent = async () => {
    if (!clientSecret && !intentCreated) {
      try {
        const response = await createPaymentIntent({
          amount: totalAmount,
          currency: 'usd',
          seller: service.seller,
        }).unwrap()

        setPaymentIntentId(response.data.id) // Store the payment intent ID
        setClientSecret(response.data.client_secret)
        setIntentCreated(true)
      } catch (error: any) {
        notification.error({
          message: error.data.message,
        })
      }
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
            <PaymentForm
              paymentIntentId={paymentIntentId}
              clientSecret={clientSecret}
              handleClose={handleClose}
            />
          </Col>
        </Row>
      </div>
    </Elements>
  )
}

export default PaymentWrapper
