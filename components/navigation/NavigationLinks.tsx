'use client'
import { motion } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
    children: React.ReactNode
    name: string
    href: string
}

const NavigationLinks = ({ children, name, href }: Props) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, type: "spring", damping:15}}
        >

            <Link
                href={href}
                className={`flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-900 hover:bg-yellow-100 ${
                    isActive 
                        ? 'bg-yellow-100 stroke-neutral-900 text-neutral-900 scale-110'
                        : 'stroke-white text-white hover:text-neutral-900 '
                } place-items-center gap-3 transition-colors duration-100 overflow-hidden`}
            >
                {children}
                <p className="tracking-wide overflow-clip whitespace-nowrap text-inherit">{name}</p>
            </Link>
        </motion.div>
    )
}

export default NavigationLinks
