'use client'

import React from 'react'
import { Segmented } from 'antd'
import type { SegmentedValue } from 'antd/es/segmented'
import { CiUser } from 'react-icons/ci'
import { FaShopware } from 'react-icons/fa6'
import { CiCreditCard2 } from 'react-icons/ci'
import SVPersonalInfo from './settings/SVPersonalInfo'
import SVShopInfo from './settings/SVShopInfo'

const SVSettingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<SegmentedValue>('1')

  const items = [
    {
      value: '1',
      label: 'Profile',
      chipTitle: '',
      icon: <CiUser />,
    },
    {
      value: '2',
      label: 'Stripe Account',
      chipTitle: 'pending',
      icon: <CiCreditCard2 />,
    },
  ]

  const handleTabChange = (value: SegmentedValue) => {
    setActiveTab(value)
  }
  const renderContent = () => {
    return (
      <div className="p-5 h-full bg-white">
        {activeTab === '1' ? (
          <>
            <div className="grid grid-cols-2 gap-10">
              <SVPersonalInfo />
              <SVShopInfo />
            </div>
          </>
        ) : (
          <div>Stripe account</div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="py-3 px-3 rounded-md bg-white flex justify-between">
        <Segmented
          options={items.map(item => ({
            value: item.value,
            label: (
              <div className="flex items-center px-1 py-2">
                {/* <SVTabChip title={item.chipTitle} value={item.chipValue} /> */}
                <div
                  className={`${activeTab === item.value ? 'text-blue-500 text-lg' : 'inherit'}`}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    marginLeft: 8,
                    fontWeight: activeTab === item.value ? 400 : 400,
                  }}
                  className={`${activeTab === item.value ? 'text-blue-500' : 'inherit'} text-sm`}
                >
                  {item.label}
                </span>
              </div>
            ),
          }))}
          value={activeTab}
          onChange={handleTabChange}
        />
      </div>
      <div style={{ marginTop: 16 }}>{renderContent()}</div>
    </div>
  )
}

export default SVSettingTabs
