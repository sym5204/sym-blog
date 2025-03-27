'use client';

import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
import Footer from "@/components/footer/footer";
import { Meteors } from "@/components/magicui/meteors";
import { StarsBackground } from "@/components/ui/stars-background";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { AdminLayout } from "./layouts/AdminLayout";
import { AppLayout } from './layouts/AppLayout';
import { BaseLayout } from "./layouts/BaseLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: '诗叶沐',
    template: '%s - 诗叶沐', // 子页面的标题会自动替换 %s
  },
  description: "诗叶沐的个人博客，一个用于分享技术、生活和感悟的网站。",
  keywords: "诗叶沐, 个人博客, 博客, 网站, blog, next.js, react, typescript, 技术, 生活, 感悟",
};

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({
  children
}:  ClientLayoutProps) {
  const pathname = usePathname();
  const [pathHistory, setPathHistory] = useState<string[]>([]);

  useEffect(() => {
    setPathHistory(prev => {
      if (pathname && prev[prev.length - 1] !== pathname) {
        return [...prev, pathname].slice(-2) as string[];
      }
      return prev;
    });
  }, [pathname]);

  const isBack = pathHistory.length >= 2 &&
    pathHistory[pathHistory.length - 2] === pathname;

  const isAppRoute = ['/learning', '/life', '/links', '/collections', '/workshop', '/about'].some(route =>
    pathname?.startsWith(route)
  );

  // 检查是否为 /admin 路由，如果是后台管理页面，则使用AdminLayout
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">

      <body className="relative bg-gray-900" id="particles-js">


        <div className="overflow-hidden absolute inset-0 w-screen h-screen -z-50 md:flex">
          <Meteors number={20} className="" />

          <StarsBackground />
        </div>



        <div className="hidden absolute inset-0 w-screen h-screen md:flex -z-50">
          <SplashCursor />
        </div>

        <div className="flex overflow-hidden flex-col w-full h-screen">
          <main className="flex overflow-y-scroll flex-col p-4 pt-4 w-full h-full scrollbar-hide md:px-20 md:pt-16">
            <div className="flex flex-row h-max">
              {isAppRoute ? (

                isAdminRoute ? (
                  <AdminLayout> {children}</AdminLayout>
                ) : (
                  <AppLayout> {children}</AppLayout>
                )
              ) : (
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={pathname}
                    initial={{ x: isBack ? -100 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isBack ? 100 : -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <BaseLayout>{children}</BaseLayout>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}