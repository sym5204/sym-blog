import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { authMiddleware } from '@/middleware/auth';
import { isValidObjectId } from 'mongoose';

// 获取所有文章
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const publishedOnly = url.searchParams.get('published') === 'true';
    const categoryId = url.searchParams.get('category');
    
    const query: any = {};
    if (publishedOnly) query.published = true;
    if (categoryId) {
      // 确保 categoryId 是有效的 ObjectId
      if (isValidObjectId(categoryId)) {
        query.category = categoryId;
      } else {
        console.warn(`无效的分类 ID: ${categoryId}`);
      }
    }
    
    // 使用 try-catch 包装 populate 操作
    try {
      const articles = await Article.find(query)
        .populate('category', 'name slug')
        .sort({ createdAt: -1 });
      
      return NextResponse.json(articles);
    } catch (populateError) {
      console.error('填充分类数据时出错:', populateError);
      // 尝试不使用 populate 获取文章
      const articlesWithoutPopulate = await Article.find(query).sort({ createdAt: -1 });
      return NextResponse.json(articlesWithoutPopulate);
    }
  } catch (error) {
    console.error('获取文章错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 创建新文章
export async function POST(req: NextRequest) {
  // 验证身份
  const authError = await authMiddleware(req);
  if (authError) return authError;
  
  try {
    await connectDB();
    const data = await req.json();
    
    // 检查必填字段
    if (!data.title) {
      return NextResponse.json({ error: '标题不能为空' }, { status: 400 });
    }
    
    if (!data.content) {
      return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
    }
    
    // 验证分类 ID 是否为有效的 ObjectId
    if (data.category && !isValidObjectId(data.category)) {
      return NextResponse.json({ error: '无效的分类 ID' }, { status: 400 });
    }
    
    const newArticle = new Article(data);
    await newArticle.save();
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    console.error('创建文章错误:', error);
    
    // 提供更详细的错误信息
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      return NextResponse.json({ 
        error: '表单验证失败', 
        validationErrors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
} 