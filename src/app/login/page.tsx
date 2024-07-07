import LoginPage from '@/components/Login/Login'
import { loginMetadata } from '@/config/metaData'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = loginMetadata
export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  )
}
