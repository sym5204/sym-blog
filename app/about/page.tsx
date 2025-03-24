'use client'
import { ShineBorder } from "@/components/magicui/shine-border"
import { Separator } from "@radix-ui/react-separator"
import { motion } from "framer-motion"
import { GraduationCap, Mail, MapPin, Mars, Move, Phone, UserRound } from "lucide-react"
import Image from "next/image"
import { Image as Image2 } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import './about.css'
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { Marquee } from "@/components/magicui/marquee"

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


const workExperience = [{ id: 1, content: '2024-7 至 2025-2 ，就职于 广州云喵科技公司 ，担任 开发工程师 一职，经手项目有【运动喵系统】、【某科技官网开发】、【某政府“百千万工程”数据可视化平台】、【低代码平台组件开发】等' }

]


const project01 = [
  {
    title: "某科技官网开发",
    description: (
      <div>
        <p>
          这是一个关于某科技公司的官网开发项目。整个项目分为 前端网页内容展示 与 后台网站内容管理。主要包含 内容资讯管理、公司风采介绍、消息推送等功能。我主要负责从 0 开发，到项目部署上线之前。
        </p>
      </div>
    ),
    content: (

      <div className="flex justify-center items-center w-full h-full text-white">
        <Image2
          src="/assets/img/tx01.png"
          width={300}
          className="object-cover w-full h-full"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "技术栈",
    description:
      (
        <div>
          <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
            <li className="hover:text-[#df4ba1] transition-all duration-300">公司自研低代码平台</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Vue2</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">PgSql</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Css</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">JavaStript</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">......</li>
          </ul>
        </div>
      ),
    content: (
      <div className="flex flex-col h-full w-full gap-5 justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] cursor-default text-white">
        <h1 className="w-full text-xl text-center">技术栈</h1>
        <div className="flex flex-row justify-around">
          <span>公司自研低代码平台</span>
          <span>Vue2</span>
        </div>
        <div className="flex flex-row justify-around">
          <span>PgSql</span>
          <span>Css</span>
          <span>JavaStript</span>
        </div>
        <div className="w-full text-center">......</div>
      </div>
    ),
  },
  {
    title: "项目职责",
    description: (
      <div>
        <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
          <li className="hover:text-[#f48511] transition-all duration-300">
            作为项目主要负责人，根据客户的需求清单进行评审、系统设计、代码走查、项目管理、与客户及时沟通处理需求反馈等工作
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，设计网页后台管理系统，进行页面内容的管理，包括内容管理、图片管理、视频管理、文件管理等
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，根据客户提供的设计稿，进行页面内容的开发，包括响应式页面布局、页面样式、页面交互等
          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/tx02.png',
            '/assets/img/tx03.png'
          ]}
        >
          <Image2
            src="/assets/img/tx02.png"
            width={300}
            className="object-cover w-full h-full"
          />
        </Image2.PreviewGroup>
      </div>
    ),
  }
];

const project02 = [
  {
    title: "某科技官网开发",
    description: (
      <div>
        <p>
          这是一个关于某科技公司的官网开发项目。整个项目分为 前端网页内容展示 与 后台网站内容管理。主要包含 内容资讯管理、公司风采介绍、消息推送等功能。我主要负责从 0 开发，到项目部署上线之前。
        </p>
      </div>
    ),
    content: (

      <div className="flex justify-center items-center w-full h-full text-white">
        <Image2
          src="/assets/img/tx01.png"
          width={300}
          className="object-cover w-full h-full"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "技术栈",
    description:
      (
        <div>
          <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
            <li className="hover:text-[#df4ba1] transition-all duration-300">公司自研低代码平台</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Vue2</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">PgSql</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Css</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">JavaStript</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">......</li>
          </ul>
        </div>
      ),
    content: (
      <div className="flex flex-col h-full w-full gap-5 justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] cursor-default text-white">
        <h1 className="w-full text-xl text-center">技术栈</h1>
        <div className="flex flex-row justify-around">
          <span>公司自研低代码平台</span>
          <span>Vue2</span>
        </div>
        <div className="flex flex-row justify-around">
          <span>PgSql</span>
          <span>Css</span>
          <span>JavaStript</span>
        </div>
        <div className="w-full text-center">......</div>
      </div>
    ),
  },
  {
    title: "项目职责",
    description: (
      <div>
        <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
          <li className="hover:text-[#f48511] transition-all duration-300">
            作为项目主要负责人，根据客户的需求清单进行评审、系统设计、代码走查、项目管理、与客户及时沟通处理需求反馈等工作
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，设计网页后台管理系统，进行页面内容的管理，包括内容管理、图片管理、视频管理、文件管理等
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，根据客户提供的设计稿，进行页面内容的开发，包括响应式页面布局、页面样式、页面交互等
          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/tx02.png',
            '/assets/img/tx03.png'
          ]}
        >
          <Image2
            src="/assets/img/tx02.png"
            width={300}
            className="object-cover w-full h-full"
          />
        </Image2.PreviewGroup>
      </div>
    ),
  }
];

