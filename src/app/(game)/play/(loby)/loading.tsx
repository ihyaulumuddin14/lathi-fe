import Loader from '@/components/Loader'
import React from 'react'

export default function loading() {
  return (
      <div
         className={`
            lg:ml-96 w-full lg:w-[calc(100vw-384px)] h-[60vh] lg:h-screen absolute
            top-0 left-0 overflow-y-auto overflow-x-hidden lg:mask-b-from-90%
            text-xl flex justify-between items-center
         `}>
            <Loader className='w-[50px] border-8'/>
      </div>
  )
}
