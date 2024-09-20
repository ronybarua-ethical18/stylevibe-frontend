import React from 'react'
import SVBreadCrumb from '../SVBreadCrumb'
import SVSettingTabs from '../SVSettingTabs'

function SVSettings() {
  return (
    <div>
   <SVBreadCrumb
        items={[
          {
            label: `seller`,
            link: `/seller`,
          },
          {
            label: `settings`,
            link: `/seller/settings`,
          },
        ]}
      />
      <div className='mb-6'>
        <h1 className='font-semibold text-2xl mb-0 mt-5'>Settings</h1>
        <h2 className='font-extralight text-base mt-0'>Control your profile as your need</h2>
      </div>     
      <SVSettingTabs />
    </div>
  )
}

export default SVSettings