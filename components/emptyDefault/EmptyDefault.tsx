'use client'

import React from 'react'



const EmptyDefault = () => {
  return (
      <div className='relative flex flex-col items-center justify-center w-full h-full bg-[#fefcfe] place-content-center opacity-90 p-10 rounded '>
          
          <img src={"/assets/img/default.gif"} alt="empty" className='object-contain w-1/3 h-1/3' />
          <span className='mt-4 text-xl text-center cursor-default text-neutral-900'>暂无内容，敬请期待</span>
      
    </div>
  )
}

export default EmptyDefault
