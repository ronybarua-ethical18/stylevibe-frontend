'use client'

import React from 'react'
import { useState } from 'react'
import SVDataTable from './SVDataTable'

export default function SVDataTableWithUtils({
  columns,
  data,
  totalPages,
  isLoading,
}: any) {

    
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('')

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log('Page:', page, 'PageSize:', pageSize)
    setPage(page)
    setSize(pageSize)
  }
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter
    setSortBy(field as string)
    setSortOrder(order === 'ascend' ? 'asc' : 'desc')
  }
  return (
    <SVDataTable
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pageSize={size}
      totalPages={totalPages}
      showSizeChanger={true}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      showPagination={false}
      
    />
  )
}
