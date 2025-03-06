'use client'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { ShineBorder } from "@/components/magicui/shine-border"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import Image from "next/image"
import "./home.css"

const skillList = [{ id: 1, label: 'HTML' }, { id: 2, label: 'CSS' },
{ id: 3, label: 'JavaScript' }, { id: 4, label: 'Vue' }, { id: 5, label: 'React' }, { id: 6, label: 'Next.js' },
{ id: 7, label: 'Nuxt.js' }, { id: 8, label: 'Java' }, { id: 9, label: 'MySql' }
]


const Home = () => {
  return (

    <div className="relative flex flex-col items-center justify-center w-full ">

      <CardContainer>
        <CardBody >
          <CardItem>
            <div className="relative flex overflow-hidden glass-effect rounded-xl" style={{ width: '780px', height: '580px' }}>
              <ShineBorder shineColor={["#0ea59e", "#22c55e", "#FFBE7B"]} className="bg-green-500" />
              <div className="head " >
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

              <div className="absolute flex p-2 bg-green-500 rounded-full top-1/3 left-10">
                <Image src="/assets/img/A01.jpg" alt="logo" width={200} height={200} className="z-10 transition-all duration-300 rounded-full hover:scale-110" />
              </div>

              <div className="absolute bottom-0 flex flex-row w-full p-4" style={{ height: '300px', zIndex: -2 }}>

                <div className="absolute flex flex-row flex-wrap justify-center w-1/3 gap-3 p-4 border-r-2 border-white bottom-4 h-1/2">
                  {
                    skillList.map(item => (
                      <div key={item.id} className="flex flex-row items-center justify-center px-2 py-1 text-black transition-all duration-300 rounded-full shadow-lg hover:cursor-default hover:text-white hover:bg-sky-600 hover:shadow-cyan-500/50 shadow-yellow-200/50 w-max bg-yellow-50">
                        {item.label}
                      </div>
                    ))
                  }
                </div>


                <div className="absolute flex flex-col px-8 py-4 h-max bottom-2 right-4" style={{ width: '60%', fontFamily: 'cursive' }}>


                  <AnimatedGradientText className='text-xl hover:cursor-default' >
                    <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎，勇于探索的旅者，我是诗叶沐，一个热爱前端开发的代码疯子。这个网站是我的虚拟空间，专为记录与分享我的技术探索和岁月点滴而建。无论你是来寻找灵感，还是想一起探讨代码的奥秘，亦或是为灵魂寻找片刻的憩息之地，这里都欢迎你，请尽情探索！！！
                    </p>
                  </AnimatedGradientText>

                  <InteractiveHoverButton className="self-center mt-4 shadow-lg bg-yellow-50 shadow-yellow-200/50 w-max">开始探索</InteractiveHoverButton>



                </div>


              </div>
            </div>
          </CardItem>

        </CardBody>
      </CardContainer>



    </div>


  )
}

export default Home