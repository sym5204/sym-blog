'use client'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { ShineBorder } from "@/components/magicui/shine-border"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import Image from "next/image"
import "./entry.css"

const skillList = [{ id: 1, label: 'HTML' }, { id: 2, label: 'CSS' },
{ id: 3, label: 'JavaScript' }, { id: 4, label: 'Vue' }, { id: 5, label: 'React' }, { id: 6, label: 'Next.js' },
{ id: 7, label: 'Nuxt.js' }, { id: 8, label: 'Java' }, { id: 9, label: 'MySql' }
]


const Entry = () => {
  return (

    <div className="flex relative flex-col justify-center items-center w-full">

      <CardContainer>
        <CardBody >
          <CardItem>
            <div className="flex overflow-hidden relative rounded-xl glass-effect" style={{ width: '780px', height: '580px' }}>
              <ShineBorder shineColor={["#0ea59e", "#22c55e", "#FFBE7B"]} className="bg-green-500" />
              <div className="head" >
                <div className="p-4">
                  <h1 className="flex flex-col pt-8 pl-4 tracking-tighter hover:cursor-default md:text-2xl lg:text-4xl" style={{ fontFamily: 'cursive' }}>
                    <AnimatedGradientText>
                      诗叶沐つ灵魂栖息之地
                    </AnimatedGradientText>
                  </h1>

                  <h1 className="flex flex-col pt-4 pl-4 tracking-tighter hover:cursor-default md:text-xl lg:text-2xl" style={{ fontFamily: 'cursive' }}>
                    <AnimatedGradientText>
                      前端开发热爱者
                    </AnimatedGradientText>
                  </h1>
                </div>

              </div>

              <div className="flex absolute left-10 top-1/3 p-2 bg-green-500 rounded-full">
                <Image src="/assets/img/A01.jpg" alt="logo" width={200} height={200} className="z-10 rounded-full transition-all duration-300 hover:scale-110" />
              </div>

              <div className="flex absolute bottom-0 flex-row p-4 w-full" style={{ height: '300px', zIndex: -2 }}>

                <div className="flex absolute bottom-4 flex-row flex-wrap gap-3 justify-center p-4 w-1/3 h-1/2 border-r-2 border-white">
                  {
                    skillList.map(item => (
                      <div key={item.id} className="flex flex-row justify-center items-center px-2 py-1 w-max text-black bg-yellow-50 rounded-full shadow-lg transition-all duration-300 hover:cursor-default hover:text-white hover:bg-sky-600 hover:shadow-cyan-500/50 shadow-yellow-200/50">
                        {item.label}
                      </div>
                    ))
                  }
                </div>


                <div className="flex absolute bottom-2 right-4 flex-col px-8 py-4 h-max" style={{ width: '60%', fontFamily: 'cursive' }}>


                  <AnimatedGradientText className='text-xl hover:cursor-default' >
                    <p className="mb-2 text-center" style={{ fontFamily: 'math', fontStyle: 'italic' }}>
                      Welcome, explorer ！！！
                    </p>
                    <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎，勇于开拓的旅者，我是诗叶沐，一个热爱前端开发的代码疯子。这个网站是专为记录与分享我的技术探索和岁月点滴而建。无论你是来寻找灵感，还是想一起探讨代码的奥秘，这里都欢迎你，愿此行，终达群星！！！
                    </p>
                  </AnimatedGradientText>

                  <InteractiveHoverButton className="self-center mt-4 w-max bg-yellow-50 shadow-lg shadow-yellow-200/50" onClick={() => window.location.href = '/learning'}>开始探索</InteractiveHoverButton>



                </div>


              </div>
            </div>
          </CardItem>

        </CardBody>
      </CardContainer>



    </div>


  )
}

export default Entry