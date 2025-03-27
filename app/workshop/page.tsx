import EmptyDefault from '@/components/emptyDefault/EmptyDefault'
import React from 'react'

export const metadata = {
  title: '个人工坊',
  description: '诗叶沐的个人工坊，主要分享一些自己制作的小工具如互动UI组件，网页特效等',
  keywords: ['诗叶沐', '工作坊', '工作经验', '工作技巧', '个人博客', 'workshop', 'works', 'tools'], 
}

const Workshop = () => {
    return (
        <>
            <div className="flex relative flex-row w-full min-h-full h-max">
                <EmptyDefault />
            </div>
      </>
  )
}

export default Workshop
