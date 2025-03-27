'use client'
import React from 'react'
import { Image } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


interface ImageDocument {
  _id: string;
  filename: string;
  path: string;
  height: number;
  uploadTime: Date;
}

interface imageData {
  id: string;
  image: string;
  height: number;
  width: number;
}


const ImagesBox = () => {
  // 获取图片
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [imageData, setImageData] = useState<imageData[]>([]);



  // 获取图片列表
  const getImages = async () => {
    try {
      const response = await fetch('/api/images', { method: 'GET' });
      const data = await response.json();
      setImages(data);
      setImageData(data.map((image: ImageDocument) => ({
        id: image._id,
        image: image.path,
        height: image.height,
        width: image.height,
      })));

    } catch (error) {
      console.error('获取图片列表失败:', error);
      return [];
    }
  };
  useEffect(() => {
    getImages();
  }, [])


    return (
      <div className="overflow-y-hidden relative mt-4 w-full rounded-xl h-max scrollbar-hide">
        <div className='gap-8 p-4 md:columns-3 sm:columns-2 lg:columns-4'>
          {images?.map((image: ImageDocument) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, type: "spring", damping: 15 }}

              key={image._id} className='mb-8 rounded'>

              <Image
                src={image.path}
                alt="Image"
                className="object-contain w-full rounded"

              />
            </motion.div>

          ))}

        </div>

      </div>
    )
}
  export default ImagesBox
