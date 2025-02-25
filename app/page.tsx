import BackgroundVideo from '@/components/backgroundVideo/backgroundVideo';
import SplashCursor from '@/Animations/SplashCursor/SplashCursor';
export default function Home() {
  return (
    <>
      <div className='inset-0 w-screen h-screen'>

        <BackgroundVideo>
          <div className='absolute inset-0 w-screen h-screen'>
            <SplashCursor />
          </div>

          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-white">你的内容</h1>
          </div>
        </BackgroundVideo>
      </div>
    </>

  );
}
