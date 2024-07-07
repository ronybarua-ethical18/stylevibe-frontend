'use client'

import SVPageHeading from '@/components/SVPageHeading'
import SVStatusChip from '@/components/SVStatusChip'
import SVBreadCrumb from '@/components/ui/SVBreadCrumb'
import SVDataTableWithUtils from '@/components/ui/SVDataTableWithUtils'
import SVModal from '@/components/ui/SVModal'
import { transformingText } from '@/utils/transformingText'
import React from 'react'

export default function Bookings() {
  const columns = [
    {
      title: 'Service name',
      dataIndex: 'name',
    },
    {
      title: 'Service Type',
      dataIndex: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTIme',
      render: function (data: any) {
        return <>{`$${data.toFixed(2)}`}</>
      },
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
    },
    {
      title: 'Day of Week',
      dataIndex: 'dayOfWeek',
    },
    {
      title: 'Customer name',
      dataIndex: 'customerName',
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
      name: 'Service 1',
      type: 'Type A',
      price: 50.0,
      startTIme: 9.3,
      endTime: '12:00 PM',
      dayOfWeek: 'Monday',
      customerName: 'John Doe',
      status: 'PENDING',
    },
    {
      key: 2,
      name: 'Service 2',
      type: 'Type B',
      price: 75.5,
      startTIme: 10.45,
      endTime: '2:30 PM',
      dayOfWeek: 'Wednesday',
      customerName: 'Jane Doe',
      status: 'BOOKED',
    },
    {
      key: 3,
      name: 'Service 3',
      type: 'Type C',
      price: 60.25,
      startTIme: 11.15,
      endTime: '4:00 PM',
      dayOfWeek: 'Friday',
      customerName: 'Bob Smith',
      status: 'CANCELLED',
    },
    {
      key: 4,
      name: 'Service 4',
      type: 'Type A',
      price: 45.0,
      startTIme: 8.0,
      endTime: '10:30 AM',
      dayOfWeek: 'Tuesday',
      customerName: 'Alice Johnson',
      status: 'COMPLETED',
    },
    {
      key: 5,
      name: 'Service 5',
      type: 'Type B',
      price: 80.75,
      startTIme: 12.3,
      endTime: '3:45 PM',
      dayOfWeek: 'Thursday',
      customerName: 'Charlie Brown',
      status: 'PENDING',
    },
    {
      key: 6,
      name: 'Service 6',
      type: 'Type C',
      price: 55.5,
      startTIme: 10.0,
      endTime: '1:30 PM',
      dayOfWeek: 'Monday',
      customerName: 'Eva Martinez',
      status: 'BOOKED',
    },
    {
      key: 7,
      name: 'Service 7',
      type: 'Type A',
      price: 65.0,
      startTIme: 11.45,
      endTime: '4:15 PM',
      dayOfWeek: 'Wednesday',
      customerName: 'David Wilson',
      status: 'CANCELLED',
    },
    {
      key: 8,
      name: 'Service 8',
      type: 'Type B',
      price: 90.25,
      startTIme: 9.15,
      endTime: '2:00 PM',
      dayOfWeek: 'Friday',
      customerName: 'Grace Taylor',
      status: 'COMPLETED',
    },
    {
      key: 9,
      name: 'Service 9',
      type: 'Type C',
      price: 70.5,
      startTIme: 10.3,
      endTime: '12:45 PM',
      dayOfWeek: 'Tuesday',
      customerName: 'Frank White',
      status: 'PENDING',
    },
    {
      key: 10,
      name: 'Service 10',
      type: 'Type A',
      price: 40.0,
      startTIme: 8.45,
      endTime: '11:30 AM',
      dayOfWeek: 'Thursday',
      customerName: 'Helen Turner',
      status: 'BOOKED',
    },
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
            label: `bookings`,
            link: `/seller/bookings`,
          },
        ]}
      />
      <SVPageHeading
        pageTitle="Bookings"
        pageSubTitle="See your active and inactive bookings and make changes"
        numberOfItems="10 bookings"
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
