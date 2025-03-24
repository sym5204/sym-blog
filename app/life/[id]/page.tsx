'use client'

import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';



interface PageProps {
  params: {
    id: string;
  };
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

// export async function generateMetadata({ params }: PageProps) {
//     try {
//         await connectDB();
//         const article = await Article.findById(params.id);

//         if (!article || (process.env.NODE_ENV === 'production' && !article.published)) {
//             return {
//                 title: '文章不存在'
//             };
//         }

//         if (!article) {
//             return {
//                 title: '文章不存在',
//             };
//         }

//         return {
//             title: article.title,
//             description: article.description,
//             keywords: article.keywords,
//         };
//     } catch (error) {
//         console.error('生成元数据时出错:', error);
//         return {
//             title: '文章加载异常'
//         };
//     }
// }

async function getArticle(id: string) {
  const url = `/api/life/${id}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('获取文章失败');
  return await res.json();
}



const LifePage = () => {
  // 从 useParams 获取的对象可能为 null，因此需要进行类型检查
  const params = useParams();
  const [article, setArticle] = useState<Article>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 从 useParams 获取的对象可能为 null，因此需要进行类型检查
        if (params) {
          if (typeof params.id === 'string') {
            const articleData = await getArticle(params.id);
            setArticle(articleData);
          }

        } else {
          setError('文章 ID 无效');
        }
      } catch (err) {
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);


  return (
    <div className="container relative px-4 py-8 mx-auto w-full rounded opacity-80 bg-slate-100">
      <div className='flex flex-row justify-end items-center w-full'>
        <Link href={'/life'}>
          <InteractiveHoverButton direction='left'>
            返回
          </InteractiveHoverButton>
        </Link>

      </div>

      {article && (
        <>

          <motion.div
            key={Math.random()}
            transition={{ duration: 0.5 }}
            className='p-4 w-full h-max'
          >
            <div className='flex flex-row justify-center items-center mt-4'>
              <h1 className='text-2xl font-bold text-center'>{article.title}</h1>
            </div>
            <div className='mt-4 max-w-none prose'
              dangerouslySetInnerHTML={{ __html: article.content }} />
          </motion.div>

        </>
      )}
    </div>
  )
}

export default LifePage
