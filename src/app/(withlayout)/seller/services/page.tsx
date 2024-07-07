import Service from '@/components/Services/Service'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Style Vibe | Seller | Services',
  description: 'This is the service page of seller',
}
export default function ServicePage() {
  return (
    <>
      <Service />
    </>
  )
}
