

'use client'

import EmptyDefault from '@/components/emptyDefault/EmptyDefault';
import { Timeline } from '@/components/ui/timeline';
import Article from '@/models/Article';
import Category from '@/models/Category';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';


interface Category {
  _id: string;
  name: string;
}

interface Article {
  _id?: string;
  title: string;
  content: string;
  description: string;
  keywords: string;
  isPublished: boolean;
  categories: Array<string>;
  createdAt: Date;
}




// 获取分类的方法
async function getCategories() {
  const res = await fetch('/api/learning?type=categories');
  if (!res.ok) throw new Error('获取分类失败');
  return await res.json();
}


async function getArticlesByCategories(categoryIds?: string[]) {
  const url = categoryIds?.length
    ? `/api/learning?categories=${categoryIds.join(',')}`
    : '/api/learning';

  const res = await fetch(url);
  if (!res.ok) throw new Error('获取文章失败');
  return await res.json();
}


export default function LearningList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const articlesData = await getArticlesByCategories(selectedCategories);
        setArticles(articlesData);
      } catch (err) {
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategories]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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
              href={`/learning/${articles.find(a => a.title === title)?._id}`}
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
      <h1 className="mb-8 text-2xl font-bold text-center" style={{ fontFamily: 'cursive' }}>技术探索</h1>

      <div className='flex flex-row flex-wrap gap-4 p-4 mb-4 w-full bg-white rounded-lg shadow-md'>
        {categories.map((category: any) => (
          <label
            key={category._id}
            className="flex items-center space-x-2 px-4 py-2 border  rounded-full shadow-lg transition-all duration-300  hover:text-white hover:shadow-cyan-500/50 
                                  cursor-pointer peer-checked:shadow-cyan-500/50
                                  peer-checked:bg-sky-500 peer-checked:text-white peer-checked:border-sky-500 peer-checked:shadow-lg
                                  hover:bg-sky-500 has-[:checked]:bg-sky-500 has-[:checked]:text-white has-[:checked]:shadow-cyan-500/50"
          >
            <input
              type="checkbox"
              name="categoryFilter"
              value={category._id}
              className="hidden peer"
              onChange={() => handleCategoryChange(category._id)}
              checked={selectedCategories.includes(category._id)}
            />
            <span className="px-4 text-sm font-medium text-center" style={{ margin: `0px` }}>{category.name}</span>
          </label>
        ))}
      </div>

      {articles.length === 0 ? (
        <div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={Math.random()}
              // initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='w-full h-max'
            >
              <EmptyDefault />
            </motion.div>
          </AnimatePresence>

        </div>

      ) : (
        <div className="flex relative flex-col w-full transition-all duration-300">



          <div className='flex relative flex-col gap-4 w-full transition-all duration-300 h-max'>

            <Timeline data={timeLineData} />
          </div>

        </div>
      )}


    </div>
  );
}