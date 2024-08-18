import React, { useState } from 'react'
import { Calendar, Col, Row, Tooltip, Typography } from 'antd'
import type { Dayjs } from 'dayjs'
import { CaretDownOutlined, CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import styled from 'styled-components'
import { Select as AntSelect } from 'antd'
import { months, timeSlots } from '@/utils/dummyServices'
import { useGetSingleShopTimeSlotsQuery } from '@/redux/api/timeslots'
import { generateTimeSlots } from '@/utils/generateTimeSlots'

const StyledCalendar = styled(Calendar)`
  .ant-picker-cell-selected .ant-picker-cell-inner {
    background: #4d3ca3 !important;
    border: 1px solid #4d3ca3 !important;
  }
  .ant-picker-cell-in-view.ant-picker-cell-today
    .ant-picker-cell-inner::before {
    border: 1px solid #4d3ca3 !important;
  }
`

const Select = styled(AntSelect)`
  .ant-select-selector {
    color: #ffffff !important;
  }
`

const SVCalendar = ({ service }: { service: any }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{
    _id: string
    startTime: string
    maxResourcePerHour: number
  }>()
  const { data, error, isLoading } = useGetSingleShopTimeSlotsQuery({
    shopId: service?.shop?._id, // Path parameter
    date: selectedDate || moment().format('YYYY-MM-DD'), // Query parameter
  })

  const onDateSelect = (value: Dayjs) => {
    console.log('selected date', value.format('YYYY-MM-DD'))
    setSelectedDate(value.format('YYYY-MM-DD'))
  }

  const selectStyle = {
    width: '100%',
    fontWeight: 500,
    fontSize: '16px',
  }

  const shopTimeSlots =
    data?.data?.timeSlots ||
    generateTimeSlots(
      service?.shop?.serviceTime?.openingHour,
      service?.shop?.serviceTime?.closingHour,
      5,
    )

  console.log("generated time slots",  service?.shop,
    service?.shop?.serviceTime?.closingHour)

  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        marginTop: '20px',
        backgroundColor: 'white',
      }}
    >
      <StyledCalendar
        fullscreen={false}
        onSelect={onDateSelect} // Use onSelect to handle date selection
        headerRender={({ value, onChange }: { value: any; onChange: any }) => {
          const year = value.year()
          const month = value.month()

          return (
            <div
              style={{
                padding: '20px 24px',
                background: '#4d3ca3',
                color: 'white',
                borderBottom: '1px solid #e8e8e8',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <CalendarOutlined style={{ fontSize: 24, marginRight: 12 }} />
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: 600,
                  }}
                >
                  Plan Your Day
                </Typography.Title>
              </div>
              <Row gutter={16}>
                <Col span={12}>
                  <Select
                    size="large"
                    style={{
                      ...selectStyle,
                      color: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    value={year}
                    onChange={newYear => onChange(value.year(newYear))}
                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                    bordered={false}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: 'white' }} />
                    }
                  >
                    {Array.from({ length: 20 }, (_, i) => year - 10 + i).map(
                      y => (
                        <Select.Option key={y} value={y}>
                          {y}
                        </Select.Option>
                      ),
                    )}
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    className="no-scrollbar"
                    size="large"
                    style={{
                      ...selectStyle,
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    value={month}
                    onChange={newMonth => onChange(value.month(newMonth))}
                    bordered={false}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: 'white' }} />
                    }
                  >
                    {months.map((m, i) => (
                      <Select.Option key={i} value={i}>
                        {m}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
          )
        }}
      />
      <div className="text-left mt-5">
        <h1 className="font-light ml-1">
          Available times for{' '}
          <strong className="text-customPrimary-800 font-semibold">
            {moment(selectedDate || Date.now()).format('ll')}
          </strong>
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          //   justifyContent: 'space-between',
        }}
      >
        {shopTimeSlots.map((item: any) => (
          <Tooltip
            color="#fff"
            placement="top"
            title={
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <h3
                    className="text-customPrimary-800 flex items-center justify-center p-2 w-[40px] h-[40px] mb-0"
                    style={{
                      border: '1px solid #4d3ca3',
                      borderRadius: '50%',
                    }}
                  >
                    {item.maxResourcePerHour}
                  </h3>
                  <h4 className="font-normal text-base mt-2 text-customPrimary-800 text-center">
                    seats are available.
                  </h4>
                </div>
              </div>
            }
            overlayInnerStyle={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <div
              key={item._id}
              onClick={() => item.maxResourcePerHour > 0 && setSelectedTimeSlots(item)}
              style={{
                margin: '1%',
                width: '22%',
                marginBottom: '10px',
                padding: '5px',
                textAlign: 'center',
                borderRadius: '4px',
                cursor: item.maxResourcePerHour < 1 ? "default":'pointer',
                background:
                item.maxResourcePerHour < 1 ? "#eee":selectedTimeSlots?._id?.toString() === item?._id?.toString()
                    ? '#4d3ca3'
                    : '',
                color:
                item.maxResourcePerHour < 1 ? "gray":selectedTimeSlots?._id?.toString() === item?._id?.toString()
                    ? '#fff'
                    : 'black',
                transition: 'all 0.3s ease-in-out',
              }}
              className="border"
            >
              <span style={{ fontSize: '12px' }}>
                {item?.startTime || item?.time}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default SVCalendar