const project03 = [
  {
    title: "某科技官网开发",
    description: (
      <div>
        <p>
          这是一个关于某科技公司的官网开发项目。整个项目分为 前端网页内容展示 与 后台网站内容管理。主要包含 内容资讯管理、公司风采介绍、消息推送等功能。我主要负责从 0 开发，到项目部署上线之前。
        </p>
      </div>
    ),
    content: (

      <div className="flex justify-center items-center w-full h-full text-white">
        <Image2
          src="/assets/img/tx01.png"
          width={300}
          className="object-cover w-full h-full"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "技术栈",
    description:
      (
        <div>
          <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
            <li className="hover:text-[#df4ba1] transition-all duration-300">公司自研低代码平台</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Vue2</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">PgSql</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">Css</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">JavaStript</li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">......</li>
          </ul>
        </div>
      ),
    content: (
      <div className="flex flex-col h-full w-full gap-5 justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] cursor-default text-white">
        <h1 className="w-full text-xl text-center">技术栈</h1>
        <div className="flex flex-row justify-around">
          <span>公司自研低代码平台</span>
          <span>Vue2</span>
        </div>
        <div className="flex flex-row justify-around">
          <span>PgSql</span>
          <span>Css</span>
          <span>JavaStript</span>
        </div>
        <div className="w-full text-center">......</div>
      </div>
    ),
  },
  {
    title: "项目职责",
    description: (
      <div>
        <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
          <li className="hover:text-[#f48511] transition-all duration-300">
            作为项目主要负责人，根据客户的需求清单进行评审、系统设计、代码走查、项目管理、与客户及时沟通处理需求反馈等工作
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，设计网页后台管理系统，进行页面内容的管理，包括内容管理、图片管理、视频管理、文件管理等
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            基于公司自研的低代码平台，根据客户提供的设计稿，进行页面内容的开发，包括响应式页面布局、页面样式、页面交互等
          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/tx02.png',
            '/assets/img/tx03.png'
          ]}
        >
          <Image2
            src="/assets/img/tx02.png"
            width={300}
            className="object-cover w-full h-full"
          />
        </Image2.PreviewGroup>
      </div>
    ),
  }
];




