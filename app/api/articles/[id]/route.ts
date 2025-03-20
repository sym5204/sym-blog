import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { authMiddleware } from '@/middleware/auth';
import { isValidObjectId } from 'mongoose';

// 获取单篇文章
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }
    const article = await Article.findById(params.id);

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('获取文章错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新文章
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // 验证身份
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    await connectDB();
    const data = await req.json();

    // 验证分类 ID 是否为有效的 ObjectId
    // if (data.category && !isValidObjectId(data.category)) {
    //   return NextResponse.json({ error: '无效的分类 ID' }, { status: 400 });
    // }

    // 检查 data 对象中是否存在 categories 属性，并且该属性是否为数组
    if (data.categories && Array.isArray(data.categories)) {
      // 遍历 categories 数组
      for (let i = 0; i < data.categories.length; i++) {
        // 获取当前遍历到的分类 ID
        const categoryId = data.categories[i];
        // 检查分类 ID 是否为字符串类型，并且是否为无效的 ObjectId
        if (typeof categoryId === 'string' && !isValidObjectId(categoryId)) {
          // 如果是无效的 ObjectId，则从数组中移除该元素
          data.categories.splice(i, 1);
          // 由于移除了一个元素，需要将索引减 1，以便正确遍历数组
          i--;
        }
      }
    }
    // 检查传入的文章ID是否为有效的ObjectId
    if (!isValidObjectId(params.id)) {
      // 如果ID无效，返回一个包含错误信息的JSON响应，状态码为400
      return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      params.id,
      {
        $set: data,
      },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('更新文章错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 删除文章
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // 验证身份
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    await connectDB();
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
    }
    const deletedArticle = await Article.findByIdAndDelete(params.id);

    if (!deletedArticle) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json({ message: '文章已删除' });
  } catch (error) {
    console.error('删除文章错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}