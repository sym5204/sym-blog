'use client'
import { TextAnimate } from '@/components/magicui/text-animate'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { Image as Image2 } from "antd"
import Link from 'next/link'
import './about.css'

const project01 = [
  {
    title: "某科技官网开发",
    description: (
      <div className="cursor-default">

        <TextAnimate animation="blurInUp" by="character" delay={0.5}>
          这是一个关于某科技公司的官网开发项目。整个项目分为 前端网页内容展示 与 后台网站内容管理。主要包含 内容资讯管理、公司风采介绍、消息推送等功能。我主要负责从 0 开发，到项目部署上线之前。
        </TextAnimate>

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
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                公司自研低代码平台
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Vue2
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                PgSql
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Css
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                JavaStript
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                ......
              </TextAnimate>
            </li>
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
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              作为项目主要负责人，根据客户的需求清单进行评审、系统设计、代码走查、项目管理、与客户及时沟通处理需求反馈等工作
            </TextAnimate>


          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              基于公司自研的低代码平台，设计网页后台管理系统，进行页面内容的管理，包括内容管理、图片管理、视频管理、文件管理等
            </TextAnimate>


          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              基于公司自研的低代码平台，根据客户提供的设计稿，进行页面内容的开发，包括响应式页面布局、页面样式、页面交互等
            </TextAnimate>


          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/tx02.png',
            '/assets/img/tx03.png',
            '/assets/img/tx04.png'
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
    title: "大屏数据可视化平台",
    description: (
      <div className="cursor-default">

        <TextAnimate animation="blurInUp" by="character" delay={0.5}>

          这是一个关于大屏数据可视化平台开发项目，服务于某地级市政府。整个项目分为 前端大屏展示 与 后台数据上报管理。主要包含 数据收集、企业管理、群众上报、消息推送等功能。我主要负责大屏数据可视化数据的绑定与后台对应的数据处理业务逻辑，以及地图标注点的展示与交互事件等。
        </TextAnimate>
      </div>
    ),
    content: (

      <div className="flex justify-center items-center w-full h-full text-white">
        <Image2
          src="/assets/img/juntang01.png"
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
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                公司自研低代码平台
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Vue2
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                PgSql
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Css
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Element-UI
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Echarts
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                JavaStript
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                ......
              </TextAnimate>
            </li>
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
        <div className="flex flex-row justify-around">
          <span>Echarts</span>
          <span>Element-UI</span>
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
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              作为项目开发工程师，根据技术总监的要求，完成项目需求的开发与测试，参与项目问题的探讨与解决。
            </TextAnimate>

          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              基于公司自研的低代码平台，根据项目需求清单，对各种数据进行数据表设计与存储，实现后台的数据处理业务逻辑。
            </TextAnimate>

          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              基于公司自研的低代码平台，根据技术总监的大型数据可视化模板，对页面进行二次开发与调整，包括地图标注点的展示与交互事件、展示数据指标的科技风格样式等。
            </TextAnimate>

          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/juntang02.png',
            '/assets/img/juntang03.png'

          ]}
        >
          <Image2
            src="/assets/img/juntang02.png"
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
    title: "企业人力资源管理系统",
    description: (
      <div className="cursor-default">

        <TextAnimate animation="blurInUp" by="character" delay={0.5}>
          这是一个企业人力资源管理系统开发项目，作为本人毕设检验修学成果。整个项目主要包含 员工管理、部门管理、权限管理、薪资管理、考勤管理、请假管理等功能。
        </TextAnimate>
      </div>
    ),
    content: (

      <div className="flex justify-center items-center w-full h-full text-white">
        <Image2
          src="/assets/img/hr02.png"
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
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Java
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Vue2
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                MySql
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Css
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Element-UI
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                Echarts
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                JavaStript
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                SpringBoot
              </TextAnimate>
            </li>
            <li className="hover:text-[#df4ba1] transition-all duration-300">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                ......
              </TextAnimate>
            </li>
          </ul>
        </div>
      ),
    content: (
      <div className="flex flex-col h-full w-full gap-5 justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] cursor-default text-white">
        <h1 className="w-full text-xl text-center">技术栈</h1>
        <div className="flex flex-row justify-around">
          <span>Java</span>
          <span>Vue2</span>
        </div>
        <div className="flex flex-row justify-around">
          <span>MySql</span>
          <span>SpringBoot</span>
          <span>JavaStript</span>
        </div>
        <div className="flex flex-row justify-around">
          <span>Echarts</span>
          <span>Element-UI</span>
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
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              作为全栈开发工程师，根据软件工程专业的毕设要求，进行项目管理、项目开发、项目测试、项目部署等工作。
            </TextAnimate>

          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              后端使用 SpringBoot + MyBatis + MySql 进行开发，实现了用户登录、部门管理、员工管理、权限管理、薪资管理、考勤管理、请假管理等功能。
            </TextAnimate>

          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              前端使用 Vue2 + Element-UI + Echarts 进行开发，实现了简约清新的界面风格。
            </TextAnimate>
          </li>

          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              项目采用前后端分离的开发模式，实现了前后端数据的交互与传输，利用 Apifox 进行 API 接口测试与调试。
            </TextAnimate>
          </li>

          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              整个项目开发使用 Git，远程仓库放在 Gitee 上。
            </TextAnimate>

          </li>

          <li className="transition-all duration-300">
            <Link href={'https://gitee.com/lms5204/hrms.git'} target="blank" className="mt-4 text-sky-500 hover:text-sky-500">
              <TextAnimate animation="blurInUp" by="character" delay={0.5}>
                https://gitee.com/lms5204/hrms.git
              </TextAnimate>
            </Link>

          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">

        <Image2
          src="/assets/img/hr02.png"
          width={300}
          className="object-cover w-full h-full"
        />
      </div>
    ),
  },
  {
    title: "功能模块",
    description: (
      <div>
        <ul className="flex flex-col gap-2 p-4 list-disc cursor-default">
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              登录模块：用户登录、退出登录、修改密码等功能。后端设置 JWT ，前端 Axios 拦截认证，实现用户的安全登录。
            </TextAnimate>

          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              权限管理：后端基于 RBAC 模型，实现用户权限的业务逻辑处理。前端则是配置前置路由守卫，根据用户权限动态渲染用户的权限页面。
            </TextAnimate>
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              考勤管理：后端是普通的增删改查，前端则是利用高德地图API进行定位打卡考勤。
            </TextAnimate>
          </li>
          <li className="hover:text-[#f48511] transition-all duration-300">
            <TextAnimate animation="blurInUp" by="character" delay={0.5}>
              薪资管理：后端结合考勤管理部分，实现薪资的自动计算处理逻辑，前端使用 Element UI 进行薪资详情展示。
            </TextAnimate>
          </li>

        </ul>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image2.PreviewGroup
          items={[
            '/assets/img/hr01.png',
            '/assets/img/hr03.png',
            '/assets/img/hr04.png',
            '/assets/img/hr05.png',
            '/assets/img/hr06.png',
            '/assets/img/hr07.png',
            '/assets/img/hr08.png',
            '/assets/img/hr-10.png',
            '/assets/img/hr09.png',
            '/assets/img/hr09-1.png',

          ]}
        >
          <Image2
            src="/assets/img/hr01.png"
            width={300}
            className="object-cover w-full h-full"
          />
        </Image2.PreviewGroup>
      </div>
    ),
  }
];


const MotionBox4 = () => {
  return (
    <div className='flex flex-col gap-5'>
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
  )
}

export default MotionBox4
