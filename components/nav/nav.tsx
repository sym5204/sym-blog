'use client'
import Image from 'next/image'

function openNav(link: string) {
    window.location.href = link
}

// 导航栏 包含名称以及链接页面的路由


const navList =  [{navName: "首页", link: "/home"}, {navName: "关于", link: "/about"}]

const Nav = () => {
    return (
        <>
            <nav className="flex flex-row items-center justify-between w-full p-2 md:px-20 ">
                <div className="transition-all duration-300 hover:cursor-pointer hover:scale-110">
                    <Image src="/assets/img/sym.png" alt="logo" width={50} height={50} className="rounded-full" />
                </div>

                <ul className='flex flex-row items-center justify-center'>
                    {navList.map((item) => (
                        <li key={item.navName} className="p-2 text-white hover:text-green-500 hover:cursor-pointer">
                            <span onClick={() => openNav(item.link)}>{item.navName}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Nav