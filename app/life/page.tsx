'use client'

import { Timeline } from '@/components/ui/timeline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Article {
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
}

async function getLifeArticles() {
  const res = await fetch('/api/life');
  if (!res.ok) throw new Error('获取文章失败');
  return await res.json();
}

export default function LifePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await getLifeArticles();
        setArticles(articlesData);
      } catch (err) {
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const timeLineData = Object.entries(
    articles.reduce((acc: Record<string, string[]>, article: Article) => {
      const dateKey = new Date(article.createdAt).toISOString().slice(0, 7); // 截取前7位得到YYYY-MM格式
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(article.title);
      return acc;
    }, {})
  ).map(([date, titles]) => ({
    title: date,
    content: (
      <div className="flex flex-col gap-4">
        {titles.map(title => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, type: "spring", damping: 15 }}
          >
            <Link
              href={`/life/${articles.find(a => a.title === title)?._id}`}
              className="flex overflow-hidden flex-row p-4 w-full bg-white rounded-lg transition-all border-[1px] duration-300 hover:text-white hover:shadow-cyan-500/50 hover:bg-sky-500 hover:shadow-lg"
            >
              <h2 className="flex flex-1 text-xl font-semibold line-clamp-1">
                {title}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
    )
  }));

  return (
    <div className="container relative px-4 py-8 mx-auto w-full rounded opacity-90 bg-slate-100">
      <h1 className="mb-8 text-2xl font-bold text-center" style={{ fontFamily: 'cursive' }}>岁月随笔</h1>
      
      {articles.length === 0 ? (
        <div className="flex justify-center items-center w-full h-96">
          <p className="text-gray-500">暂无生活随笔文章</p>
        </div>
      ) : (
        <div className="flex relative flex-col gap-4 w-full transition-all duration-300 h-max">
          <Timeline data={timeLineData} />
        </div>
      )}
    </div>
  );
}
