'use client'

import React from 'react'
import SVBreadCrumb from '../SVBreadCrumb'
import SVSettingTabs from '../SVSettingTabs'
import { useGetUserProfileQuery } from '@/redux/api/users'
import { getUserInfo } from '@/services/auth.service'

function SVSettings() {
  const loggedUser:any = getUserInfo()
  const { data: userProfile } =
    useGetUserProfileQuery(loggedUser?.userId)

  console.log('user profile', userProfile)
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
      <div className="mb-6">
        <h1 className="font-semibold text-2xl mb-0 mt-5">Settings</h1>
        <h2 className="font-extralight text-base mt-0">
          Control your profile as your need
        </h2>
      </div>
      <SVSettingTabs userProfile={userProfile?.data} />
    </div>
  )
}

export default SVSettings
