'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Mail, MapPin, Mars, Move, Phone, UserRound } from 'lucide-react'
import React from 'react'
import './about.css'

const MotionBox1 = () => {
  return (
    <div className="flex flex-col gap-1 cursor-default">
            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}

              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <UserRound className="mr-2" />
              <span>姓名：</span>
              <span>诗叶沐</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>

              <Mars className="mr-2" />
              <span>性别：</span>
              <span>男</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <MapPin className="mr-2" />
              <span>住址：</span>
              <span>广东 广州</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <GraduationCap className="mr-2" />
              <span>学历：</span>
              <span>2024 本科</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Move className="mr-2" />
              <span>专业：</span>
              <span>软件工程</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Phone className="mr-2" />
              <span>电话：</span>
              <span>13268077628</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 , color: '#db2777 '}}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Mail className="mr-2" />
              <span>邮箱：</span>
              <span>sym5204@163.com</span>
            </motion.div>

          </div>
  )
}

export default MotionBox1
