import React, { useState } from 'react'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload, Spin } from 'antd'
import Image from 'next/image'

const { Dragger } = Upload

interface SVUploadProps {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const SVUpload = ({ images, setImages }: SVUploadProps) => {
  const [uploading, setUploading] = useState(false) // Track uploading status

  const props: UploadProps = {
    name: 'img',
    multiple: true,
    action: 'http://localhost:8000/api/v1/uploads',
    method: 'POST',
    showUploadList: false, // Disable default upload list
    onChange(info) {
      const { status } = info.file

      if (status === 'uploading') {
        setUploading(true) // Show loader when uploading starts
      }

      if (status === 'done') {
        const newImages = info.fileList
          .map(item => item.response?.data)
          .filter(img => !images.includes(img)) // Filter out duplicates

        setImages(prev => [...prev, ...newImages])
        setUploading(false) // Hide loader after upload
        message.success(`File uploaded successfully.`)
      } else if (status === 'error') {
        setUploading(false) // Hide loader on error
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const handleDelete = (img: any) => {
    setImages(images.filter(image => image !== img)) // Remove selected image
  }

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
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      {uploading && (
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Spin size="large" /> {/* Ant Design loader while uploading */}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '16px',
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              marginRight: '8px',
              marginBottom: '8px',
              borderRadius: '8px',
              overflow: 'hidden',
              width: '70px',
              height: '70px',
            }}
          >
            <Image
               src={typeof img === 'string' ? img : (img as { img: string })?.img}
              alt={`Uploaded ${index}`}
              width={80}
              height={80}
              className="object-cover rounded-md border border-gray-300"
            />
            <div
              onClick={() => handleDelete(img)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <DeleteOutlined />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SVUpload
