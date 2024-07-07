import { Button, Col, Row, message } from 'antd'
import { useState } from 'react'
import FormInput from '../Forms/FormInput'
import Form from '../Forms/Form'
import FormSelectField from '../Forms/FormSelectField'
import { SERVICE_CATEGORIES, SERVICE_SUB_CATEGORIES } from '@/constants/options'
import FormTextArea from '../Forms/FormTextArea'
import SVUplaod from '../ui/SVUpload'
import { SubmitHandler } from 'react-hook-form'
import { useCreateServiceMutation } from '@/redux/api/services'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/redux/slices/globalSlice'

type FormValues = {
  name: string
  price: string
  category: string
  subCategory: string
  description: string
  images: string[]
}

export default function CreateService({ data }: any) {
  const [images, setImages] = useState([])
  const [createService] = useCreateServiceMutation()
  const dispatch = useDispatch()

  console.log("data from create service", data)

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      await createService({
        ...data,
        price: Number(data?.price),
        images,
      }).unwrap()
      setImages([])
      dispatch(closeModal(false))
    } catch (err: any) {
      message.error(err?.data?.message)
    }
  }
  return (
    <div className="p-5 bg-white">
      <h1 className="text-center text-2xl">Create Service</h1>
      <div className="mt-5">
        <Form submitHandler={onSubmit}>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <FormInput
                name="name"
                placeholder="Enter service name"
                type="text"
                label="Name"
                defaultValue={data?.name}
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <FormInput
                name="price"
                placeholder="Enter service price"
                type="number"
                label="Price"
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <FormSelectField
                name="category"
                options={SERVICE_CATEGORIES}
                placeholder="Select"
                label="Select Category"
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <FormSelectField
                name="subCategory"
                options={SERVICE_SUB_CATEGORIES}
                placeholder="Select"
                label="Select Category"
              />
            </Col>
            <Col className="gutter-row" span={24}>
              <FormTextArea
                name="description"
                placeholder="Write Description"
                label="Description"
              />
            </Col>
            <Col className="gutter-row" span={24}>
              <h2 className="text-sm font-normal mt-4">Upload Images</h2>
              <SVUplaod images={images} setImages={setImages} />
            </Col>
          </Row>
          <div className="flex justify-end mt-7">
            <Button htmlType="submit" type="primary" className="text-right">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
