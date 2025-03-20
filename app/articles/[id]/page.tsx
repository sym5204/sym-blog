import React from 'react';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  try {
    await connectDB();
    const article = await Article.findById(params.id);

    if (!article || (process.env.NODE_ENV === 'production' && !article.published)) {
      return {
        title: '文章不存在'
      };
    }

  if (!article) {
    return {
      title: '文章不存在',
    };
  }

    return {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
    };
  } catch (error) {
    console.error('生成元数据时出错:', error);
    return {
      title: '文章加载异常'
    };
  }
}

async function getArticle(id: string) {
  await connectDB();
  const article = await Article.findById(id);

  if (!article) {
    return null;
  }

  // 在生产环境中，只返回已发布的文章
  if (process.env.NODE_ENV === 'production' && !article.isPublished) {
    return null;
  }

  return JSON.parse(JSON.stringify(article));
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <article className="p-6 bg-white rounded-lg shadow-md md:p-8">
        <h1 className="mb-6 text-3xl font-bold text-center">{article.title}</h1>

        <div className="flex flex-row justify-end w-[100%] mb-8 text-sm text-gray-500">
          <div className="flex flex-row place-items-end w-max">
            时间 : {new Date(article.updatedAt).toLocaleDateString('zh-CN')}
          </div>

        </div>

        <div
          className="max-w-none prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}