import React, { useState, ChangeEvent } from 'react'
import { FaEye } from 'react-icons/fa'
import { BiTrash } from 'react-icons/bi'
import { PiPlus } from 'react-icons/pi'

interface ProfilePhotoUploadProps {
  onPhotoChange: (base64Image: string | null) => void
  maxSizeInMB?: number
}

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onPhotoChange,
  maxSizeInMB = 5,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size should not exceed ${maxSizeInMB}MB`)
        return
      }

      try {
        const base64 = await getBase64(file)
        setPhotoUrl(base64)
        onPhotoChange(base64)
        setError('')
      } catch (err) {
        setError('Error processing the image')
      }
    }
  }

  const handleDelete = () => {
    setPhotoUrl('')
    onPhotoChange(null)
  }

  const handlePreview = () => {
    window.open(photoUrl, '_blank')
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <FaEye
                  className="text-white cursor-pointer mr-2"
                  size={24}
                  onClick={handlePreview}
                />
                <BiTrash
                  className="text-white cursor-pointer ml-2"
                  size={24}
                  onClick={handleDelete}
                />
              </div>
            )}
          </>
        ) : (
          <label htmlFor="photo-upload" className="cursor-pointer">
            <PiPlus className="text-gray-400" size={24} />
          </label>
        )}
      </div>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
      {/* {error && (
        <Alert variant="destructive" className="mt-4">
          {error}
        </Alert>
      )} */}
    </div>
  )
}

export default ProfilePhotoUpload
