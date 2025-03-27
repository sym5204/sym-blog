'use client'
import { Marquee } from '@/components/magicui/marquee'
import { TextAnimate } from '@/components/magicui/text-animate'
import { motion } from 'framer-motion'
import './about.css'

const skills = [
  { id: 1, content: '熟悉前端基础 HTML CSS ES6+ JS TS 语法。' },
  { id: 2, content: '熟悉 Vue2 Vue3 全家桶，熟悉 ElementPlus VantUI ，熟悉 Vue 原理' },
  { id: 3, content: '熟悉 Next.js、Nuxt.js 等服务端框架，熟悉SEO，用过 Mongodb MySQL PgSql' },
  { id: 7, content: '熟悉 React 和 Hooks 语法，熟悉 AntD' },
  { id: 4, content: '熟悉 Java ，用过SpringBoot 框架进行项目开发' },
  { id: 5, content: '熟悉 ApiFox、 Postman ，能熟练运用进行API接口测试' },
  { id: 6, content: '熟悉计算机网络基础知识，理解网络通信原理' },
  { id: 8, content: '熟悉 Git 相关知识，使用 git 相关操作进行协同开发' }
]

const skillList = [{ id: 1, label: 'HTML' }, { id: 2, label: 'CSS' },
{ id: 3, label: 'JavaScript' }, { id: 4, label: 'Vue' }, { id: 5, label: 'React' }, { id: 6, label: 'Next.js' },
{ id: 7, label: 'Nuxt.js' }, { id: 8, label: 'Java' }, { id: 9, label: 'MySql' }, { id: 10, label: 'MongoDB' }, { id: 11, label: 'TypeScript' }
]

const MotionBox2 = () => {
  return (
    <div className='w-full'>
      <h1 className="text-xl">专业技能</h1>
      <div className="flex flex-row gap-4 justify-between items-center w-full">
        <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
          {skills?.map(skill => {
            return (
              <motion.li
                key={skill.id}
                whileHover={{ x: 12, color: '#378fee' }}
                transition={{ duration: 0.3, }}
              >
                <TextAnimate animation="blurInUp" by="character" once delay={0.5}>
                  {skill.content}
                </TextAnimate>

              </motion.li>
            )
          })}
        </ul>

        <div className=" relative w-[120px] rounded h-[240px] bg-slate-100 overflow-hidden cursor-default">
          <Marquee
            pauseOnHover vertical
            className="flex flex-col items-center [--duration:20s]">
            {skillList?.map(skill => {
              return (
                <div key={skill.id} className="w-[100px] px-4 py-2 flex flex-row justify-center items-center bg-gradient-to-r from-[#86efac] to-[#16a34a] rounded-full text-white  text-center">
                  {skill.label}
                </div>
              )
            })}
          </Marquee>
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b pointer-events-none h-[20px] from-background"></div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t pointer-events-none h-[20px] from-background"></div>
        </div>
      </div>
    </div>

  )
}

export default MotionBox2
