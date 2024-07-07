import React from 'react';
import { IoEyeOutline, IoTrashOutline } from 'react-icons/io5';
import { transformingText } from './transformingText';
import SVStatusChip from '@/components/SVStatusChip';
import SVModal from '@/components/ui/SVModal';
import CreateService from '@/components/Services/CreateService';

export function getColumns() {
  return [
    {
      title: 'Service name',
      dataIndex: 'name',
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
      render: (price:any) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Shop name',
      render: (record:any) => record?.shop?.shopName,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      render: (availability:any) => availability ? 'Available' : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (status:any) => React.createElement(SVStatusChip, { status: transformingText(status) }),
    },
    {
      title: 'Action',
      align: 'right',
      render: (record:any) => (
        React.createElement('div', { className: "flex justify-end" },
          React.createElement('div', { className: "flex align-baseline" },
            React.createElement(IoEyeOutline, { className: "mr-2 text-xl cursor-pointer" }),
            React.createElement(SVModal, {
              width: "800px",
              content: React.createElement(CreateService, { data: record })
            }),
            React.createElement(IoTrashOutline, { className: "text-xl cursor-pointer ml-2" })
          )
        )
      ),
    },
  ];
}