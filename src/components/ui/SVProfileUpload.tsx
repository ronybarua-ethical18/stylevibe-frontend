import React, { useState, ChangeEvent } from 'react'
import { PiPlus } from 'react-icons/pi'

interface ProfilePhotoUploadProps {
  maxSizeInMB?: number
  photoUrl:any,
  setPhotoUrl:any
}

const SVProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  maxSizeInMB = 5,
  photoUrl,
  setPhotoUrl
}) => {

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(`File size should not exceed ${maxSizeInMB}MB`)
      return
    }

    setIsUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('img', file)

    try {
      const response = await fetch('http://localhost:8000/api/v1/uploads', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()

      console.log("uploaded profile photo", data)
      setPhotoUrl(data?.data)
    } catch (err) {
      setError('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {photoUrl ? (
          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <label htmlFor="photo-upload" className="cursor-pointer">
            {isUploading ? (
              <span className="text-gray-400">Uploading...</span>
            ) : (
              <PiPlus className="text-gray-400" size={24} />
            )}
          </label>
        )}
      </div>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
        disabled={isUploading}
      />
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  )
}

export default SVProfilePhotoUpload