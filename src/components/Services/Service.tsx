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
import { getColumns } from '@/utils/getColums'

export default function Service() {
  const [activeTab, setActiveTab] = React.useState<SegmentedValue>('1')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pageNumber, setPageNumber] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

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

  return (
    <div>
      <SVBreadCrumb
        items={[
          {
            label: `seller`,
            link: `/seller`,
          },
          {
            label: `services`,
            link: `/seller/services`,
          },
        ]}
      />
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
        columns={getColumns()}
        activeTab={activeTab}
        services={services}
        servicesLoading={servicesLoading}
        setActiveTab={setActiveTab}
        setSearchTerm={setSearchTerm}
      />

      <SVPagination
        onPageChange={handlePageChange}
        defaultCurrent={1}
        total={services?.meta?.total}
      />
    </div>
  )
}
