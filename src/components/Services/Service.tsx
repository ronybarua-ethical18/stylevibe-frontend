"use client"

import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import SVBreadCrumb from '../ui/SVBreadCrumb'
import { getBreadcrumbItems } from '@/utils/getBreadcumItems'
import { getUserInfo } from '@/services/auth.service'

export default function Service() {
    const params:any = useParams()
   const userDetails:any = getUserInfo()
  return (
    <div>
        <SVBreadCrumb
        items={getBreadcrumbItems(userDetails?.role, "services", params)}
      />
    </div>
  )
}
