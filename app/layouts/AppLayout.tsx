import Navigation from '@/components/navigation/Navigation';
import { motion } from 'motion/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
      default: '诗叶沐',
      template: '%s - 诗叶沐', // 子页面的标题会自动替换 %s
    },
    description: "诗叶沐的个人博客，一个用于分享技术、生活和感悟的网站。",
    keywords: "诗叶沐, 个人博客, 博客, 网站, blog, next.js, react, typescript, 技术, 生活, 感悟",
  };

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex relative flex-row gap-10 w-full min-h-full h-max">
            
            <Navigation />
            <div className='flex flex-1 min-w-[500px] rounded'>
                
                    <motion.div
                        key={Math.random()}
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='w-full min-h-full h-max'
                    >
                        {children}
                    </motion.div>
                
            </div>

        </div>
    );
};