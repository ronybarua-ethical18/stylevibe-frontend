import React from 'react'
import SVProfilePhotoUpload from '../SVProfileUpload'
import { BiEdit } from 'react-icons/bi'
import SVImageGallery from '../SVImageGallery'
import { Divider } from 'antd'
import { GoLocation } from 'react-icons/go'
import { PiTimerLight } from 'react-icons/pi'
import { IoLockClosedOutline } from 'react-icons/io5'
import SVShopModal from './SVShopModal'

function SVShopInfo({ service }: any) {
  const handlePhotoChange = (base64Image: any) => {
    // Send the base64Image to your server or update your application state
    console.log('New profile photo:', base64Image)
  }

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ]
  return (
    // <div className="h-full">
    //   <h1 className="text-xl font-normal">Shop Information</h1>
    //   <div
    //     className="bg-white rounded-md p-5"
    //     style={{ border: '1px solid #eee' }}
    //   >
    //     <div className="flex space-x-5 items-center w-full">
    //       <SVImageGallery imageList={images} />
    //     </div>
    //     <Divider />
    //     <div>
    //       <h1 className="text-xl font-normal">Style Ecoz</h1>
    //       <p className="font-light mb-5 text-base">
    //         Welcome to Stylez Echo, your exclusive retreat for beauty and style.
    //         At Stylez Echo, we redefine beauty with a harmonious blend of
    //         creativity and expertise. Our dedicated team of skilled stylists and
    //         makeup artists are here to provide you with a unique and
    //         personalized experience, bringing out the best version of yourself.
    //       </p>
    //       <div
    //         className={${!service ? 'mt-0' : 'mt-8 bg-[#f6f5fb] rounded-md py-2 px-3 w-[300px]'}}
    //       >
    //         <div className="flex items-center">
    //           <GoLocation className="text-xl mr-3 text-blue-600" />

    //           <h1 className="text-base font-light my-1">
    //             {service?.shop?.location ||
    //               'Jamuna Future Park, Kuril road, Dhaka'}
    //           </h1>
    //         </div>
    //         <div className="flex items-center my-2">
    //           <PiTimerLight className="text-xl mr-3 text-blue-600" />

    //           <h1 className="text-base font-light my-0">
    //             {service?.shop?.serviceTime?.openingHour ||
    //               '9:00 AM' + '-' + service?.shop?.serviceTime?.closingHour ||
    //               '7:00 PM'}
    //           </h1>
    //         </div>
    //         <div className="flex items-center">
    //           <IoLockClosedOutline className="text-xl mr-3 text-blue-600" />

    //           <h1 className="text-base font-light mt-1 mb-0">
    //             {service
    //               ? service?.shop?.serviceTime?.offDays
    //                   ?.map(
    //                     (day: string) =>
    //                       day.charAt(0) + day.slice(1).toLowerCase(),
    //                   )
    //                   .join(', ')
    //               : 'Friday, Saturday'}
    //           </h1>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="h-[780px] border mt-12 grid place-items-center border-dashed rounded-md">
      <div>
        <SVShopModal />
        <h1 className="text-xl text-gray-500 font-light text-center">
          No shop created yet. <br /> Click plus icon to add a new shop.
        </h1>
      </div>
    </div>
  )
}

export default SVShopInfo