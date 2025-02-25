import React from 'react';

interface BackgroundVideoProps {
  children?: React.ReactNode;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 object-cover w-full h-full"
      >
        <source src="/videos/saber.mp4" type="video/mp4" />
        你的浏览器不支持视频标签。
      </video>
      
      {/* 可选的暗色遮罩，让内容更容易阅读 */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
      
      {/* 内容容器 */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;
