'use client'

import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React from 'react'

interface IButton {
  title: string
  type?: ButtonType
  style?: object
  size?: SizeType
  onClick?: any
  className?:any
}
export default function SVButton({
  type,
  size,
  title,
  style,
  onClick,
  className
}: IButton): React.ReactNode {
  return (
    <Button
      type={type || 'primary'}
      size={size || 'large'}
      style={{ ...style, fontSize: '12px' }}
      className={className}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}
