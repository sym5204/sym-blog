

import EmptyDefault from '@/components/emptyDefault/EmptyDefault';
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import ImagesBox from './imagesBox';

export const metadata = {
  title: '个人收藏',
  description: '诗叶沐的个人收藏，包括图片、小说、动漫等。',
  keywords: ['个人收藏', '图片', '小说', '动漫'],
}

const Collections = () => {

  const tabs = [
    {
      label: "图片",
      id: 1,
      content: (
        <ImagesBox/>
      ),
    },
    {
      label: "小说",
      id: 2,
      content: (
        <div className="overflow-y-hidden relative mt-4 w-full h-full rounded-xl scrollbar-hide">

          <EmptyDefault />
        </div>
      ),
    },
    {
      label: "动漫",
      id: 3,
      content: (
        <div className="overflow-y-hidden relative mt-4 w-full h-full rounded-xl scrollbar-hide">

          <EmptyDefault />
        </div>
      ),
    }
  ];

  return (
    <>
      <div className="flex relative flex-col p-10 w-full rounded h-max bg-slate-100/80">
        <DirectionAwareTabs tabs={tabs} />
      </div>
    </>
  )
}

export default Collections