const About = () => {

  return (
    <>
      <div className="flex flex-row relative p-10 w-full bg-slate-100/90 rounded min-h-[600px] h-max">
        <div className="flex sticky top-0 flex-col gap-4 justify-center h-max">

          <div className="flex relative flex-col justify-center items-center w-full">
            <div className="relative p-1 w-max rounded-full shadow-lg transition-all duration-300 shadow-cyan-500 h-max hover:scale-110">
              <ShineBorder
                shineColor={["#0ea59e", "#22c55e", "#FFBE7B"]}
                className="bg-green-500 transition-all duration-300 hover:scale-110"
                borderWidth={3}
              />
              <Image src="/assets/img/A01.jpg" alt="logo" width={120} height={120} className="flex rounded-full transition-all duration-300 hover:scale-110" />
            </div>
          </div>



          <Separator orientation={'horizontal'} className="h-[1px] bg-black  rounded" />

          <div className="flex flex-col gap-1 cursor-default">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}

              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <UserRound className="mr-2" />
              <span>姓名：</span>
              <span>诗叶沐</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>

              <Mars className="mr-2" />
              <span>性别：</span>
              <span>男</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <MapPin className="mr-2" />
              <span>住址：</span>
              <span>广东 广州</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <GraduationCap className="mr-2" />
              <span>学历：</span>
              <span>2024 本科</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Move className="mr-2" />
              <span>专业：</span>
              <span>软件工程</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Phone className="mr-2" />
              <span>电话：</span>
              <span>13268077628</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="flex flex-row items-center text-xl" style={{ fontFamily: 'cursive' }}>
              <Mail className="mr-2" />
              <span>邮箱：</span>
              <span>sym5204@163.com</span>
            </motion.div>

          </div>

          <Separator orientation={'horizontal'} className=" h-[1px] bg-black  rounded" />

          <div className="flex flex-col gap-1 dymanic-icon">
            <ul className="">
              <li className=" py-[10px]" style={{
                '--startColor': '#86efac',
                '--endColor': '#16a34a'
              } as React.CSSProperties}>
                <svg
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1584" width="30" height="30"><path d="M860.605629 794.818297c62.708204-46.846958 98.367355-114.1232 98.367355-186.606025 0-124.932384-107.687628-228.428549-246.699682-244.213048C694.076872 220.944088 555.24799 113.231901 388.674207 113.231901c-179.531909 0-325.59352 126.529765-325.59352 282.053887 0 83.857896 41.801035 161.656797 115.204835 215.374232-4.007267 17.577331-18.09717 54.55757-33.920554 88.097454-5.649674 11.969613-2.604314 26.240641 7.435343 34.864042 5.481851 4.711302 12.313443 7.104815 19.174712 7.104815 5.701862 0 11.423167-1.656733 16.407692-5.008061 43.098587-28.994358 97.121991-61.827137 114.845655-68.413136 28.04166 6.659677 57.092299 10.037611 86.445838 10.037611 4.737908 0 9.487072-0.106424 14.228049-0.283456 34.393321 102.412484 143.480832 177.460738 272.38876 177.460738 25.082258 0 49.906643-2.834558 73.892941-8.425903 15.937994 6.405897 60.865229 33.805944 96.594989 57.83522 4.983501 3.351328 10.709923 5.008061 16.411785 5.008061 6.860245 0 13.69286-2.393513 19.174712-7.104815 10.039657-8.627495 13.0799-22.899546 7.430226-34.868135C876.128161 840.123133 864.618013 810.354132 860.605629 794.818297zM388.674207 618.510826c-26.480094 0-52.621475-3.240811-77.698616-9.637498-8.704243-2.219551-20.735253-5.278213-78.948073 28.728298 8.795317-29.173436 10.527774-54.349839-9.790994-67.964928-63.757093-42.723034-100.32494-106.271372-100.32494-174.348863 0-123.085316 119.667473-223.224014 266.762623-223.224014 133.450385 0 244.903779 81.280188 263.931135 190.632735-145.854902 10.06831-260.996293 116.333542-260.996293 245.51674 0 3.439332 0.103354 6.858198 0.265036 10.263761C390.806777 618.486266 389.739469 618.510826 388.674207 618.510826zM815.865659 754.429425c-17.149589 11.485589-18.159592 30.708396-12.754488 53.204759-31.210839-17.527189-45.367257-21.324678-53.827953-21.324678-3.471055 0-5.984295 0.636496-8.320503 1.235131-21.185508 5.405103-43.284829 8.143471-65.671699 8.143471-123.985826 0-224.852094-84.099397-224.852094-187.476859 0-103.374392 100.866269-187.474812 224.852094-187.474812s224.852094 84.099397 224.852094 187.474812C900.142088 665.24522 869.420389 718.541053 815.865659 754.429425z" fill="#ffffff" p-id="1585"></path><path d="M246.388597 322.556347a39.957 36.191 0 1 0 81.776492 0 39.957 36.191 0 1 0-81.776492 0Z" fill="#ffffff" p-id="1586"></path><path d="M458.879152 322.556347a39.957 36.191 0 1 0 81.776492 0 39.957 36.191 0 1 0-81.776492 0Z" fill="#ffffff" p-id="1587"></path><path d="M566.159504 530.367323a32.066 29.044 0 1 0 65.626673 0 32.066 29.044 0 1 0-65.626673 0Z" fill="#ffffff" p-id="1588"></path><path d="M729.48429 530.367323a32.066 29.044 0 1 0 65.626673 0 32.066 29.044 0 1 0-65.626673 0Z" fill="#ffffff" p-id="1589"></path></svg>
                <span>微信</span>

                <Image src="/assets/img/wechat-orc.jpg" alt="wechat" width={100} height={100} className=" orc rounded flex absolute top-[60px] transition-all duration-800" />

              </li>

              <Link
                href={'https://github.com/sym5204'}
                target="blank"
              >
                <li
                  className=" py-[10px] rounded-full" style={{
                    '--startColor': '#ffa9c6',
                    '--endColor': '#f434c2'
                  } as React.CSSProperties}>
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3651" width="30" height="30"><path d="M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z" fill="#ffffff" p-id="3652"></path></svg>


                  <span>Github</span>
                </li>

              </Link>

              <li className=" py-[10px] rounded-full" style={{
                '--startColor': '#56ccf2',
                '--endColor': '#2f80ed'
              } as React.CSSProperties}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2644" width="30" height="30"><path d="M870.4512 555.008a273.92 273.92 0 0 0-55.296-99.328v-4.096a153.6 153.6 0 0 0-17.408-71.68 291.84 291.84 0 0 0-285.696-292.864 291.328 291.328 0 0 0-285.184 293.376 153.6 153.6 0 0 0-17.408 71.168v3.072a282.624 282.624 0 0 0-55.808 102.4c-27.136 89.088-21.504 190.976 41.472 212.992l12.288 3.072c-8.704 14.336-13.312 30.8224-13.312 47.616 0 68.608 74.752 118.272 177.664 118.272a235.52 235.52 0 0 0 131.072-35.328h18.432a235.008 235.008 0 0 0 130.56 35.328c102.4 0 178.176-51.2 178.176-118.272a87.552 87.552 0 0 0-13.824-47.616 51.2 51.2 0 0 0 12.8-3.072c62.976-24.064 68.608-125.952 41.472-215.04z m-77.824 132.608a33.792 33.792 0 0 0-30.72-12.8 33.792 33.792 0 0 0-27.648 18.944 346.112 346.112 0 0 1-23.552 36.864 36.352 36.352 0 0 0-6.144 30.72 35.84 35.84 0 0 0 20.48 24.064c20.992 9.216 34.304 22.016 34.304 33.28 0 22.016-46.08 46.592-107.52 46.592a153.6 153.6 0 0 1-96.256-27.648 35.84 35.84 0 0 0-25.6-8.704 204.8 204.8 0 0 1-35.328 0 34.816 34.816 0 0 0-26.112 8.704 153.6 153.6 0 0 1-96.768 27.648c-61.44 0-107.008-24.576-107.008-46.592 0-11.264 13.312-24.064 34.816-33.28a36.864 36.864 0 0 0 13.824-55.296 247.296 247.296 0 0 1-23.04-36.864 37.376 37.376 0 0 0-27.648-18.944 37.888 37.888 0 0 0-31.232 12.8 72.704 72.704 0 0 1-12.8 13.312 167.936 167.936 0 0 1 0-124.416 209.92 209.92 0 0 1 51.2-83.456 35.328 35.328 0 0 0 10.752-31.744 68.608 68.608 0 0 1 0-10.24 86.528 86.528 0 0 1 11.776-40.96 41.984 41.984 0 0 0 5.12-24.576 220.16 220.16 0 0 1 214.528-226.304 221.184 221.184 0 0 1 215.04 227.84 33.28 33.28 0 0 0 5.12 20.992c8.0384 13.312 12.4416 28.4672 12.8 44.032 0.256 3.584 0.256 7.168 0 10.752a37.376 37.376 0 0 0 9.216 30.72 204.8 204.8 0 0 1 51.2 82.944 176.128 176.128 0 0 1 3.584 123.904 40.96 40.96 0 0 1-16.384-12.288z" fill="#ffffff" p-id="2645"></path></svg>


                <span>QQ</span>

                <Image src="/assets/img/qq-orc.jpg" alt="QQ" width={100} height={100} className=" orc rounded flex absolute top-[60px] transition-all duration-800" />

              </li>

            </ul>

          </div>

        </div>

        <div className="flex flex-col flex-1 gap-5 my-5 ml-10">
          <div className="flex flex-col p-5 w-full rounded shadow-md bg-slate-100/90">
            <div className="w-full">
              <h1 className="text-xl">专业技能</h1>
              <div className="flex flex-row gap-4 justify-between items-center w-full">
                <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
                  {skills?.map(skill => {
                    return (
                      <motion.li
                        key={skill.id}
                        whileHover={{ x: 12, color: '#378fee  ' }}
                        transition={{ duration: 0.3, }}
                      >{skill.content}</motion.li>
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
            <div>
              <h1 className="text-xl">工作经历</h1>
              <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
                {workExperience?.map(we => {
                  return (
                    <motion.li
                      key={we.id}
                      whileHover={{ x: 12, color: '#378fee  ' }}
                      transition={{ duration: 0.3, }}
                    >{we.content}</motion.li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <h1 className="p-4 mt-2 text-xl">项目经验</h1>
          </div>
          <div className="py-4 w-full">
            <StickyScroll content={project01} />
          </div>
          <div className="py-4 w-full">
            <StickyScroll content={project02} />
          </div>
          <div className="py-4 w-full">
            <StickyScroll content={project03} />
          </div>
        </div>

      </div>
    </>

  )
}

export default About