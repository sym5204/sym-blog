'use client'
import { motion, useAnimationControls } from 'framer-motion'
import { BookTextIcon, ChartBarIcon, ComponentIcon, HeartIcon, ImageIcon, LinkIcon, User2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NavigationLinks from './NavigationLinks'

const containerVariants = {

    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    }
}

const svgVariants = {
    open: {
        rotate: -180,
    },
    close: {
        rotate: 0,
    }
}

// 导航栏 包含名称以及链接页面的路由


const AdminNav = () => {

    const [isOpen, setIsOpen] = useState(false)

    const containerControls = useAnimationControls()
    const svgControls = useAnimationControls()

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open")
            svgControls.start("open")
        } else {
            containerControls.start("close")
            svgControls.start("close")
        }
    }, [isOpen, containerControls, svgControls])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <motion.nav
                variants={containerVariants}
                initial={{
                    width: "4rem"
                }}
                animate={containerControls}
                className="relative flex flex-col gap-20 p-5 rounded-lg shadow min-h-[600px] h-max w-max bg-neutral-800/90 shadow-neutral-600">
                <div className='flex relative flex-row justify-between place-items-center w-full'>
                    
                    <div className='flex relative justify-center items-center w-16 h-16 rounded-full cursor-pointer'>
                        <Image src={"/assets/img/sym.png"} alt='logo' width={64} height={64} className='transition-all duration-300 hover:scale-110' onClick={() => window.location.href = '/'} />
                    </div>

                    <button className='flex p-1 rounded-full' onClick={() => handleOpen()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="w-8 h-8 stroke-neutral-200">
                            <motion.path
                                variants={svgVariants}
                                
                                animate={svgControls}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>

                    </button>
                </div>

                <div className='flex flex-col gap-3'>

                    <NavigationLinks name='分类管理' href='/admin/categories' >
                        <ChartBarIcon className='stroke-[0.75] stroke-inherit min-w-8 w-8' />
                    </NavigationLinks>

                    <NavigationLinks name='文章管理' href='/admin/articles' >
                        <BookTextIcon className='stroke-[0.75] stroke-inherit min-w-8 w-8' />
                    </NavigationLinks>

                    <NavigationLinks name='图片管理' href='/admin/images' >
                        <ImageIcon className='stroke-[0.75] stroke-inherit min-w-8 w-8' />
                    </NavigationLinks>


                </div>

            </motion.nav>
        </>
    )
}

export default AdminNav