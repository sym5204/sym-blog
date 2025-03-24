import AdminNav from '@/components/navigation/AdminNav';
import { motion } from 'motion/react';


export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex relative flex-row gap-10 w-full min-h-full h-max">
            
            <AdminNav />
            <div className='flex flex-col w-full rounded h-max'>
                
                    <motion.div
                        key={Math.random()}
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='w-full h-max'
                    >
                        {children}
                    </motion.div>
                
            </div>

        </div>
    );
};