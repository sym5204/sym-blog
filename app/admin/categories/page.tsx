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
    // 从localStorage检查令牌
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('获取分类失败:', error);
      setError('获取分类失败');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token } = response.data;
      
      localStorage.setItem('authToken', token);
      setToken(token);
      setIsLoggedIn(true);
      fetchCategories();
    } catch (error: any) {
      setError(error.response?.data?.error || '登录失败');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken('');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">管理员登录</h1>
        {error && <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            登录
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto rounded min-h-[600px]  bg-slate-100">
      <div className="flex items-center justify-between mb-8 ">
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
