import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
import type { Metadata } from "next";
import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
import "./globals.css";
import Particles from "@/Backgrounds/Particles/Particles";


type RootLayoutProps = {
  children: React.ReactNode;
}


export const metadata: Metadata = {
  title: "诗叶沐",
  description: "个人博客，诗叶沐",
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">

      <body className="relative bg-gray-900">
        {/* 全屏背景 粒子  */}

        <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -50 }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>


        <div className="absolute inset-0 -z-50">
          <SplashCursor />
        </div>



        <div className="flex flex-col w-screen h-screen overflow-hidden">
          <Nav />
          <main className="flex flex-col w-full h-full px-4 pt-4 overflow-y-scroll scrollbar-hide md:px-20">
            <div className="flex flex-row h-max">
              <div className="flex w-full h-max">
                {children}
              </div>

            </div>

            <Footer />
          </main>


        </div>


      </body>
    </html>
  );
}
