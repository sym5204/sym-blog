'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
}

interface Article {
  _id?: string;
  title: string;
  content: string;
  description: string;
  keywords: string;
  isPublished: boolean;
  categories: string[];
}

export default function ArticleManagement() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertIsSuccess, setAlertIsSuccess] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | undefined>(undefined);

  useEffect(() => {
  // 添加router到依赖数组
    // 从localStorage检查令牌
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchArticles();
      fetchCategories();
    } else {
      setIsLoggedIn(false);
      router.push('/admin/login');
    }
  }, [router]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('获取文章失败:', error);
      setError('获取文章失败');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('获取分类失败:', error);
    }
  };

  // 根据分类ID获取分类名称
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map(id => categories.find(cat => cat._id === id)?.name || '未知分类')
      .join(', ');
  };

  const showAlert = (title: string, description: string, isSuccess: boolean = true) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertIsSuccess(isSuccess);
    setAlertOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken('');
    setIsLoggedIn(false);
    router.push('/admin/login');
  };

  const openDeleteDialog = (articleId: string | undefined) => {
    if (!articleId) return;
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (!articleToDelete) return;
    
    setError('');
    setMessage('');
    
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/api/articles/${articleToDelete}`, { headers });
      
      showAlert('操作成功', '文章已删除');
      fetchArticles();
    } catch (error: any) {
      showAlert('操作失败', error.response?.data?.error || '删除文章失败', false);
    }
    
    // 关闭对话框并清除要删除的文章ID
    setDeleteDialogOpen(false);
    setArticleToDelete(undefined);
  };

  const handleDeleteArticle = (articleId: string | undefined) => {
    if (!articleId) return;
    openDeleteDialog(articleId);
  };


  return (
    <div className="container p-4 mx-auto rounded min-h-[600px] bg-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          退出登录
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <Link
          href="/admin/articles/editor"
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          新增文章
        </Link>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md">
        {articles.length === 0 ? (
          <p className="py-8 text-center text-gray-500">暂无文章</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">标题</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-[150px]">分类</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-[120px]">状态</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase w-[120px]">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs text-sm text-center text-gray-500 truncate">
                        {Array.isArray(article.categories) 
                          ? getCategoryNames(article.categories as string[])
                          : '未分类'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {article.isPublished ? (
                        <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">已发布</span>
                      ) : (
                        <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded">未发布</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      <Link
                        href={`/admin/articles/editor?id=${article._id}`}
                        className="mr-4 text-blue-600 hover:text-blue-900"
                      >
                        编辑
                      </Link>

                      <button
                        onClick={() => handleDeleteArticle(article._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-2 border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-red-700">
              确认删除
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              您确定要删除这篇文章吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-x-2">
            <AlertDialogCancel className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200">
              取消
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteArticle}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}