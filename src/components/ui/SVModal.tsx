'use client'

import React, { ReactElement, ReactNode } from 'react'
import { Modal } from 'antd'
import SVButton from '../SVButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeModal,
  globalSelector,
  showModal,
} from '@/redux/slices/globalSlice'
import { LiaEdit } from 'react-icons/lia'

interface IModal {
  content: ReactElement<{ closeModal: () => void }>
  modalTitle?: string
  buttonTitle?: string
  width?: string | number
}

const SVModal = ({
  content,
  buttonTitle,
  width,
}: IModal): ReactNode => {
  const { isModalOpen } = useSelector(globalSelector)
  const dispatch = useDispatch()

  return (
    <div>
      {buttonTitle ? (
         <SVButton
         type="primary"
         title={buttonTitle}
         onClick={() => dispatch(showModal(true))}
       />
       
      ) : (
        <LiaEdit
          className="text-xl cursor-pointer"
          onClick={() => dispatch(showModal(true))}
        />
      )}
      <Modal
        // title={modalTitle}
        // mask={false}
        width={width}
        className=""
        open={isModalOpen}
        footer={null}
        onCancel={() => dispatch(closeModal(false))}
      >
        <div className=" overflow-y-scroll no-scrollbar">{content}</div>
      </Modal>
    </div>
  )
}

export default SVModal
