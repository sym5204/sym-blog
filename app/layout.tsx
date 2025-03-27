import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";


type RootLayoutProps = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: '诗叶沐',
    template: '%s - 诗叶沐', // 子页面的标题会自动替换 %s
  },
  description: "诗叶沐的个人博客，一个用于分享技术、生活和感悟的网站。",
  keywords: "诗叶沐, 个人博客, 博客, 网站, blog, next.js, react, typescript, 技术, 生活, 感悟",
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
