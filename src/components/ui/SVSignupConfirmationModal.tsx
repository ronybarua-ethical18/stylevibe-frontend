'use client'

import React, { ReactNode, useState } from 'react'
import { Modal } from 'antd'
import SVButton from '../SVButton'
import Image from 'next/image'
import ModalImage from '../../assets/modal.jpg'
import { GrClose } from 'react-icons/gr'
import Link from 'next/link'

const SVSignupConfirmationModal = ({
  width,
}: {
  width: string | number
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
        closeIcon={
          <div
            style={{
              padding: '5px',
              borderRadius: '50%',
              marginRight: '30px',
              marginTop: '15px',
              background: 'white',
            }}
          >
            <GrClose
              style={{
                fontSize:"14px"
              }}
            />
          </div>
        }
        // maskStyle={{ background: 'rgba(0,0,0,0.09)' }}
        maskAnimation={true}
        wrapClassName="custom-modal-wrap"
      >
        <div className="text-center">
          <Image
            src={ModalImage}
            alt="modal image"
            style={{ height: '200px' }}
          />
          <h2 className="text-base font-normal text-center">
            For booking a service you need to create an account to our portal
          </h2>
          <h1 className="text-3xl font-medium text-center mt-5">
            Let's get started
          </h1>
          <Link href="/login">
          <SVButton
            type="primary"
            title="Sign up now"
            className="mt-10"
            style={{ background: '#4d3ca3', width: '100%' }}
          />
          </Link>
        </div>
      </Modal>
    </div>
  )
}

export default SVSignupConfirmationModal
