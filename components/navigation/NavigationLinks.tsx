import { motion } from "framer-motion"

interface Props {
    children: React.ReactNode
    name: string
}







const NavigationLinks = ({ children, name }: Props) => {
    return (
        <motion.a
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, type: "spring", damping:15}}
            
            href="#" className=" flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-900 stroke-white text-white hover:text-neutral-900 place-items-center gap-3 hover:bg-yellow-100 transition-colors duration-100 overflow-hidden" >
            
            {children}
            <p className="tracking-wide text-inherit overflow-clip whitespace-nowrap">{name}</p>
        </motion.a>
    )
}

export default NavigationLinks
