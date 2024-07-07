import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'

const { Dragger } = Upload

interface SVUploadProps {
  images: string[];
  setImages: any;
}

const SVUplaod = ({images, setImages}:SVUploadProps) => {


  const props: UploadProps = {
    name: 'img',
    multiple: true,
    action: 'http://localhost:8000/api/v1/uploads',
    method: 'POST',
    onChange(info) {
      console.log('final info', info.fileList)
      const { status } = info.file
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
       
      }
      if (status === 'done') {
        const data:any = info.fileList.map((item) => {
            return {
                img:item.response?.data
            }
        })
        setImages(data)
        message.success(`File uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }


  console.log('images', images)
  return (
 <div>
     <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
 </div>
  )
}
export default SVUplaod
