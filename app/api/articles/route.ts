import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { authMiddleware } from '@/middleware/auth';
import { isValidObjectId } from 'mongoose';

// 获取所有文章
export async function GET(req: NextRequest) {
/**
 * 处理GET请求，获取文章列表
 * 
 * 此函数首先连接到数据库，然后解析请求URL中的查询参数，包括是否只获取已发布文章和文章分类ID。
 * 根据这些参数构建查询对象，用于过滤文章列表。
 * 
 * @param req - NextRequest对象，包含请求信息
 */
try {
  // 连接到MongoDB数据库
  await connectDB();
  
  // 创建一个URL对象，用于解析请求的URL
  const url = new URL(req.url);
  // 检查查询参数中是否包含 'published=true'，如果是则只获取已发布的文章
  const publishedOnly = url.searchParams.get('published') === 'true';
  // 从查询参数中获取文章分类的ID
  const categories = url.searchParams.get('categories');
  
  // 初始化一个空的查询对象，用于过滤文章列表
  const query: any = {};
  // 如果 'publishedOnly' 为 true，则在查询对象中添加 'published: true' 条件
  if (publishedOnly) query.published = true;
  // 如果提供了分类ID
  if (categories) {
    // 将分类参数拆分为数组并验证每个ID
    const categoryIds = categories.split(',').filter(id => isValidObjectId(id.trim()));
    
    if (categoryIds.length > 0) {
      query.categories = { $in: categoryIds };
    } else {
      console.warn('所有分类ID均无效');
    }
  }
    
    // 使用 try-catch 包装 populate 操作
    try {
      const articles = await Article.find(query)
        
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

    // 增强版slug生成逻辑
    const generateSlug = (text: string) => {
      let slug = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5\-]+/g, '') // 允许中文字符
        .replace(/\-\-+/g, '-')  // 替换多个连字符为单个
        .trim();

      // 回退机制：如果处理后为空则生成随机slug
      if (!slug) {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 6);
        slug = `post-${timestamp}-${randomStr}`;
      }
      return slug;
    };

    data.slug = data.title ? generateSlug(data.title) : generateSlug('untitled-post');
    
    // 验证分类 ID 是否为有效的 ObjectId
    // 分类 ID 为数组，需要遍历每个分类 ID
    if (data.categories && Array.isArray(data.categories)) {
      for (let i = 0; i < data.categories.length; i++) {
        const category = data.categories[i];
        if (typeof category ==='string' &&!isValidObjectId(category)) {
          // 输出警告信息
          console.warn(`文章 "${data.title}" 的分类 ID 无效: ${category}`);
          // 将无效的分类 ID 从数组中移除
          data.categories.splice(i, 1);
          i--; // 调整索引以正确遍历数组
        }
      }
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