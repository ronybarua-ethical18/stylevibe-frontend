import dynamic from 'next/dynamic'
import React from 'react'

const Service = dynamic(() => import('@/components/Services/Service'), { ssr: false })

export default function SingleService() {
  return (
    <>
    <Service />
    </>
  )
}
