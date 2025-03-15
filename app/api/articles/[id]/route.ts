import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { authMiddleware } from '@/middleware/auth';
import { isValidObjectId } from 'mongoose';

// 获取单篇文章
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
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
    if (data.category && !isValidObjectId(data.category)) {
      return NextResponse.json({ error: '无效的分类 ID' }, { status: 400 });
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