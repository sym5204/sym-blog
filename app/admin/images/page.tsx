'use client'
import { useState, useEffect } from 'react';

import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/app/layouts/AdminLayout';

export default function ImageAdminPage() {

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    
  };

  
  
  useEffect(() => {
    getImages();
  }, [])



  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await fetch(`/api/images/${id}`, { method: 'DELETE' });
     
    } catch (error) {
      console.error('删除失败:', error);
    } finally {
      setDeletingId(null);
      getImages();
    }
  };

  // 获取图片列表
  const getImages = async () => {
    try {
      const response = await fetch('/api/images', { method: 'GET' });
      const data = await response.json();
      setImages(data);
      
    } catch (error) {
      console.error('获取图片列表失败:', error);
      return [];
    }
  };





  const handleUpload = async () => {
    if (!files?.length) return;
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        getImages();
        setFiles([]);
      }
    } catch (error) {
      console.error('上传失败:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 w-full h-full rounded bg-slate-100/80">
        <div className="pb-4 border-b">
          <h1 className="text-2xl font-bold">图片管理</h1>
          <FileUpload onChange={handleFileUpload} />
          <div className='flex flex-row justify-center items-center mt-4'>
            <button
              onClick={handleUpload}
              className='px-4 py-2 w-32 text-white bg-blue-500 rounded-md'
            >
              上传图片
            </button>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 w-full h-max md:grid-cols-4 lg:grid-cols-6">
          {images?.map((image: any) => (
            <div key={image._id} className="relative group">
              <img
                src={image.path}
                alt={image.filename}
                className="object-cover w-full h-32 rounded-lg"
              />
              <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-0 rounded-lg transition-all group-hover:bg-opacity-50">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image._id)}
                  disabled={deletingId === image._id}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {deletingId === image._id ? '删除中...' : '删除'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}