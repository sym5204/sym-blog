'use client'

import { ShineBorder } from "@/components/magicui/shine-border"
import { motion } from "framer-motion"
import Link from "next/link"

// 网站导航页
const navData = [
    {
        id: Math.random(),
        title: "AI工具",
        links: [
            { id: Math.random(), name: "千问", path: "https://chat.qwen.ai/" },
            { id: Math.random(), name: "deepseek", path: "https://chat.deepseek.com/" }
        ]
    },
    {
        id: Math.random(),
        title: "编程",
        links: [
            { id: Math.random(), name: "Vue", path: "https://cn.vuejs.org/" },
            { id: Math.random(), name: "React", path: "https://react.docschina.org/" },
            { id: Math.random(), name: "Nuxt.js", path: "https://nuxtjs.org.cn/" },
            { id: Math.random(), name: "Nest.js", path: "https://www.nextjs.cn/" },
            { id: Math.random(), name: "MDN", path: "https://developer.mozilla.org/zh-CN/" },
            { id: Math.random(), name: "微信小程序", path: "https://developers.weixin.qq.com/" }
        ]
    },
    {
        id: Math.random(),
        title: "UI",
        links: [
            { id: Math.random(), name: "Tailwindcss", path: "https://www.tailwindcss.cn/" },
            { id: Math.random(), name: "ReactBits", path: "https://www.reactbits.dev/" },
            { id: Math.random(), name: "Magic UI", path: "https://magicui.design/" },
            { id: Math.random(), name: "Shadcn UI", path: "https://ui.shadcn.com/" },
            { id: Math.random(), name: "Cult UI", path: "https://www.cult-ui.com/" },
            { id: Math.random(), name: "Aceternity UI", path: "https://ui.aceternity.com/" },
            { id: Math.random(), name: "Motion", path: "https://motion.dev/" },
            { id: Math.random(), name: "Element-plus", path: "https://element-plus.org/" },
            { id: Math.random(), name: "Ant-design", path: "https://ant-design.antgroup.com/" },
            { id: Math.random(), name: "Vant UI", path: "https://vant-ui.github.io/" },
            { id: Math.random(), name: "Animate", path: "https://animate.style/" },
            { id: Math.random(), name: "Echarts", path: "https://echarts.apache.org/" },
            { id: Math.random(), name: "WangEditor", path: "https://www.wangeditor.com/" },
            { id: Math.random(), name: "Iconfont", path: "https://www.iconfont.cn/" },
            { id: Math.random(), name: "Heroicons", path: "https://heroicons.com/" },
        ]
    },
    {
        id: Math.random(),
        title: "二次元",
        links: [
            { id: Math.random(), name: "D站", path: "https://www.5dm.link/" },
            { id: Math.random(), name: "樱花动漫", path: "https://www.yinhuadm.vip/" },
            { id: Math.random(), name: "轻小说文库", path: "https://www.wenku8.net/" },
            { id: Math.random(), name: "Pixivic", path: "https://pixivic.com/" },
            { id: Math.random(), name: "GoDa漫画", path: "https://manhuafree.com/" }
        ]
    },
    {
        id: Math.random(),
        title: "在线工具",
        links: [
            { id: Math.random(), name: "代码格式转换", path: "https://stackoverflow.org.cn/" },
            { id: Math.random(), name: "可画", path: "https://www.canva.cn/" },
            { id: Math.random(), name: "在线抠图", path: "https://www.remove.bg/" },
            { id: Math.random(), name: "图片编辑", path: "https://www.iloveimg.com/" },
            { id: Math.random(), name: "草料二维码", path: "https://cli.im/" },
            { id: Math.random(), name: "IP查询", path: "https://tool.lu/ip/" },
            { id: Math.random(), name: "SEO优化", path: "https://www.sojson.com/" },
            { id: Math.random(), name: "PDF转图片", path: "https://smallpdf.com/" }
        ]
    }
]


const Links = () => {
    return (
        <>
            <div className="flex relative flex-col p-10 w-full min-h-full rounded h-max bg-slate-100/80">

                {navData.map((category) => (
                    <div key={category.id}>
                        <div className="p-4 mb-5 text-xl">
                            <h1>{category.title}</h1>
                        </div>

                        <div className="grid grid-cols-5 gap-10 px-4 mb-4">
                            {category.links.map((link) => (
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.2, type: "spring", damping: 20 }}
                                    key={link.id} className="flex relative justify-center items-center text-center rounded-full shadow-lg hover:text-white hover:shadow-cyan-500/50 hover:bg-sky-500">
                                    <ShineBorder
                                        shineColor={["#0ea59e", "#22c55e", "#FFBE7B"]}
                                        className="bg-green-500"
                                        borderWidth={2}
                                    />
                                    <Link
                                        className="p-4 w-full"
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default Links
