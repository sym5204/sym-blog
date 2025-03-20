import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { isValidObjectId } from 'mongoose';

// 根据参数ID，获取单篇文章信息

// 获取单篇文章
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }
    const article = await Article.findById(params.id);

    if (process.env.NODE_ENV === 'production' && !article?.isPublished) {
      return NextResponse.json({ error: '文章未发布' }, { status: 403 });
    }

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('获取文章错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}