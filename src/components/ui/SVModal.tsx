'use client'

import React, { ReactNode } from 'react'
import { Modal } from 'antd'
import SVButton from '../SVButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeModal,
  globalSelector,
  showModal,
} from '@/redux/slices/globalSlice'
import { LiaEdit } from 'react-icons/lia'
import { usePathname } from 'next/navigation'
import CreateService from '../Services/CreateService'

interface IModal {
  modalTitle?: string
  buttonTitle?: string
  width?: string | number
  data?: any
  isOpen?: boolean
  setSelectedRecord?: any
}

const SVModal = ({
  buttonTitle,
  width,
  data,
  setSelectedRecord,
}: IModal): ReactNode => {
  const { isModalOpen } = useSelector(globalSelector)
  const dispatch = useDispatch()
  const pathname = usePathname()
  const adminPath = pathname === '/admin/services'
  

  const renderContent = (): any => {
    if (pathname === '/seller/services' || data) {
      if(data){
        return <CreateService savedData={data} />
      }
      return <CreateService  />
    } else {
      return <>Different modal content</>
    }
  }

  return (
    <div>
      {adminPath && buttonTitle === "Create service" ? <></>:buttonTitle ? (
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
        width={width}
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setSelectedRecord(null)
          dispatch(closeModal(false))
        }}
        onClose={() => {
          setSelectedRecord(null)
          dispatch(closeModal(false))
        }}
        maskStyle={{ background: 'rgba(0,0,0,0.09)' }}
        maskAnimation={true}
      >
        <div
          className="overflow-y-scroll no-scrollbar"
          style={{ height: '90%' }}
        >
          {renderContent()}
        </div>
      </Modal>
    </div>
  )
}

export default SVModal
