import Navigation from '@/components/navigation/Navigation';
import { AnimatePresence, motion } from 'motion/react';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex relative flex-row gap-10 w-full min-h-full h-max">

            <Navigation />
            <div className='flex flex-col w-full rounded h-max'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={Math.random()}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='w-full h-max'
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
};