import React from 'react'

import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

const testPage = () => {
    const data = [
        {
          title: "2024",
          content: (
            <div>
              <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                Built and launched Aceternity UI and Aceternity UI Pro from scratch
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
              </div>
            </div>
          ),
        },
        {
          title: "Early 2023",
          content: (
            <div>
              <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                I usually run out of copy, but when I see content this big, I try to
                integrate lorem ipsum.
              </p>
              <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                Lorem ipsum is for people who are too lazy to write copy. But we are
                not. Here are some more example of beautiful designs I built.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
              </div>
            </div>
          ),
        },
        {
          title: "Changelog",
          content: (
            <div>
              <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                Deployed 5 new components on Aceternity today
              </p>
              <div className="mb-8">
                <div className="flex gap-2 items-center text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
                  ✅ Card grid component
                </div>
                <div className="flex gap-2 items-center text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
                  ✅ Startup template Aceternity
                </div>
                <div className="flex gap-2 items-center text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
                  ✅ Random file upload lol
                </div>
                <div className="flex gap-2 items-center text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
                  ✅ Himesh Reshammiya Music CD
                </div>
                <div className="flex gap-2 items-center text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
                  ✅ Salman Bhai Fan Club registrations open
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
                <div className='w-80 h-80 bg-green-500'></div>
              </div>
            </div>
          ),
        },
      ];
  return (
    <>
      <div className="w-full">
      <Timeline data={data} />
    </div>
    </>
  )
}

export default testPage





