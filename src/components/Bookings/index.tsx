'use client'

import SVPageHeading from '@/components/SVPageHeading'
import SVStatusChip from '@/components/SVStatusChip'
import SVBreadCrumb from '@/components/ui/SVBreadCrumb'
import SVDataTableWithUtils from '@/components/ui/SVDataTableWithUtils'
import SVModal from '@/components/ui/SVModal'
import { getBreadcrumbItems } from '@/utils/getBreadcumItems'
import { transformingText } from '@/utils/transformingText'
import React, { useState } from 'react'
import SVBookingsTabs from './SVBookingsTabs'
import { SegmentedValue } from 'antd/es/segmented'
import SVPagination from '../ui/SVPagination'
import useDebounce from '@/hooks/useDebounce'
import { getQueryParams } from '@/utils/getQueryParams'
import { useGetBookingsQuery } from '@/redux/api/bookings'
import moment from 'moment'

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<SegmentedValue>('1')
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(10)
  // const [selectedRecord, setSelectedRecord] = useState<any>(null)
  // const userDetails: any = getUserInfo()

  // const router = useRouter()
  // const dispatch = useDispatch()

  const handlePageChange = (page: number, pageSize: number) => {
    setPageNumber(page)
    setLimit(pageSize)
  }

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 })
  // const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation()
  const { query } = getQueryParams(
    pageNumber,
    limit,
    debouncedSearchTerm,
    activeTab,
  )

  const { data: bookings, isLoading: bookingsLoading } = useGetBookingsQuery({
    ...query,
  })

  console.log('bookings', bookings)
  // const handleDelete = async (serviceId: any) => {
  //   try {
  //     await deleteService(serviceId).unwrap()
  //     console.log('Service deleted successfully')
  //   } catch (error) {
  //     console.error('Failed to delete service:', error)
  //   }
  // }

  // const handleEditClick = useCallback((record: any) => {
  //   setSelectedRecord(record)
  //   dispatch(showModal(true))
  // }, [dispatch])
  const columns = [
    {
      title: 'Service name',
    //   dataIndex: 'name',
         render: function (data: any) {
        return <>{data?.serviceId?.name}</>
      },
    },
    {
      title: 'Category',
      render: function (data: any) {
        return <>{data?.serviceId?.category}</>
      },
    },
    {
      title: 'Price',
      render: function (data: any) {
        return <>{`$${data?.serviceId?.price}`}</>
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'serviceStartTime',
    //   render: function (data: any) {
    //     return <>{`$${data?.toFixed(2)}`}</>
    //   },
    },
    {
      title: 'Service Date',
      render: function (data: any) {
        return <>{`${moment(data?.shopTimeSlot?.slotFor).format('MMMM Do YYYY')}`}</>
      },
    },
    {
      title: 'Customer name',
      render: function (data: any) {
        return <>{data?.customer?.firstName + ' ' + data?.customer?.lastName}</>
      },
    },
    {
      title: 'Customer Phone',
      render: function (data: any) {
        return <>{data?.customer?.phone || 'N/A'}</>
      },
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

  return (
    <div>
      <SVBreadCrumb items={getBreadcrumbItems('bookings')} />
      <SVPageHeading
        pageTitle="Bookings"
        pageSubTitle="See your active and inactive bookings and make changes"
        numberOfItems={`${bookings?.meta?.total} bookings`}
      />
      <SVBookingsTabs
        columns={columns}
        activeTab={activeTab}
        bookings={bookings}
        bookingsLoading={bookingsLoading}
        setActiveTab={setActiveTab}
        setSearchTerm={setSearchTerm}
      />

      <div className="mt-12">
        <SVPagination
          onPageChange={handlePageChange}
          defaultCurrent={1}
          total={bookings?.meta?.total || 0}
        />
      </div>
    </div>
  )
}
