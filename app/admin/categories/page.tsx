'use client'

// 单独创建一个文章分类管理页面

import CategoryManager from '@/components/CategoryManager'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Category {
  _id: string;
  name: string;
  description: string;
}

const CategoryManagement = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
  // 添加router到依赖数组
    // 从localStorage检查令牌
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchCategories();
    } else {
      setIsLoggedIn(false);
      router.push('/admin/login');
    }
  }, [router]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('获取分类失败:', error);
      setError('获取分类失败');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken('');
    setIsLoggedIn(false);
    router.push('/admin/login');
  };


  return (
    <div className="container px-4 py-8 mx-auto rounded min-h-[600px]  bg-slate-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">分类管理</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          退出登录
        </button>
      </div>


      <div className="p-6 bg-white rounded-lg shadow-md">
        <CategoryManager
          categories={categories}
          onCategoryChange={setCategories}
          token={token}
        />
      </div>
    </div>
  )
}

export default CategoryManagement
