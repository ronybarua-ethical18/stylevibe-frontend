'use client'

import React from 'react'
import { BiEdit } from 'react-icons/bi'
import SVProfilePhotoUpload from '../SVProfileUpload'
import FormInput from '@/components/Forms/FormInput'
import { PiEnvelopeThin } from 'react-icons/pi'
import Form from '@/components/Forms/Form'
import { Divider } from 'antd'
import FormTextArea from '@/components/Forms/FormTextArea'

function SVPersonalInfo() {
  const handlePhotoChange = (base64Image: any) => {
    // Send the base64Image to your server or update your application state
    console.log('New profile photo:', base64Image)
  }
  return (
    <div>
      <h1 className="text-xl font-normal">Personal Information</h1>
      <div className="p-5 rounded-md " style={{ border: '1px solid #eee' }}>
        <div className="my-5 flex justify-between items-center">
          <div className="flex space-x-5 items-center">
            {/* <Avatar size={64} icon={<BiUser />} /> */}
            <SVProfilePhotoUpload onPhotoChange={handlePhotoChange} />
            <div className="">
              <h4 className="text-base font-medium mb-0">Jack Adams</h4>
              <h5 className="mt-0 font-light mb-0">Enterpreneur</h5>
              <h5 className="mt-0 font-light">Los angeles, California, USA</h5>
            </div>
          </div>
          <BiEdit className="text-2xl text-gray-500 cursor-pointer" />
        </div>
        <Divider />
        <Form submitHandler={() => {}}>
          <div className="my-5 grid grid-cols-2 gap-6">
            <div>
              <h1 className="mb-0 text-base font-normal ">First Name</h1>
              <FormInput
                name="firstName"
                type="text"
                size="large"
                placeholder="Enter your email"
                defaultValue="Jack"
                variant="filled"
              />
            </div>
            <div>
              <h1 className="mb-0 text-base font-normal">Last Name</h1>
              <FormInput
                name="lastName"
                type="text"
                size="large"
                placeholder="Enter your email"
                defaultValue="Adams"
                variant="filled"
              />
            </div>
            <div>
              <h1 className="mb-0 text-base font-normal mt-0">Email Address</h1>
              <FormInput
                name="lastName"
                type="text"
                size="large"
                placeholder="Enter your email"
                defaultValue="Adams"
                variant="filled"
              />
            </div>
            <div>
              <h1 className="mb-0 text-base font-normal mt-0">Password</h1>
              <FormInput
                name="lastName"
                type="text"
                size="large"
                placeholder="Enter your email"
                defaultValue="Adams"
                variant="filled"
              />
            </div>
          </div>
          <div>
            <h1 className="mb-0 text-base font-normal mt-0">Phone</h1>
            <FormInput
              name="lastName"
              type="text"
              size="large"
              placeholder="Enter your email"
              defaultValue="Adams"
              variant="filled"
            />
          </div>
          <div>
            <h1 className="mb-0 text-base font-normal mt-5">Bio</h1>
            <FormTextArea name='bio' placeholder='Write bio' rows={8} variant="filled" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SVPersonalInfo
