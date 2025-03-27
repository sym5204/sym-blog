import LifePage from "./lifePage";


async function getArticle(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/life/${id}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('获取文章失败');
  return await res.json();
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams =  await params;
  try {
    // 校验ID格式
    if (!/^[0-9a-fA-F]{24}$/.test(resolvedParams.id)) {
      return { title: '无效的文章ID' };
    }
    const article = await getArticle(resolvedParams.id);

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



const LiPage = () => {

  return (
    <LifePage />
  )
}

export default LiPage
