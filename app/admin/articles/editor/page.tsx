'use client';

import RichTextEditor from '@/components/RichTextEditor';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface Article {
  _id?: string;
  title: string;
  content: string;
  description: string;
  keywords: string;
  published: boolean;
  category: string;
}

export default function ArticleEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [article, setArticle] = useState<Article>({
    title: '',
    content: '',
    description: '',
    keywords: '',
    published: false,
    category: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertIsSuccess, setAlertIsSuccess] = useState(true);

  useEffect(() => {
    // 从localStorage检查令牌
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchCategories();
      
      if (articleId) {
        fetchArticle(articleId);
      } else {
        setIsLoading(false);
      }
    } else {
      router.push('/admin/articles');
    }
  }, [articleId, router]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('获取分类失败:', error);
    }
  };

  const fetchArticle = async (id: string) => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      setArticle(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('获取文章失败:', error);
      setError('获取文章失败');
      setIsLoading(false);
    }
  };

  const showAlert = (title: string, description: string, isSuccess: boolean = true) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertIsSuccess(isSuccess);
    setAlertOpen(true);
  };

  // 安全地更新文章字段
  const updateArticleField = (field: keyof Article, value: string | boolean) => {
    setArticle(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // 专门处理富文本编辑器内容变化
  const handleContentChange = (content: string) => {
    updateArticleField('content', content);
  };

  const handleSaveArticle = async () => {
    setError('');
    setMessage('');
    
    // 表单验证
    if (!article.title.trim()) {
      showAlert('验证失败', '标题不能为空', false);
      return;
    }
    
    if (!article.content.trim()) {
      showAlert('验证失败', '内容不能为空', false);
      return;
    }
    
    // 验证分类是否为有效的 ObjectId
    if (article.category && typeof article.category === 'string') {
      // 简单验证 ObjectId 格式 (24位十六进制字符串)
      const isValidId = /^[0-9a-fA-F]{24}$/.test(article.category);
      if (!isValidId) {
        showAlert('验证失败', '请选择有效的分类', false);
        return;
      }
    }
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      if (articleId) {
        // 更新现有文章
        await axios.put(`/api/articles/${articleId}`, article, { headers });
        showAlert('操作成功', '文章已保存');
      } else {
        // 创建新文章
        await axios.post('/api/articles', article, { headers });
        showAlert('操作成功', '新文章已创建');
      }
      
      // 保存成功后延迟返回列表页
      setTimeout(() => {
        router.push('/admin/articles');
      }, 1500);
    } catch (error: any) {
      showAlert('操作失败', error.response?.data?.error || '保存文章失败', false);
    }
  };

  const handlePublishArticle = async () => {
    if (!articleId) {
      showAlert('操作失败', '请先保存文章', false);
      return;
    }
    
    setError('');
    setMessage('');
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`/api/articles/${articleId}`, 
        { ...article, published: true }, 
        { headers }
      );
      
      setArticle({ ...article, published: true });
      showAlert('操作成功', '文章已发布');
      
      // 发布成功后延迟返回列表页
      setTimeout(() => {
        router.push('/admin/articles');
      }, 1500);
    } catch (error: any) {
      showAlert('操作失败', error.response?.data?.error || '发布文章失败', false);
    }
  };

  if (!isLoggedIn) {
    return null; // 未登录时不显示内容，会被重定向到登录页
  }

  if (isLoading) {
    return (
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto rounded min-h-[600px] bg-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{articleId ? '编辑文章' : '新建文章'}</h1>
        <button
          onClick={() => router.push('/admin/articles')}
          className="px-4 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          返回列表
        </button>
      </div>
      
      {error && <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      {message && <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">标题</label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => updateArticleField('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">SEO 描述</label>
          <textarea
            value={article.description}
            onChange={(e) => updateArticleField('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={2}
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">SEO 关键词 (用逗号分隔)</label>
          <input
            type="text"
            value={article.keywords}
            onChange={(e) => updateArticleField('keywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">分类</label>
          <select
            value={article.category}
            onChange={(e) => updateArticleField('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">请选择分类</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">内容</label>
          <RichTextEditor
            value={article.content}
            onChange={handleContentChange}
          />
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSaveArticle}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            保存文章
          </button>
          <button
            onClick={handlePublishArticle}
            className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
            disabled={!articleId}
          >
            发布文章
          </button>
        </div>
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className={`border-2 ${alertIsSuccess ? "border-green-500" : "border-red-500"}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`text-lg font-bold ${alertIsSuccess ? "text-green-700" : "text-red-700"}`}>
              {alertTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {alertDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className={`px-4 py-2 text-white rounded-md ${alertIsSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
              确定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
