'use client'

import SVPageHeading from '@/components/SVPageHeading'
import SVStatusChip from '@/components/SVStatusChip'
import SVBreadCrumb from '@/components/ui/SVBreadCrumb'
import SVDataTableWithUtils from '@/components/ui/SVDataTableWithUtils'
import { transformingText } from '@/utils/transformingText'
import React from 'react'

export default function Customers() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Service name',
      dataIndex: 'service',
     
    },
    {
      title: 'Price',
      dataIndex: 'price',
      
    },
    {
      title: 'Service Taken (times)',
      dataIndex: 'taken',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: function (data: any) {
        const status = transformingText(data)
        return <SVStatusChip status={status} />
      },
    },
  ]

  const data = [
    {
      key: 1,
      name: 'Name 1',
      email: 'email1@example.com',
      phone: '123-456-01',
      service: 'Service 1',
      price: Math.random() * 50,
      taken: Math.floor(Math.random() * 10),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    },
    {
      key: 2,
      name: 'Name 2',
      email: 'email2@example.com',
      phone: '123-456-02',
      service: 'Service 2',
      price: Math.random() * 50,
      taken: Math.floor(Math.random() * 10),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    },
    {
      key: 3,
      name: 'Name 3',
      email: 'email3@example.com',
      phone: '123-456-03',
      service: 'Service 3',
      price: Math.random() * 50,
      taken: Math.floor(Math.random() * 10),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    },
    {
      key: 4,
      name: 'Name 4',
      email: 'email4@example.com',
      phone: '123-456-04',
      service: 'Service 4',
      price: Math.random() * 50,
      taken: Math.floor(Math.random() * 10),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    },
    {
      key: 5,
      name: 'Name 5',
      email: 'email5@example.com',
      phone: '123-456-05',
      service: 'Service 5',
      price: Math.random() * 50,
      taken: Math.floor(Math.random() * 10),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    }
  ]

  // You can use this array in your React component or wherever it's needed.

  return (
    <div>
      <SVBreadCrumb
        items={[
          {
            label: `seller`,
            link: `/seller`,
          },
          {
            label: `customers`,
            link: `/seller/customers`,
          },
        ]}
      />
      <SVPageHeading
        pageTitle="Customers"
        pageSubTitle="See your active and inactive customers and make changes"
        numberOfItems="10 customers"
      />
      <div>
        <SVDataTableWithUtils
          columns={columns}
          data={data}
          totalPages={5}
          isLoading={false}
        />
      </div>
    </div>
  )
}
