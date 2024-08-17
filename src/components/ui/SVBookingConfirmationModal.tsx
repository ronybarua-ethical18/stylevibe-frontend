'use client'

import React, { ReactNode, useState } from 'react'
import { Modal } from 'antd'
import SVButton from '../SVButton'
import SVBookingDetails from './SVBookingDetails'

const SVBookingConfirmationModal = ({
  width,
  service
}: {
  width: string | number,
  service:any
}): ReactNode => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(!open)

  return (
    <div>
      <SVButton
        title="Book now"
        type="primary"
        style={{
          background: '#4d3ca3',
          borderRadius: '10px',
          width: '100%',
        }}
        onClick={handleOpen}
      />

      <Modal
        width={width}
        centered
        open={open}
        footer={null}
        onCancel={handleClose}
        onClose={handleClose}
        // maskStyle={{ background: 'rgba(0,0,0,0.09)' }}
        maskAnimation={true}
      >
        <div className="text-center p-6 ">
          <h1 className="text-3xl">Booking Confirmation</h1>
          <h3 className="font-extralight text-base">
            Kindly review your booking details below. Once you're satisfied,
            proceed to confirm your booking for a seamless salon experience.
          </h3>

          <div className="w-full mt-5 p-4">
            <SVBookingDetails isModalOpen={open} service={service} />
          </div>
          {/* <Link href="/login">
          <SVButton
            type="primary"
            title="Sign up now"
            className="mt-10"
            style={{ background: '#4d3ca3', width: '100%' }}
          />
          </Link> */}
        </div>
      </Modal>
    </div>
  )
}

export default SVBookingConfirmationModal
