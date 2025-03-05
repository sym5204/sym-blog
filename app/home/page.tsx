'use client'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import Image from "next/image"
import "./home.css"
import { ShineBorder } from "@/components/magicui/shine-border"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"



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
                  <h1 className="flex flex-col pt-4 pl-4 tracking-tighter hover:cursor-default md:text-2xl lg:text-4xl" style={{ fontFamily: 'cursive' }}>
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

              <div className="absolute flex top-48 left-10">
                <Image src="/assets/img/A01.jpg" alt="logo" width={200} height={200} className="z-10 transition-all duration-300 rounded-full hover:scale-110" />
              </div>
            </div>
          </CardItem>

        </CardBody>
      </CardContainer>



    </div>


  )
}

export default Home