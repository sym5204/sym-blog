'use client'
import { TextAnimate } from '@/components/magicui/text-animate'
import { motion } from 'framer-motion'
import './about.css'

const workExperience = [{ id: 1, content: '2024-7 至 2025-2 ，就职于 广州云喵科技公司 ，担任 开发工程师 一职，经手项目有【运动喵系统】、【某科技官网开发】、【某政府“百千万工程”数据可视化平台】、【低代码平台组件开发】等' }

]

const MotionBox3 = () => {
  return (
    <div>
      <h1 className="text-xl">工作经历</h1>
      <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
        {workExperience?.map(we => {
          return (
            <motion.li
              key={we.id}
              whileHover={{ x: 12, color: '#378fee  ' }}
              transition={{ duration: 0.3, }}
            >
              <TextAnimate animation="blurInUp" by="character" once delay={0.5}>
                {we.content}
              </TextAnimate>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default MotionBox3
