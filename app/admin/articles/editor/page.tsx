'use client'

import RichTextEditor from '@/components/RichTextEditor';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
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
  isPublished: boolean;
  categories: Array<string>;
}

function ArticleEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams?.get('id');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [article, setArticle] = useState<Article>({
    title: '',
    content: '',
    description: '',
    keywords: '',
    isPublished: false,
    categories: [],
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
  const updateArticleField = (field: keyof Article, value: any | boolean) => {
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

    // 分类数据验证
    if (article.categories) {
      // 类型安全检查：确保始终是数组格式
      const categoryArray = Array.isArray(article.categories)
        ? article.categories
        : [];

      // 非空验证：至少选择1个分类
      if (categoryArray.length === 0) {
        showAlert('验证失败', '请至少选择一个分类', false);
        return;
      }

      // ID格式验证：检查所有分类ID是否符合MongoDB ObjectId格式
      const invalidIds = categoryArray.filter(
        id => !/^[0-9a-f]{24}$/i.test(id)
      );
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
        { ...article, isPublished: true },
        { headers }
      );

      setArticle({ ...article, isPublished: true });
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
        <div className="flex justify-center items-center h-64 bg-slate-100">
          <div className="text-xl text-gray-800">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    
      <div className="container p-4 mx-auto rounded min-h-[600px] bg-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{articleId ? '编辑文章' : '新建文章'}</h1>
          <button
            onClick={() => router.push('/admin/articles')}
            className="px-4 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            返回列表
          </button>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">标题</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => updateArticleField('title', e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">SEO 描述</label>
            <textarea
              value={article.description}
              onChange={(e) => updateArticleField('description', e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300"
              rows={2}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">SEO 关键词 (用逗号分隔)</label>
            <input
              type="text"
              value={article.keywords}
              onChange={(e) => updateArticleField('keywords', e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">分类</label>
            <div>
              <button
                onClick={() => updateArticleField('categories', '')}
                className="px-2 py-1 mb-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                清空选择
              </button>
              <div className='flex flex-row gap-5 p-4 text-xl'>
                {categories.map((category) => (
                  <div key={category._id} className="mb-1">
                    <input
                      type="checkbox"
                      id={category._id}
                      value={category._id}
                      checked={article.categories.includes(category._id)}
                      onChange={(e) => {
                        const currentCategories = Array.isArray(article.categories) ? article.categories : [];
                        const newCategories = e.target.checked
                          ? [...currentCategories, category._id]
                          : currentCategories.filter((id) => id !== category._id);
                        updateArticleField('categories', newCategories);
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={category._id} className="text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

            </div>
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

export default function ArticleEditorPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ArticleEditor />
    </Suspense>
  );
}
