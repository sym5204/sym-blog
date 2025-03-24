// pages/introduction.tsx
'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Introduction: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-full h-full">
        <motion.button
          initial={{ x: 0, y: 0 }}
          animate={showContent ? { x: '-50%', y: '-50%' } : { x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          onClick={() => setShowContent(!showContent)}
          className="absolute top-1/2 left-1/2 bg-center bg-cover rounded-full transform -translate-x-1/2 -translate-y-1/2 w-50 h-50"
          
        >
          <Image src="/assets/img/A01.jpg" alt="logo" width={200} height={200} className="z-10 rounded-full transition-all duration-300 hover:scale-110" />
        </motion.button>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24 text-center"
          >
            <h1 className="text-3xl font-bold">Welcome to My Page</h1>
            <p className="mt-4">This is the additional content that will be shown after clicking the avatar.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Introduction;