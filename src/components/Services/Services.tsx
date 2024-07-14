'use client'

import SVPageHeading from '@/components/SVPageHeading'
import SVBreadCrumb from '@/components/ui/SVBreadCrumb'
import React from 'react'
import CreateService from './CreateService'
import SVPagination from '../ui/SVPagination'
import SVServiceTabs from './components/SVServiceTabs'
import { SegmentedValue } from 'antd/es/segmented'
import useDebounce from '@/hooks/useDebounce'
import { useGetServicesQuery } from '@/redux/api/services'
import { getQueryParams } from '@/utils/getQueryParams'
import SVStatusChip from '../SVStatusChip'
import { transformingText } from '@/utils/transformingText'
import { IoEyeOutline, IoTrashOutline } from 'react-icons/io5'
import SVModal from '../ui/SVModal'
import { usePathname, useRouter } from 'next/navigation'
import { getUserInfo } from '@/services/auth.service'
import { getBreadcrumbItems } from '@/utils/getBreadcumItems'
import SVConfirmationModal from '../ui/SVConfirmationModal'

export default function Services() {
  const [activeTab, setActiveTab] = React.useState<SegmentedValue>('1')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pageNumber, setPageNumber] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const router = useRouter()
  const pathname = usePathname()

  console.log('pathname', pathname)

  const handlePageChange = (page: number, pageSize: number) => {
    setPageNumber(page)
    setLimit(pageSize)
  }

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 })
  const { query } = getQueryParams(
    pageNumber,
    limit,
    debouncedSearchTerm,
    activeTab,
  )

  const { data: services, isLoading: servicesLoading } = useGetServicesQuery({
    ...query,
  })

  const columns = [
    {
      title: 'Service name',
      dataIndex: 'name',
      render: (name: string, record: any) => (
        <span
          className="cursor-pointer"
          onClick={() => router.push(`/seller/services/${record?._id}`)}
        >
          {name}
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subCategory',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Shop name',
      render: (record: any) => record?.shop?.shopName,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      render: (availability: boolean) => (availability ? 'Available' : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => (
        <SVStatusChip status={transformingText(status)} />
      ),
    },
    {
      title: 'Action',
      align: 'right',
      render: (record: any) => (
        <div className="flex justify-end">
          <div className="flex align-baseline">
            <IoEyeOutline
              className="mr-2 text-xl cursor-pointer"
              onClick={() => router.push(`/seller/services/${record._id}`)}
            />
            <SVModal width="800px" content={<CreateService data={record} />} />
            <SVConfirmationModal buttonTitle='Confirm' item={record}  func={() =>{console.log("test")}}/>
          </div>
        </div>
      ),
    },
  ]

  const userDetails: any = getUserInfo()

  return (
    <div>
      <SVBreadCrumb items={getBreadcrumbItems(userDetails?.role, 'services')} />
      <SVPageHeading
        modalContent={
          <>
            <CreateService />
          </>
        }
        pageTitle="Services"
        pageSubTitle=""
        numberOfItems={`${services?.meta?.total || 0} services`}
        modalTitle="Create service"
        buttonTitle="Create service"
        width="800px"
      />
      <SVServiceTabs
        columns={columns}
        activeTab={activeTab}
        services={services}
        servicesLoading={servicesLoading}
        setActiveTab={setActiveTab}
        setSearchTerm={setSearchTerm}
      />

      <div className="mt-12">
        <SVPagination
          onPageChange={handlePageChange}
          defaultCurrent={1}
          total={services?.meta?.total}
        />
      </div>
    </div>
  )
}
