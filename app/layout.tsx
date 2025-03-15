import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";


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
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
