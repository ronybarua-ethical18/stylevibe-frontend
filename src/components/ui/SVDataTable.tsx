'use client'

import { Table } from 'antd'

type UMTableProps = {
  loading?: boolean
  columns: any
  dataSource: any
  pageSize?: number
  totalPages?: number
  showSizeChanger?: boolean
  onPaginationChange?: (page: number, pageSize: number) => void
  onTableChange?: (pagination: any, filter: any, sorter: any) => void
  showPagination?: boolean
}

const SVDataTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      )
    },
    // getCheckboxProps: (record: any) => ({
    //   name: record.name,
    // }),
  }

  return (
    <Table
      rowSelection={{
        ...rowSelection,
      }}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  )
}

export default SVDataTable
