import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import EmptyDefault from '@/components/emptyDefault/EmptyDefault';

async function getArticles() {
  await connectDB();
  // 只获取已发布的文章 并且分类不等于 “岁月随笔”
  const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(articles));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container px-4 py-8 mx-auto rounded bg-slate-100 opacity-80">
      <h1 className="mb-8 text-3xl font-bold text-center">文章列表</h1>
      
      {articles.length === 0 ? (
        <EmptyDefault />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: any) => (
            <Link 
              href={`/articles/${article._id}`} 
              key={article._id}
              className="block overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold line-clamp-2">{article.title}</h2>
                <div className="text-gray-600 line-clamp-3" 
                  dangerouslySetInnerHTML={{ 
                    __html: article.description || article.content.substring(0, 150) 
                  }} 
                />
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 